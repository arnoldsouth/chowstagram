import React, { useState } from 'react';

import FlexBetween from 'components/FlexBetween';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  setLogout,
  setMode,
} from 'state';

import {
  Close,
  DarkMode,
  Help,
  LightMode,
  LogoutOutlined,
  Menu,
  Message,
  Notifications,
  Search,
} from '@mui/icons-material';
import {
  Box,
  FormControl,
  IconButton,
  InputBase,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  // hook built into mui, that allows us to determine if the current user screensize is below or higher than 'min-width'
  const isNonMobileScreens = useMediaQuery('(min-width: 62.5rem)');

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <FlexBetween
      // padding="1rem 6%"
      padding="1rem"
      backgroundColor={alt}
    >
      <FlexBetween gap="1.75rem">
        {/* <FlexBetween gap="2.5rem"> */}
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate('/home')}
          sx={{
            '&:hover': {
              color: primaryLight,
              cursor: 'pointer',
            },
          }}
        >
          CHOWSTAGRAM
        </Typography>

        {isNonMobileScreens && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius=".5625rem"
            gap="3rem"
            padding=".1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* DESKTOP NAV */}

      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          {/* using redux to flip light and dark mode */}
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === 'dark' ? (
              <DarkMode sx={{ fontSize: '1.5rem' }} />
            ) : (
              <LightMode sx={{ fontSize: '1.5rem', color: dark }} />
            )}
          </IconButton>
          <Message sx={{ fontSize: '1.5rem' }} />
          <Notifications sx={{ fontSize: '1.5rem' }} />
          <Help sx={{ fontSize: '1.5rem' }} />
          <FormControl
            variant="standard"
            value={fullName}
          >
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: '9.375rem',
                borderRadius: '.25rem',
                p: '.25rem 1rem',
                '& .MuiSvgIcon-root:': {
                  pr: '.25rem',
                  width: '3rem',
                },
                '& .MuiSelect-select:focus': {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>
                <LogoutOutlined />
                Logout
              </MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="31.25rem"
          minWidth="18.75rem"
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box
            display="flex"
            justifyContent="flex-end"
            p="1rem"
          >
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: '1.5rem' }}
            >
              {theme.palette.mode === 'dark' ? (
                <DarkMode sx={{ fontSize: '1.5rem' }} />
              ) : (
                <LightMode sx={{ fontSize: '1.5rem', color: dark }} />
              )}
            </IconButton>

            <Message sx={{ fontSize: '1.5rem' }} />
            <Notifications sx={{ fontSize: '1.5rem' }} />
            <Help sx={{ fontSize: '1.5rem' }} />
            <FormControl
              variant="standard"
              value={fullName}
            >
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: '9.375rem',
                  borderRadius: '.25rem',
                  p: '.25rem 1rem',
                  '& .MuiSvgIcon-root:': {
                    pr: '.25rem',
                    width: '3rem',
                  },
                  '& .MuiSelect-select:focus': {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  <LogoutOutlined />
                  Logout
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;
