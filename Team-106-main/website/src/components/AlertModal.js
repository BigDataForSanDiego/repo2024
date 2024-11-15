import React, { useState, useEffect } from 'react';
import { Box, Modal, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function AlertModal({open, handleClose}) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="centered-modal-title"
        aria-describedby="centered-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '25%',
            height: '40%',
            bgcolor: 'background.paper',
            textAlign: 'center',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
            }}
          >
            <CloseIcon />
          </IconButton>

            
          <Typography id="centered-modal-description" variant='h5' sx={{ mt: 2 }}>
            Your inputted symptoms and disease have indicated that there is a possibility of a worsening condition. Please consult a medical professional to discuss any changes to your health.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default AlertModal;
