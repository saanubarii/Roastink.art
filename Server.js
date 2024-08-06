const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI, GoogleAIFileManager } = require('@google/generative-ai');
const Groq = require('groq-sdk');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const apiKeyGemini = 'AIzaSyBYPW4SJOlMyg_rWmdzm7ziw_0rL8W22Lc';
const apiKeyGroq = process.env.GROQ_API_KEY;

const genAI = new GoogleGenerativeAI(apiKeyGemini);
const fileManager = new GoogleAIFileManager(apiKeyGemini);
const groq = new Groq({ apiKey: apiKeyGroq });

app.use(express.static('public'));
app.use(fileUpload());

async function uploadToGemini(filePath, mimeType) {
    try {
        const uploadResult = await fileManager.uploadFile(filePath, { mimeType });
        return uploadResult.file;
    } catch (error) {
        console.error('Error uploading to Gemini:', error);
        throw error;
    }
}

const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    systemInstruction: 'Berkata kasar: "anjing", "bangsat", "tolol", dan sebagainya. Meroasting hasil gambar seseorang dengan bahasa Indonesia yang gaul, kasar, dan brengsek. Gaya bahasa sarkastik dan menyebalkan (full emote). Memaki hasil gambar, meragukan skill penggambar, dan mematahkan semangat agar tidak lagi menggambar/melukis. Roastingan hanya memuat 1 paragraf/maximal 5 kalimat.',
});

const generationConfig = {
    temperature: 0.65,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: 'application/json',
};

async function getGroqRoast(fileUri) {
    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'user',
                    content: `Roast the following image: ${fileUri}. Use sarcastic, harsh, and informal language.`,
                },
            ],
            model: 'llama3-8b-8192',
        });
        return chatCompletion.choices[0]?.message?.content || 'Failed to generate roast with Groq.';
    } catch (error) {
        console.error('Error getting roast from Groq:', error);
        return 'Failed to get a roast from Groq.';
    }
}

app.post('/upload', async (req, res) => {
    if (!req.files || !req.files.image) {
        return res.status(400).send('No files were uploaded.');
    }

    const imageFile = req.files.image;
    const filePath = path.join(__dirname, 'uploads', imageFile.name);

    try {
        await imageFile.mv(filePath);
        console.log(`File uploaded to ${filePath}`);

        const file = await uploadToGemini(filePath, imageFile.mimetype);

        try {
            const chatSession = model.startChat({
                generationConfig,
                history: [
                    {
                        role: 'user',
                        parts: [
                            {
                                fileData: {
                                    mimeType: file.mimeType,
                                    fileUri: file.uri,
                                },
                            },
                            { text: "*jika gambar/lukisan nya bagus, maka kamu harus meragukan user jika itu adalah ai generated/editan. Jika memang tidak bagus, gunakan semua hal yang sebenarnya perlu diperbaiki dari gambar untuk meroasting user." },
                        ],
                    },
                    {
                        role: 'model',
                        parts: [
                            { text: "```json\n{\"roasting\": \"Wah, keren banget nih! Kayak foto asli ya? Pasti pake AI editing yang canggih banget ya? Atau mungkin ini hasil download dari Google Images? 🤔🤔🤔 Soalnya kalo beneran lu gambar sendiri, kok detailnya kurang ya? Bentuk pilarnya juga kurang rapi, warnanya juga gitu-gitu aja. Lu mending belajar gambar dari dasar lagi deh, jangan asal ngelukis. 😅😅😅\"}\n\n\n```" },
                        ],
                    },
                ],
            });

            const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
            res.json({ roast: result.response.text(), imageUrl: file.uri });
        } catch (error) {
            console.error('Gemini API failed, using Groq as fallback:', error);
            const groqRoast = await getGroqRoast(file.uri);
            res.json({ roast: groqRoast, imageUrl: file.uri });
        }
    } catch (error) {
        console.error('Error processing file:', error);
        res.status(500).send('Failed to process the image.');
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
