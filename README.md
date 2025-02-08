# Weather AI Agent

## Overview
The **Weather AI Agent** is an interactive chatbot that processes user queries related to weather using OpenAI's GPT (gpt-4o-mini) model. It follows a structured approach of **PLAN, ACTION, OBSERVATION, and OUTPUT** to derive and present weather information. The agent utilizes a built-in tool to fetch weather details for predefined cities.

## Features
- Accepts natural language queries about weather.
- Uses structured reasoning (Plan → Action → Observation → Output).
- Calls a custom tool to fetch weather data.
- Provides responses in a JSON-based format.
- Supports conversational interaction via command-line input.

## Usage
Run the chatbot with:
```sh
node index.mjs
```
Then, enter your queries in the terminal:
```sh
>> What is the sum of the weather of Patiala and Nashik?
```
The chatbot will follow a structured execution and return:
```sh
bot: The sum of the Weather of Patiala and Nashik is 30 degree
```

## Code Structure
- `SYSTEM_PROMPT`: Defines the AI assistant's structured workflow.
- `getWeatherDetails(city)`: Fetches predefined weather data for supported cities.
- `tools`: An object mapping function calls to execution logic.
- `messages`: Stores conversation history to maintain context.
- `while (true) {...}`: Runs an interactive chat loop, processing responses iteratively.

## Interaction Flow
- **PLAN**: Decide the function to call based on user input.
- **ACTION**: Execute the chosen function.
- **OBSERVATION**: Receive the output of the function.
- **OUTPUT**: Generate a final response based on observations.

## Customization
- Extend `getWeatherDetails()` to fetch real-time weather from an API.
- Modify `SYSTEM_PROMPT` to add more tools or change response format.
- Improve CLI interaction with additional features like error handling.


## Reference
- [Building AI Agents From Scratch](https://youtu.be/vUYnRGotTbo?si=eDySSvoL95S1_zs_)

