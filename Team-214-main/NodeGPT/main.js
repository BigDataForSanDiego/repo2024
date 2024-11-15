const { OpenAI } = require("openai");
const readline = require('readline');
const config = require('./config.json');
const openai = new OpenAI({
    apiKey: config.apiKey,
});

async function createThread(userInfo) {
    try {
        let openThread = await openai.beta.threads.create();

        await openai.beta.threads.messages.create(openThread.id, {
            role: "user",
            content: `My healthcare information: ${JSON.stringify(userInfo)}`,
        });

        return openThread;
    } catch (error) {
        console.log(error);
    }
}

async function waitForRunCompletion(threadId, runId) {
    let run;
    do {
        run = await openai.beta.threads.runs.retrieve(threadId, runId);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before checking again
    } while (run.status !== "completed");
}

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const userHealthInfo = {
    name: "Alice Appleseed",
    age: 34,
    gender: "female",
    height: 64, //inches
    weight: 130, //lbs
    medicalHistory: {
        allergies: "Penicillin",
        currentMedications: "None",
        surgeries: "C-section",
        familyHistory: "Type 1 Diabetes",
    },
    primaryCarePhysician: {
        name: "Dr. Jane Doe",
        phoneNumber: "555-555-5555",
        email: "jane.doe@medicalprovider.com",
    },
    healthCarePlan: {
        // common ppo plan with her work
        name: "Employee Health Plan",
        type: "PPO",
        provider: "Allswell Healthcare",
        coverage: "80/20",
        deductible: "$2000",
        outOfPocketMax: "$6000",
        copay: "$20",
        coinsurance: "20%",
    }
};

async function main() {
    let activeConversation = true;
    let ourThread = await createThread(userHealthInfo);
    console.log("Thread created:", ourThread.id);

    while (activeConversation) {
        let answer = await new Promise((resolve) => {
            rl.question('Enter your message: ', (userInput) => {
                resolve(userInput);
            });
        });

        if (answer.toLowerCase() === "exit") {
            activeConversation = false;
            return;
        }

        try {
            await openai.beta.threads.messages.create(ourThread.id, {
                role: "user",
                content: answer,
            });

            const run = await openai.beta.threads.runs.create(ourThread.id, {
                assistant_id: "asst_McRuKqYc9VOacrxhMSGwio3b",
            });

            await waitForRunCompletion(ourThread.id, run.id);

            const messages = await openai.beta.threads.messages.list(ourThread.id);
            const assistantResponse = messages.data.find(msg => msg.role === "assistant");

            if (assistantResponse) {
                console.log("Assistant's response:", assistantResponse.content[0].text.value);
            } else {
                console.log("No response from the assistant.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
    rl.close();
}

main();