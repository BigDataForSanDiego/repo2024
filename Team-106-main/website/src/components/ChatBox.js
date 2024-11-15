import React, { useState } from 'react';
import { Box, TextField, IconButton, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import './ChatBox.css';

const ChatBox = ({ messages = [], onSend }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <Box
      sx={{
        width: '50%',
        height: '50vh',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #ccc',
        borderRadius: '10px',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          padding: '10px',
          backgroundColor: '#f7f7f7',
        }}
      >
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              textAlign: 'left',
              justifyContent: message.type === 'output' ? 'flex-end': 'flex-start',
              marginBottom: '10px',
            }}
          >
            <Typography
              sx={{
                maxWidth: '70%',
                padding: '10px',
                borderRadius: '10px',
                backgroundColor: message.type === 'output' ? '#3e44e6' : '#e0e0e0',
                color: message.type === 'output' ? '#fff' : '#000',
                wordWrap: 'break-word',
              }}
            >
              {message.text}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: '10px',
          borderTop: '1px solid #ccc',
        }}
      >
        <TextField
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          variant="outlined"
          size="small"
          sx={{ flex: 1, marginRight: '10px' }}
        />
        <IconButton color="primary" onClick={handleSend}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatBox;
