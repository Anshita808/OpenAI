const express = require("express");
const cors = require("cors")
 require("dotenv").config()
const app = express();

app.use(cors())
app.use(express.json());

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey:process.env.API_key ,
});

const openAI = new OpenAIApi(configuration);

app.post("/query", async (req, res) => {
  
  try {
    const { word } = req.body;
    const prompt = `Write a quote around the '${word}'  of 4 lines and give me the result as follows.
    
    [ {hindi result} , {english result} ]
    
    `;
    console.log(prompt);
    const result = await  openAI.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 600,
      temperature: 0.7,
      });
      console.log(result.data.choices[0].text)
      res.status(200).json({result : result.data.choices[0].text});
  } catch (error) {
    console.log(error.message);
  }
 
 
});

app.listen(8000, (req, res) => {
  console.log("Server is Running");
});
