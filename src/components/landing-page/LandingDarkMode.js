// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Grid, Button, Typography, Switch } from '@material-ui/core';
// hooks
import useSettings from '../../hooks/useSettings';
//
import {
  varFadeInUp,
  MotionInView,
  varFadeInLeft,
  varFadeInRight
} from '../animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(20, 0),
  backgroundColor: theme.palette.grey[900]
}));

const ContentStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.down('sm')]: {
    marginLeft: '20px',
    display: 'inline-flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  }
}));

// ----------------------------------------------------------------------
export default function LandingDarkMode({ isMobile }) {
  const MEMBERS = [
    {
      image:
        'https://lh3.googleusercontent.com/YUGMBvzKzvfVYvYEJHGf8X65G-MSTq9Td5AE0LExL_aLGrD21VvySTQ_VM5dJ-tR1a6D83R-WIAb-1DLit9-8s-B960YQcsiroSD',
      name: 'DOBER JOE',
      role: 'Co-Founder & Engineer'
    },
    {
      image:
        'https://lh3.googleusercontent.com/PxJyHDXVeFkWBzALxELUcel8Yb8T2BKfNe1jFjg_zFvxXet9vqbml7sogGK-MrEg4rPXA_9FSMIj-_f0zEhBMHbDkS2pAjNbSW2E',
      name: 'DOBER MARK',
      role: 'Co-Founder & Crypto artist'
    },
    {
      image:
        'https://lh3.googleusercontent.com/zESOghg2kSHHNU4KN9D5yaEMYmybHWa7tp5EeRTG6CEVwQMs9uW6LkdW_kQ8PQq9UPAKwbnZbXSN8pGFqmsZni1xNS2nMLb3PLHY',
      name: 'DOBER KAREEM',
      role: 'Art Director'
    },
    {
      image:
        'https://lh3.googleusercontent.com/0AApKfunbYZVIWQH-cCXSp13dI0ZK78q6fm5K6hb0dVvp8kUqxseEqoaIK1AtB05oaQZ0-J80RaUYSVMGlKvSJnPlMBa1I7xPqby5w',
      name: 'DOBER PAUL',
      role: 'Marketing'
    },
    {
      image:
        'https://lh3.googleusercontent.com/0AApKfunbYZVIWQH-cCXSp13dI0ZK78q6fm5K6hb0dVvp8kUqxseEqoaIK1AtB05oaQZ0-J80RaUYSVMGlKvSJnPlMBa1I7xPqby5w',
      name: 'DOBER PAUL',
      role: 'Marketing'
    }
  ];
  return (
    <RootStyle
      id="faq"
      style={isMobile ? { justifyContent: 'center', display: 'flex' } : {}}
    >
      <ContentStyle container style={{ justifyContent: 'space-around' }}>
        {MEMBERS.map((member, index) => (
          <Grid
            key={index}
            style={{
              objectFit: 'cover'
            }}
          >
            <img src={member.image} alt="member" width="217" height="216" />
            <Button
              variant="contained"
              style={{
                width: '217px',
                borderRadius: '0px',
                height: '90px'
              }}
            >
              <Box style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography
                  style={{ fontWeight: 'bold', fontSize: '24px' }}
                  variant="h3"
                  paragraph
                >
                  {member.name}
                </Typography>
                <Typography
                  variant="overline"
                  sx={{ color: 'text.primary', display: 'block' }}
                >
                  {member.role}
                </Typography>
              </Box>
            </Button>
          </Grid>
        ))}
      </ContentStyle>
    </RootStyle>
  );
}
