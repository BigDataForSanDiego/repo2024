'use client';
import { Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';


const SamplePage = () => {
  return (
    <PageContainer title="Progress Report Page" description="this is Progress Report page">
      <DashboardCard title="Progress Report Page">
        <Typography>This is a Progress Report page</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default SamplePage;

