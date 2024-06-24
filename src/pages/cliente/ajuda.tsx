// @ts-nocheck
import { Box, Container, Stack } from '@mui/material';
import Head from 'next/head';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import React from 'react';

const Page = () => {
  return (
    <>
      <Head>
        <title>Ajuda</title>
      </Head>
      <Stack flexDirection={'row'} sx={{ minHeight: '100%'}}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            pl: 2,
          }}
        >
          <Container>
            <Stack spacing={3}>
            <iframe
            src="https://www.chatbase.co/chatbot-iframe/X7LVTu6OtYEk1JHjYE3kn"
            width="100%"
            style={{height: '100%', minHeight: '700px'}}
            frameborder="0"
          />
            </Stack>
          </Container>
        </Box>
        <img
          alt="Friends illustrations by Storyset"
          src="/assets/illustrations/adopt.png"
          height={'auto'}
          width={'17%'}
          style={{ alignSelf: 'end' }}
        />
      </Stack>
    </>
  );
};

Page.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
