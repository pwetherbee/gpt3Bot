const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  console.log(req.body);
  const prompt = req.body.prompt;
  console.log(prompt);
  // Apply validation
  if (typeof prompt != "string" || prompt.length < 1) {
    return res
      .status(400)
      .send({ success: false, message: "Prompt is invalid or too long" });
  }
  const openai = new OpenAIApi(configuration);

  try {
    const gptGenText = await openai.createCompletion("text-davinci-002", {
      prompt: prompt,
      temperature: 0.9,
      max_tokens: 300,
    });
    res.send({
      success: true,
      texts: gptGenText.data.choices,
    });
  } catch (e) {
    console.log(e);
    res.status(502).send({ success: false, error: "An error occured: ", e });
  }
}
