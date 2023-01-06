import { Box } from '@mui/material';
import { styled } from '@mui/system';

// essentially css styled component but using mui
const FlexBetween = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export default FlexBetween;
