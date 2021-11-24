// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Button, Box, Container, Paper } from '@material-ui/core';
import Carousel from 'react-material-ui-carousel';
// routes
import { PATH_HOME } from '../../routes/paths';
//
import { varFadeInDown, varFadeInUp, MotionInView } from '../animate';

// ----------------------------------------------------------------------
const items = [
  {
    title: '#0,003 Minted',
    subtitle: '#0,003 Dober is now available',

    image: 'https://i.ibb.co/d05jcRh/1506-01-Artboard-3.png'
  },
  {
    title: '#0,004 Minted',
    subtitle: '#0,004 Dober is now available',
    image: 'https://i.ibb.co/VpcSnsk/1506-1-01-Artboard-3.png'
  },
  { image: 'https://i.ibb.co/fGDB6X6/2847-01-Artboard-25-3.png' },
  { image: 'https://i.ibb.co/Xk8MjNv/DOBER-girl-face-03-Artboard-4.png' }
];

const CarrouselStyled = styled(Carousel)(({ theme }) => ({
  width: '100%'
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 456,
  margin: 'auto',
  overflow: 'hidden',
  paddingBottom: theme.spacing(10),
  borderRadius: theme.shape.borderRadiusMd,
  backgroundImage: `linear-gradient(135deg,
    ${theme.palette.primary.main} 0%,
    ${theme.palette.primary.dark} 100%)`,
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    maxWidth: '100%',
    paddingBottom: 0,
    alignItems: 'center'
  }
}));

// ----------------------------------------------------------------------

export default function LandingAdvertisement() {
  return (
    <Container maxWidth="lg" id="advertising" style={{ marginTop: '5px' }}>
      <CarrouselStyled navButtonsAlwaysVisible>
        {items.map((item, i) => (
          <Paper
            key={i}
            style={{
              backgroundSize: 'cover',
              backgroundImage: `url(${item.image})`,
              height: '700px',
              position: 'relative',
              backgroundRepeat: 'no-repeat'
            }}
          />
        ))}
      </CarrouselStyled>
    </Container>
  );
}
