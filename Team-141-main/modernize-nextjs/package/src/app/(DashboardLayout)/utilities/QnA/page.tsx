'use client';
import { useChat } from 'ai/react';
import React, { useState } from 'react';

import { Box, Avatar, Button, TextField, Typography } from '@mui/material';
import NavBar from '../../components/navigator/navbar';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    background: {
      paper: 'black', // your color
    },
  },
});


const ChatQnA: React.FC = () => {
  const [waitingForAI] = useState<boolean>(false);
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    
    <Box>
      <NavBar />
      <PageContainer title="Shadow" description="this is Shadow">
      <DashboardCard title="Shadow">
        <ThemeProvider theme={theme}>
      <Box
        sx={{
          height: '60vh',
          display: 'flex',
          bgcolor: 'black',
          flexDirection: 'column-reverse',
        }}
      >
        {waitingForAI && (
          <Box sx={{ textAlign: 'center' }}>
            <img src="/images/logos/1484.gif" alt="Loading" />
          </Box>
        )}

        {messages.length == 0 && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src="/images/logos/MongoDB_White.svg"
              alt="MongoDB"
              style={{ width: '25%', marginBottom: '2%' }}
            />
            <Typography
              sx={{
                marginBottom: '2%',
                fontSize: '40px',
                justifySelf: 'center',
              }}
            >
              +
            </Typography>
            <img
              src="/images/logos/openAI.svg"
              alt="OpenAI"
              style={{ width: '8%', marginBottom: '2%' }}
            />
          </Box>
        )}

        <Box sx={{ paddingRight: '16px' }}>
          {messages.map((m) => (
            <Box
              key={m.id}
              sx={{
                display: 'flex',
                gap: 3,
                marginY: 4,
                color: 'gray',
                fontSize: '14px',
                flex: 1,
              }}
            >
              <Avatar
                sx={{
                  margin: '30px',
                  marginTop: '0px',
                  backgroundColor: 'white',
                  padding: '4px',
                  width: '40px',
                  height: '40px',
                }}
              >
                <img
                  src={m.role == 'user' ? '/images/logos/user.png' : '/images/logos/bot.png'}
                  alt={m.role}
                  style={{ width: '100%' }}
                />
              </Avatar>
              <Box sx={{ color: 'aliceblue' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {m.role}
                </Typography>
                <Typography variant="body2">{m.content}</Typography>
              </Box>
            </Box>
          ))}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', pt: 0 }}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              gap: 2,
            }}
          >
            <TextField
              value={input}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              placeholder="Ask what you have in mind"
              size="small"
              InputProps={{
                style: { color: '#030712', backgroundColor: '#f9fafb' },
              }}
              sx={{
                borderRadius: '4px',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#e5e7eb',
                  },
                  '&:hover fieldset': {
                    borderColor: '#9ca3af',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#9ca3af',
                  },
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: 'black',
                color: '#f9fafb',
                height: '40px',
                px: 4,
                py: 2,
                '&:hover': {
                  backgroundColor: '#111827E6',
                },
                '&.Mui-disabled': {
                  opacity: 0.5,
                  pointerEvents: 'none',
                },
              }}
            >
              Send
            </Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
        </DashboardCard>
      </PageContainer>
    </Box>
  
  );
}
// const ChatQnA = () => {
//    const [waitingForAI] = useState<boolean>(false);
//     const { messages, input, handleInputChange, handleSubmit } = useChat();

//     return (
//       <div>
//         <NavBar />
//           <div
//             style={{height: '70vh', flexDirection: "column-reverse", display: "flex" }}
            
//           >
//             <>
//               {waitingForAI &&
//                 (
//                   <div className="loading">
//                     <img src='/images/logos/1484.gif'></img>
//                   </div>
//                 )}
//             </>
//             <>
//               {messages.length == 0 &&
//                 (
//                   <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
//                     <img style={{ width: "25%", marginBottom: "2%" }} src='/images/logos/MongoDB_White.svg' />
//                     <span style={{ marginBottom: '2%', fontSize: '40px', justifySelf: 'center' }}>+</span>
//                     <img style={{ width: "8%", marginBottom: "2%" }} src='/images/logos/openAI.svg' />
//                   </div>
//                 )
//               }
//             </>
//             <div className="pr-4 messages">
//               {messages.map(m => (
//                 <div key={m.id} className="flex gap-3 my-4 text-gray-600 text-sm flex-1">
//                   <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8" 
//                         style={{ margin: '30px', marginTop: '0px' }}>
//                     <div className="rounded-full bg-gray-100 border p-1">
//                       {m.role === 'user' ? (
//                         <img src="/images/logos/user.png" />
//                       ) : (
//                         <img src="/images/logos/bot.png" />
//                       )}
//                     </div>
//                   </span>
//                   <p className="leading-relaxed" style={{ color: 'aliceblue' }}>
//                     <span className="block font-bold">{m.role}</span>
//                     {m.content}
//                   </p>
//                 </div>
//               ))}

//             </div>

//             <div className="flex items-center pt-0 chat-window">
//               <form className="flex items-center justify-center w-full space-x-2" onSubmit={handleSubmit}>
//                 <input
//                   value={input}
//                   onChange={handleInputChange}
//                   className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
//                   placeholder="Ask what you have in mind"
//                 />
//                 <button
//                   type="submit"
//                   className="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-black hover:bg-[#111827E6] h-10 px-4 py-2"
//                 >
//                   Send
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div> 
          
        
         
//     //   </DashboardCard>

//     // </PageContainer>
//  );
// };

export default ChatQnA;

