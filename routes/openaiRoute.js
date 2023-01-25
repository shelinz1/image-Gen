const express = require("express");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const router = express.Router();

router.post("/generatedimage", async (req, res) => {
  const { text, size } = req.body;

  const imageSize =
    size === "small" ? "256x256" : size === "medium" ? "512x512" : "1024x1024";
  try {
    const generatedImage = await openai.createImage({
      prompt: text,
      n: 1,
      size: imageSize,
    });

    const imageLink = generatedImage.data.data[0].url;

    res.status(200).json({ data: imageLink });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    res.status(400).json({
      error: "The image could not be generated",
    });
  }
});

module.exports = router;
