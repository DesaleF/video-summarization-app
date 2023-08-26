import { Box, Typography, Link } from '@mui/material';

function Footer() {
  return (
    <Box mt="auto" py={3} bgcolor="primary.main" color="white">
      <Typography variant="body2" align="center">
        © 2023 Vicomtech. All Rights Reserved.
      </Typography>
      {/* <Typography variant="body2" align="center">
        Made with ❤️ by Your Name
      </Typography> */}
      <Typography variant="body2" align="center">
        <Link href="#" color="inherit" underline="hover">
          Terms of Service
        </Link>
        {' | '}
        <Link href="#" color="inherit" underline="hover">
          Privacy Policy
        </Link>
      </Typography>
    </Box>
  );
}

export default Footer;