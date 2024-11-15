import React from 'react';
import {useState, useEffect} from 'react';
import { Box, InputBase, IconButton, Paper, responsiveFontSizes } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

function AskLLM() {
    const [searchText, setSearchText] = useState('');

    async function generateResponse(disease, symptoms, score) {
      const prompt = `
      Based on the following information, generate a clear and informative explanation for the user.
      
      - **Disease:** ${disease}
      - **Symptoms:** ${symptoms}
      - **Score:** ${score}
      
      The score ranges from 0 to 1:
      - **0** indicates that the symptoms are typical for the disease
      - **1** indicates that the symptoms are atypical for the disease
      
      Please explain what the score implies about the symptoms in relation to the condition in simple terms. Also talk like a medical doctor, use terms a normal person can understand and restrict responses to 3-5 sentences?
      `;

        try {
            const response = await axios.post('http://localhost:11434/api/generate', {
                model: 'llama3.2',
                prompt: prompt,
                stream: false
            }, {
                headers: {
                'Content-Type': 'application/json',
                },
            });

            console.log('Response:', response.data['response']);
        } catch (error) {
          console.error('Error:', error.message);
        }
    }

  const handleSearchClick = () => {
    console.log('Search for:', searchText);



    console.log(generateResponse(searchText));
  };

  return (
    <Paper
      component="form"
      sx={{ display: 'flex', alignItems: 'center', width: '100%' }}
      onSubmit={(e) => {
        e.preventDefault();
        handleSearchClick();
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Type to search"
        inputProps={{ 'aria-label': 'search' }}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      
      <IconButton
        type="submit"
        sx={{ p: '10px' }}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default AskLLM;