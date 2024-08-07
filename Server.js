const express = require('express');
const path = require('path');
const multer = require('multer');
const axios = require('axios');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Groq = require("groq-sdk");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const imageBuffer = req.file.buffer;
    const imageBase64 = imageBuffer.toString('base64');
    const prompt = `Generate a roasting comment for this image: ${imageBase64}`;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      res.json({ message: text });
    } catch (error) {
      console.error('Error with Gemini API, falling back to Groq API:', error);

      try {
        const groqResponse = await groq.chat.completions.create({
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          model: "llama3-8b-8192",
        });

        const text = groqResponse.choices[0]?.message?.content || "No response from Groq API";
        res.json({ message: text });
      } catch (groqError) {
        console.error('Error with Groq API:', groqError);
        res.status(500).json({ error: 'Both Gemini and Groq APIs failed' });
      }
    }
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
const express = require('express');
const path = require('path');
const multer = require('multer');
const axios = require('axios');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Groq = require("groq-sdk");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const imageBuffer = req.file.buffer;
    const imageBase64 = imageBuffer.toString('base64');
    const prompt = `Generate a roasting comment for this image: ${imageBase64}`;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      res.json({ message: text });
    } catch (error) {
      console.error('Error with Gemini API, falling back to Groq API:', error);

      try {
        const groqResponse = await groq.chat.completions.create({
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          model: "llama3-8b-8192",
        });

        const text = groqResponse.choices[0]?.message?.content || "No response from Groq API";
        res.json({ message: text });
      } catch (groqError) {
        console.error('Error with Groq API:', groqError);
        res.status(500).json({ error: 'Both Gemini and Groq APIs failed' });
      }
    }
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
  const express = require('express');
const path = require('path');
const multer = require('multer');
const axios = require('axios');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Groq = require("groq-sdk");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const imageBuffer = req.file.buffer;
    const imageBase64 = imageBuffer.toString('base64');
    const prompt = `Generate a roasting comment for this image: ${imageBase64}`;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      res.json({ message: text });
    } catch (error) {
      console.error('Error with Gemini API, falling back to Groq API:', error);

      try {
        const groqResponse = await groq.chat.completions.create({
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          model: "llama3-8b-8192",
        });

        const text = groqResponse.choices[0]?.message?.content || "No response from Groq API";
        res.json({ message: text });
      } catch (groqError) {
        console.error('Error with Groq API:', groqError);
        res.status(500).json({ error: 'Both Gemini and Groq APIs failed' });
      }
    }
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
  const express = require('express');
const path = require('path');
const multer = require('multer');
const axios = require('axios');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Groq = require("groq-sdk");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const imageBuffer = req.file.buffer;
    const imageBase64 = imageBuffer.toString('base64');
    const prompt = `Generate a roasting comment for this image: ${imageBase64}`;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      res.json({ message: text });
    } catch (error) {
      console.error('Error with Gemini API, falling back to Groq API:', error);

      try {
        const groqResponse = await groq.chat.completions.create({
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          model: "llama3-8b-8192",
        });

        const text = groqResponse.choices[0]?.message?.content || "No response from Groq API";
        res.json({ message: text });
      } catch (groqError) {
        console.error('Error with Groq API:', groqError);
        res.status(500).json({ error: 'Both Gemini and Groq APIs failed' });
      }
    }
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
  const express = require('express');
const path = require('path');
const multer = require('multer');
const axios = require('axios');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Groq = require("groq-sdk");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const imageBuffer = req.file.buffer;
    const imageBase64 = imageBuffer.toString('base64');
    const prompt = `Generate a roasting comment for this image: ${imageBase64}`;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      res.json({ message: text });
    } catch (error) {
      console.error('Error with Gemini API, falling back to Groq API:', error);

      try {
        const groqResponse = await groq.chat.completions.create({
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          model: "llama3-8b-8192",
        });

        const text = groqResponse.choices[0]?.message?.content || "No response from Groq API";
        res.json({ message: text });
      } catch (groqError) {
        console.error('Error with Groq API:', groqError);
        res.status(500).json({ error: 'Both Gemini and Groq APIs failed' });
      }
    }
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
