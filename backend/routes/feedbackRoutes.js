const express = require('express');
const multer = require('multer');
const fs = require('fs');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Feedback = require('../models/Feedback');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// POST - Analyze image and save feedback
router.post('/quality-check', upload.single('image'), async (req, res) => {
  try {
    const filePath = req.file.path;
    const imageBuffer = fs.readFileSync(filePath);
    const base64Image = imageBuffer.toString('base64');
    const { issueType, comments } = req.body;

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    const result = await model.generateContent([
      "Analyze this food image and provide feedback on its quality.",
      {
        inlineData: {
          mimeType: 'image/jpeg',
          data: base64Image,
        },
      },
    ]);

    const response = await result.response;
    const feedbackText = response.text();

    fs.unlinkSync(filePath);

    const feedback = new Feedback({
      issueType,
      comments,
      imageFeedback: feedbackText,
    });

    await feedback.save();

    res.status(201).json({ message: 'Feedback saved', feedbackText });
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ error: 'Image analysis or saving failed' });
  }
});

// GET - Fetch all feedbacks
router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch feedbacks' });
  }
});

module.exports = router;