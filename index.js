import OpenAI from "openai/index.mjs";
import { type } from "os";
import readlineSync from "readline-sync";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const client = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

//Tools
function getWeatherDetails(city = "") {
  if (city.toLowerCase === "patiala") return "10 degree";
  if (city.toLowerCase === "nashik") return "20 degree";
  if (city.toLowerCase === "delhi") return "27 degree";
  if (city.toLowerCase === "banglore") return "30 degree";
  if (city.toLowerCase === "mumbai") return "30 degree";
}

const tools = {
    "getWeatherDetails" : getWeatherDetails,
}

const SYSTEM_PROMPT = `
You are an AI assistant with START , PLAN , ACTION , Observation and Output Statement
Wait for the user prompt and first PLAN using available tools.
After Planning , Take the action with appropiate tools and wait for Observation based on action.
Once you get the observations , Return the AI Response based on START Prompt and OBSERVATIONs

Strictly Follow the JSON output format as in examples

Available Tools:
- function getWeatherDetails(city: string): string
getWeatherDetails is a function that accepts city name as string and returns the weather details

Example:
START
{"type" : "user" , "user" : "What is the sum of weather of Patiala and Nashik ?"}
{"type" : "plan" , "plan" : "I will call the getWeatherDetails for Patiala"}
{"type" : "action" , "function" : "getWeatherDetails" , "input":"Patiala"}
{"type" : "observation" , "observation" : "10 degree"}
{"type" : "plan" , "plan" : "I will call the getWeatherDetails for Nashik"}
{"type" : "action" , "function" : "getWeatherDetails" , "input":"Nashik"}
{"type" : "observation" , "observation" : "20 degree"}
{"type" : "output" , "output" : "The sum of Weather of Patiala and Nashik is 30 degree"}

`;

// const user = "Hey what is the weather of Mumbai ?";

// async function chat() {
//   const result = await client.chat.completions.create({
//     model: "gpt-4o-mini",
//     messages: [
//       { role: "system", content: SYSTEM_PROMPT },
//       {
//         role: "developer",
//         content:
//           '{"type" : "plan" , "plan" : "I will call the getWeatherDetails for Mumbai"}',
//       },
//       {
//         role: "developer",
//         content:
//           '{"type" : "action" , "function" : "getWeatherDetails" , "input":"Mumbai"}',
//       },
//       {
//         role: "developer",
//         content:
//           '{"type" : "observation" , "observation" : "30 degree"}',
//       },
//       { role: "user", content: user },
//     ],
//   });
//   console.log(result.choices[0].message.content);
// }

// chat();

const messages = [{ role: "system", content: SYSTEM_PROMPT }];

while (true) {
  const query = readlineSync.question(">>");
  const q = {
    type: "user",
    user: query,
  };
  messages.push({ role: "user", content: JSON.stringify(q) });

  while (true) {
    const chat = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages,
      response_format: { type: "json_object" },
    });

    const result = chat.choices[0].message.content;
    messages.push({ role: "assistant", content: result });

    const call = JSON.parse(result);

    if(call.type == "output")
    {
        console.log(`bot:${call.output}`);
        break;
    }
    else if (call.type == 'action'){
        const fn = tools[call.function];
        const observation = fn(call.input);
        const obs = {"type" : "observation" , "observation" : "14 degree"};
        messages.push({role:"developer" , content:JSON.stringify(obs)
        });
    }
  }
}
