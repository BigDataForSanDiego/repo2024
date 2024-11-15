const { OpenAI } = require("openai");
const WebSocket = require('ws');
const mic = require('mic');
const fs = require('fs');
const config = require('./config.json');

const openai = new OpenAI({
    apiKey: config.apiKey,
});

const micInstance = mic({
    rate: '16000',
    channels: '1',
    debug: false,
    exitOnSilence: 6
});

const micInputStream = micInstance.getAudioStream();
let rawAudio = Buffer.alloc(0);

const url = "wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-10-01";
const ws = new WebSocket(url, {
    headers: {
        "Authorization": "Bearer " + config.apiKey,
        "OpenAI-Beta": "realtime=v1",
    },
});

let isOpen = false;
ws.on('open', () => {
  console.log('WebSocket connection opened.');
  isOpen = true;

  startConversation();

  ws.on('message', (message) => {
    console.log('Received:', message);
  });

  ws.on('close', () => {
    isOpen = false;
    console.log('WebSocket connection closed.');
  });
});

micInputStream.on('data', (data) => {
  rawAudio = Buffer.concat([rawAudio, data]);
  console.log("Raw audio:", rawAudio);

  if (isOpen) {
    ws.send(rawAudio);
  }
});

async function startConversation() {
    console.log("Starting conversation. Speak into the microphone...");
    micInstance.start();

    while (isOpen) {
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log("Conversation ended.");
    micInstance.stop();
}

// startConversation();