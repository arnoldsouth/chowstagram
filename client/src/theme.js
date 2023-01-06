// export color design tokens
export const colorTokens = {
  grey: {
    0: '#FFFFFF',
    10: '#F6F6F6',
    50: '#F0F0F0',
    100: '#E0E0E0',
    200: '#C2C2C2',
    300: '#A3A3A3',
    400: '#858585',
    500: '#666666',
    600: '#4D4D4D',
    700: '#333333',
    800: '#1A1A1A',
    900: '#0A0A0A',
    1000: '#000000',
  },

  // primary: {
  //   50: '#E6FBFF',
  //   100: '#CCF7FE',
  //   200: '#99EEFD',
  //   300: '#66E6FC',
  //   400: '#33DDFB',
  //   500: '#00D5FA',
  //   600: '#00A0BC',
  //   700: '#006B7D',
  //   800: '#00353F',
  //   900: '#001519',
  // },

  primary: {
    50: '#E2DDCE',
    100: '#E2DDCE',
    200: '#D8CEB1',
    300: '#D2C193',
    400: '#D2B973',
    500: '#D8B44F',
    600: '#E7B426',
    700: '#F4B400',
    800: '#C69816',
    900: '#A28124',
  },
};

// setting up mui theme
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === 'dark'
        ? {
            // palette values for dark mode
            primary: {
              dark: colorTokens.primary[200],
              main: colorTokens.primary[500],
              light: colorTokens.primary[800],
            },

            neutral: {
              dark: colorTokens.grey[100],
              main: colorTokens.grey[200],
              mediumMain: colorTokens.grey[300],
              medium: colorTokens.grey[400],
              light: colorTokens.grey[700],
            },

            background: {
              default: colorTokens.grey[900],
              alt: colorTokens.grey[800],
            },
          }
        : {
            // palette values for light mode
            primary: {
              dark: colorTokens.primary[700],
              main: colorTokens.primary[500],
              light: colorTokens.primary[50],
            },

            neutral: {
              dark: colorTokens.grey[700],
              main: colorTokens.grey[500],
              mediumMain: colorTokens.grey[400],
              medium: colorTokens.grey[300],
              light: colorTokens.grey[50],
            },

            background: {
              default: colorTokens.grey[10],
              alt: colorTokens.grey[0],
            },
          }),
    },

    typography: {
      fontFamily: ['Quicksand', 'sans-serif'].join(','),
      fontSize: 12,

      h1: {
        fontFamily: ['Quicksand', 'sans-serif'].join(','),
        fontSize: 40,
      },

      h2: {
        fontFamily: ['Quicksand', 'sans-serif'].join(','),
        fontSize: 32,
      },

      h3: {
        fontFamily: ['Quicksand', 'sans-serif'].join(','),
        fontSize: 24,
      },

      h4: {
        fontFamily: ['Quicksand', 'sans-serif'].join(','),
        fontSize: 20,
      },

      h5: {
        fontFamily: ['Quicksand', 'sans-serif'].join(','),
        fontSize: 16,
      },

      h6: {
        fontFamily: ['Quicksand', 'sans-serif'].join(','),
        fontSize: 14,
      },
    },
  };
};
