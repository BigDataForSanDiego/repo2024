'use client';
import { Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';


const SamplePage = () => {
  return (
    <PageContainer title="Gen AI Page" description="this is Gen AI page">
      {/* <DashboardCard title="Gen AI Page">
        <Typography>This is a Gen AI page</Typography>
      </DashboardCard> */}
      < DashboardCard>
        <div className='overview-text'>

          <h1 style={{ fontWeight: 'bold', fontSize: '2em' }}>RAG QnA Chatbot</h1>
          <br />
          
          <p>With this RAG (Retrieval-Augmented Generation) application, you can quickly deploy a chatbot that is enhanced by your own data. By simply uploading any PDF file(s) of your choosing, you will be creating your own custom Questions and Answers (QnA) chatbot.</p>
          <br />

          <h2 style={{ fontStyle: 'italic' }}>Getting Started</h2>
          <ul>
            <li>Navigate to the &ldquo;Train&rdquo; tab above.</li>
            <li>Here you can upload any number of PDF files you wish to ask the chatbot about, or that you wish the chatbot would consider when providing an answer.</li>
            <li>After uploading your files, navigate to &ldquo;QnA&rdquo; tab.</li>
            <li>In the prompt, you can now ask questions about the uploaded PDF files in natural language, and receive a response.</li>
          </ul>

          <br />

          <p>This application leverages MongoDB&apos;s robust vector store capabilities. Each uploaded PDF is embedded in a vectorized format into your MongoDB Atlas cluster. The vector store efficiently organizes and indexes data, streamlining the process of generating responses and insights from the RAG model.</p>
        </div>
    
      </DashboardCard>

    </PageContainer>
  );
};

export default SamplePage;

