import {
  useEffect,
  useState,
} from 'react';

import FlexBetween from 'components/FlexBetween';
import UserImage from 'components/UserImage';
import WidgetWrapper from 'components/WidgetWrapper';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  EditOutlined,
  LocationOnOutlined,
  ManageAccountsOutlined,
  WorkOutlineOutlined,
} from '@mui/icons-material';
import {
  Box,
  Divider,
  Typography,
  useTheme,
} from '@mui/material';

const UserWidget = ({ userId, picturePath }) => {
  // grab the user from the backend to use
  const [user, setUser] = useState(null);
  // grab token state from the store
  const token = useSelector((state) => state.token);

  const { navigate } = useNavigate();

  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  // to verify the token, from auth middleware, we're taking everything behind `Bearer `, which is the token.
  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    // grab getUser and invoke it
    // because the dependency is an empty array, getUser will be called when we render this UserWidget component for the first time
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // if user doesn't exist, it's going to error out
  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    friends,
    viewedProfile,
    impressions,
  } = user;

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}

      <FlexBetween
        gap=".5rem"
        pb="1rem"
        // navigate to the user's page when clicking on the profile page
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                '&:hover': {
                  color: palette.primary.light,
                  cursor: 'pointer',
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} friends</Typography>
          </Box>
        </FlexBetween>

        <ManageAccountsOutlined />
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}

      <Box
        display="flex"
        alignItems="center"
        gap="1rem"
        mb=".5rem"
      >
        <LocationOnOutlined
          fontSize="large"
          sx={{ color: main }}
        />
        <Typography color={medium}>{location}</Typography>
      </Box>

      <Box
        display="flex"
        alignItems="center"
        gap="1rem"
        mb=".5rem"
      >
        <WorkOutlineOutlined
          fontSize="large"
          sx={{ color: main }}
        />
        <Typography color={medium}>{occupation}</Typography>
      </Box>

      <Divider />

      {/* THIRD ROW */}

      <Box p="1rem 0">
        <FlexBetween mb=".5rem">
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography
            color={main}
            fontWeight="500"
          >
            {viewedProfile}
          </Typography>
        </FlexBetween>

        <FlexBetween>
          <Typography color={medium}>Impressions</Typography>
          <Typography
            color={main}
            fontWeight="500"
          >
            {impressions}
          </Typography>
        </FlexBetween>

        <Divider />

        {/* FOURTH ROW */}

        <Box p="1rem 0">
          <Typography
            fontSize="1rem"
            color={main}
            fontWeight="500"
            mb="1rem"
          >
            Social Profiles
          </Typography>

          <FlexBetween
            gap="1rem"
            mb=".5rem"
          >
            <FlexBetween gap="1rem">
              <img
                src="../assets/twitter.png"
                alt="twitter"
              />
              <Box>
                <Typography
                  color={main}
                  fontWeight="500"
                >
                  Twitter
                </Typography>
                <Typography color={main}>Social Network</Typography>
              </Box>
            </FlexBetween>
            <EditOutlined sx={{ color: main }} />
          </FlexBetween>

          <FlexBetween gap="1rem">
            <FlexBetween gap="1rem">
              <img
                src="../assets/linkedin.png"
                alt="linkedin"
              />
              <Box>
                <Typography
                  color={main}
                  fontWeight="500"
                >
                  LinkedIn
                </Typography>
                <Typography color={main}>Network Platform</Typography>
              </Box>
            </FlexBetween>
            <EditOutlined sx={{ color: main }} />
          </FlexBetween>
        </Box>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
