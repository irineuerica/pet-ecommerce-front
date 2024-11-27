"use client";
import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import Head from 'next/head';
import NextLink from 'next/link';
import ArrowLeftIcon from '@heroicons/react/24/solid/ArrowLeftIcon';
import { Box, Button, Container, SvgIcon, Typography } from '@mui/material';
import loadingAnimation from 'src/animations/404.json';

const Page = () => (
  <>
    <Head>
      <title>404 | Devias Kit</title>
    </Head>
    <Box
      component="main"
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexGrow: 1,
        minHeight: '100%',
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Lottie animationData={loadingAnimation} loop={true} style={{ height: 400 }} />
        </Box>
        <Typography align="center" sx={{ mb: 3 }} variant="h5" color="primary">
          A página que você estava procurando não foi encontrada :(
        </Typography>
        {/* <Button
            component={NextLink}
            href="/"
            startIcon={
              <SvgIcon fontSize="small">
                <ArrowLeftIcon />
              </SvgIcon>
            }
            sx={{ mt: 3 }}
            variant="contained"
          >
            Go back to dashboard
          </Button> */}
      </Container>
    </Box>
  </>
);

export default Page;
