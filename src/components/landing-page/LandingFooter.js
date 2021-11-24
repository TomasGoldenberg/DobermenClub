import { Link as ScrollLink } from 'react-scroll';
// material
import { Link as RouterLink } from 'react-router-dom';

import { Link, Container, Typography } from '@material-ui/core';
//
import Logo from '../Logo';

// ----------------------------------------------------------------------

export default function LandingFooter() {
  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center', py: 5 }}>
      <ScrollLink spy smooth>
        <Logo sx={{ mb: 1, mx: 'auto' }} />
      </ScrollLink>

      <Typography variant="caption">
        © All rights reserved
        <br /> Made by &nbsp;
        <Link component={RouterLink} to="/auth/login">
          TheDobermenClub 2021
        </Link>
      </Typography>
    </Container>
  );
}
