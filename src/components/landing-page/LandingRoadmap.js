// material
import React from 'react';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Container, Button, Paper } from '@material-ui/core';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
//
import { varFadeInUp, MotionInView } from '../animate';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 520,
  margin: 'auto',
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    textAlign: 'left'
    // position: 'absolute'
  }
}));

const Content = styled('div')(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column'
  }
}));

const ListItemStyled = styled(ListItem)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px'
  }
}));

const ListContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '50%',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));

// ----------------------------------------------------------------------
const steps = [
  {
    label: '1% MINTED: Starting Engines',
    image: 'https://i.ibb.co/4WsMVqN/Assets-site-04-Artboard-31-Copy-3.png',
    description: `The club is now open and the nigth is young , lets get it started with a 3 NFT giveaway to our DOBER Owners`
  },
  {
    label: '5% MINTED: Happy Hour',
    image: 'https://i.ibb.co/PCBySpj/Assets-site-01-Artboard-31.png',
    description: `More new faces in the club .. lets make it more intresting with a 5 NFT giveaway and 500 USD.`
  },
  {
    label: '10% MINTED: Who let the dogs out ',
    image: 'https://i.ibb.co/D4kF2LX/Assets-site-02-Artboard-31-Copy.png',
    description: `The night is just getting started, in this stage we are going to distribute monthly the 1% of our earnings to the DOBER Owners.`
  },
  {
    label: '20% MINTED: Time to play',
    image: 'https://i.ibb.co/mGpDMDF/Assets-site-04-Artboard-31-Copy-3-1.png',
    description: `Start Play 2 Earn DOBER Nft game building,Monthly owners retribution upgrades to 5% .`
  },
  {
    label: '50% MINTED Game Release',
    image: 'https://i.ibb.co/nLnG4r3/Assets-site-02-Artboard-31-Copy-1.png',
    description: `Release the game with our own token, 15 NFT giveaway`
  },

  {
    label: '75% MINTED: Giving back',
    image: 'https://i.ibb.co/1sRsGGh/Assets-site-03-Artboard-31-Copy-2-1.png',
    description: `we are going to donate 5 ETH to a dogs charity organization and upgrade owner retribution to 10%.`
  },
  {
    label: '100% MINTED: Thank you !',
    image: 'https://i.ibb.co/nMg4NRQ/Assets-site-03-Artboard-31-Copy-2.png',
    description: `We are giving away 2 teslas.`
  }
];
export default function LandingRoadmap() {
  return (
    <RootStyle id="roadmap">
      <Container maxWidth="lg">
        <ContentStyle>
          <MotionInView variants={varFadeInUp}>
            <Typography
              gutterBottom
              variant="overline"
              sx={{ color: 'text.secondary', display: 'block' }}
            >
              ROADMAP
            </Typography>
          </MotionInView>

          <MotionInView variants={varFadeInUp}>
            <Typography variant="h2" paragraph>
              Milestones
            </Typography>
          </MotionInView>
        </ContentStyle>
        <Content>
          <Box>
            <img
              alt="gif"
              style={{ marginRight: '100px' }}
              src="https://i.ibb.co/hFRdvyb/giphy.gif"
            />
          </Box>
          <ListContainer>
            <List dense>
              {steps.map((step) => (
                <ListItemStyled key={step.label}>
                  <ListItemIcon>
                    <img
                      src={step.image}
                      alt="percentaje"
                      height="90"
                      width="90"
                    />
                  </ListItemIcon>
                  <ListItemText
                    style={{ maxWidth: '313px' }}
                    primary={step.label}
                    secondary={step.description}
                  />
                </ListItemStyled>
              ))}
            </List>
          </ListContainer>
        </Content>
      </Container>
    </RootStyle>
  );
}
