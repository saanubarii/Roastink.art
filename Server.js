const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(fileUpload());

app.post('/upload', async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No file uploaded.');
  }

  const uploadedFile = req.files.image;
  const uploadPath = path.join(__dirname, 'uploads', `${Date.now()}-${uploadedFile.name}`);

  uploadedFile.mv(uploadPath, async (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    try {
      const prompt = `Roast this image: ${uploadPath}`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const roastText = response.text();

      res.json({ imageUrl: `/uploads/${path.basename(uploadPath)}`, roastText });
    } catch (error) {
      console.error('Error generating text with Gemini:', error);
      res.status(500).send('Error generating text with Gemini');
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
