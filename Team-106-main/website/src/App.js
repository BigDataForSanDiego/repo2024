import React from 'react';
import { Box, Typography, IconButton, Button, Icon } from '@mui/material';
import SearchBar from './components/SearchBar';
import AskLLM from './components/AskLLM';
import { ReactComponent as QuestionMark } from './QuestionMark.svg';
import { useEffect, useState } from 'react';
import HelpModal from './components/HelpModal';
import { symptomsList } from './symptomsList';
import {diseaseList} from './diseaseList';
import ChatBox from'./components/ChatBox';
import { logisticRegression } from './model';
import axios from 'axios';
import AlertModal from './components/AlertModal';

function App() {
  // For displaying modal
  const [showModal, setShowModal] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  // For getting selected symptoms and diseases
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [selectedDiseases, setSelectedDiseases] = useState([]);

  const [messages, setMessages] = useState([]);

  // For handling the prediction result
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    setShowModal(true);
  }, []);

  // Function to toggle help modal
  const toggleHelpModal = () => {
    setShowModal((showModal) => !showModal);
  };

  const closeHelpModal = () => {
    setShowModal(false);
  };

  const closeAlertModal = () => {
    setShowAlert(false);
  }

  const handleOllamaCall = async (inputText, firstMsg = true) => {
    if (inputText.trim()) {
      if (firstMsg){
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: 'output', text: inputText },
        ]);
      }

      try {
        console.log('test');
        const response = await axios.post('http://localhost:11434/api/generate', {
          model: 'llama3.2',
          prompt: inputText,
          stream: false
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        setMessages((prevMessages) => [
          ...prevMessages,
          { type: 'input', text: response.data['response'] },
        ]);
      } catch (error) {
        console.error('Error:', error.message);
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: 'input', text: 'Error: Unable to get a response.' },
        ]);
      }
    }
  };

  const getPrediction2 = async () => {
    try {

      const selectedDisease = selectedDiseases[0]; 

      // Call logistic regression with manually set values
      const predictedProbability = logisticRegression(selectedDisease, selectedSymptoms);

      // Set prediction result
      setPrediction(predictedProbability);

      if (predictedProbability >= 0.4){
        setShowAlert(true);
      }

      console.log(`${selectedSymptoms.map(dictionary => dictionary['name'])}`);

      const inputText = `
      Pretend that a patient is coming for you for help and you are a nurse who wants to give at home remedies and educational content.

      Disease: ${selectedDisease}
      Symptoms: ${selectedSymptoms.map(dictionary => dictionary['name'])}

      Probability: ${predictedProbability}

      If the Probability is less than 0.4, reassure the patient that the symptoms are regular, otherwise advise the patient that their symptoms are irregular and they should seek a professional medical consultation.

      Based on the above information, please suggest 3 at home remedies or treatments. For each remedy, provide a brief explanation of why it might be effective for this specific case. Please format your response as follows:

      1. [Remedy Name]: [Brief explanation]
      2. [Remedy Name]: [Brief explanation]
      3. [Remedy Name]: [Brief explanation]

      Moreover, round any numbers to 2 decimal points. Provide concise information.
      Format the text output to be shorter and make it in plain text. 
    `; 

      const output = await handleOllamaCall(inputText, false);

      // Log the result (to console)
      console.log("Prediction result:", predictedProbability);
    } catch (error) {
      console.error('Error in logistic regression:', error);
    }
  };

  return (
    <div>
      <Box sx={{ padding: '2rem', textAlign: 'center', justifyContent: 'center'}}>
        <Box className='topText' sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h3" gutterBottom>
            symple
          </Typography>
          <IconButton onClick={toggleHelpModal}>
            <QuestionMark style={{ width: '3rem', height: '3rem' }} />
          </IconButton>
        </Box>
        <SearchBar 
          dataList={symptomsList} 
          selectedSymptoms={selectedSymptoms} 
          setSelectedSymptoms={setSelectedSymptoms}
          typeOfSearch={'Symptoms'}
        />
        {/*change so only one disease can be input and change the text?*/}
        <SearchBar 
          dataList={diseaseList} 
          selectedSymptoms={selectedDiseases} 
          setSelectedSymptoms={setSelectedDiseases}
          typeOfSearch={'Diseases'}
        />
        <IconButton onClick={getPrediction2} sx={{
        borderRadius: '10px',       // Makes it a rectangle with rounded corners
        backgroundColor: '#0e0e0e', // Example background color (you can adjust this)
        color: '#fff',              // Example text/icon color
        '&:hover': {
          backgroundColor: '#1565c0' // Change the hover color if needed
        }
      }}>
          Analyze
        </IconButton>
        <Typography variant='h4' gutterBottom>
          {/*{prediction}*/}
        </Typography>
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
          <ChatBox messages={messages} onSend={handleOllamaCall}></ChatBox>
        </Box>
      </Box>
      
      <HelpModal open={showModal} handleClose={closeHelpModal}/>
      <AlertModal open={showAlert} handleClose={closeAlertModal}></AlertModal>
    </div>
  );
}

export default App;
