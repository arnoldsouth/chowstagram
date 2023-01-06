import React from 'react';

import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import Form from './Form';

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery('(min-width: 62.5rem)');

  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        // p="1rem 6%"
        p="1rem"
        textAlign="center"
      >
        <Typography
          fontWeight="bold"
          fontSize="2rem"
          color="primary"
        >
          CHOWSTAGRAM
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? '50%' : '90%'}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography
          fontWeight="500"
          variant="h5"
          sx={{ mb: '1.5rem' }}
        >
          Welcome to CHOWSTAGRAM
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
