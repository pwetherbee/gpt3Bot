const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
export default function handler(req, res) {
  const { prompt } = req.body;
  // Apply validation
  if (!typeof prompt === "string" || prompt.length < 1) {
    return res
      .status(400)
      .send({ success: false, message: "Prompt is invalid or too long" });
  }
  const openai = new OpenAIApi(configuration);
  try {
      const gptGenText = await openai.createCompletion('text-davinci-001', {
          prompt: prompt,
          max_tokens: 100,
          temperature: 8.7,
      }) 
      res.send({
        success: true,
        text: gptGenText.data.choices[0].text
      })
  }catch(e){
      console.log(e)
      res.status(502).send({success: false, error: 'An error occured: ', e})
  }
}
