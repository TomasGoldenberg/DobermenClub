import { Link as RouterLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';

// material
import {
  alpha,
  useTheme,
  experimentalStyled as styled
} from '@material-ui/core/styles';
import { Box, Grid, Button, Container, useMediaQuery } from '@material-ui/core';
//
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import { getCollectionAssets } from '../../api/opensea';
import { DOBERMEN_ADDRESS, DOBERMEN_SLUG } from '../../config';
import { varFadeInUp, MotionInView, varFadeInRight } from '../animate';
// ----------------------------------------------------------------------

const variantScreenLeftMoblie = {
  initial: { x: '22%', y: -10, opacity: 0 },
  animate: { x: 0, y: 0, opacity: 1 }
};
const variantScreenRightMobile = {
  initial: { x: '26%', y: -30, opacity: 0 },
  animate: { x: '48%', y: -40, opacity: 1 }
};
const variantScreenLeft = {
  initial: { x: '30%', y: -30, opacity: 0 },
  animate: { x: 0, y: 0, opacity: 1 }
};
const variantScreenCenter = {
  initial: { opacity: 0 },
  animate: { opacity: 1 }
};
const variantScreenRight = {
  initial: { x: '34%', y: -50, opacity: 0 },
  animate: { x: '64%', y: -80, opacity: 1 }
};

// ----------------------------------------------------------------------
const CarrouselStyledMini = styled(Carousel)(({ theme }) => ({
  width: '100%',
  marginTop: '150px'
}));

export default function LandingHugePackElements() {
  const [assets, setAssets] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const theme = useTheme();

  const isLight = theme.palette.mode === 'light';
  const isRTL = theme.direction === 'rtl';
  const upSm = useMediaQuery(theme.breakpoints.up('sm'));
  const upMd = useMediaQuery(theme.breakpoints.up('md'));

  const textAnimate = upMd ? varFadeInRight : varFadeInUp;
  const screenLeftAnimate = upSm ? variantScreenLeft : variantScreenLeftMoblie;
  const screenCenterAnimate = variantScreenCenter;
  const screenRightAnimate = upSm
    ? variantScreenRight
    : variantScreenRightMobile;

  useEffect(() => {
    const getAssets = async () => {
      const assets = await getCollectionAssets(
        DOBERMEN_ADDRESS,
        DOBERMEN_SLUG,
        '40'
      );
      setAssets(assets);
    };
    getAssets();
  }, []);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Grid
      item
      xs={12}
      style={{
        display: 'flex',
        padding: '30px',
        flexDirection: upSm ? 'row' : 'column'
      }}
    >
      <Grid xs={12} sm={12} md={6}>
        <MotionInView variants={textAnimate}>
          <Typography
            gutterBottom
            variant="overline"
            sx={{ color: 'text.secondary', display: 'block' }}
          >
            GALLERY
          </Typography>
        </MotionInView>

        <MotionInView variants={textAnimate}>
          <Typography variant="h2" paragraph>
            DOBERMEN CLUB MEMBERS
          </Typography>
        </MotionInView>

        <CarrouselStyledMini>
          {assets.map((asset, index) => (
            <Card
              key={index}
              style={{
                height: '400px'
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="300"
                  image={asset.image_preview_url}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {asset.name}
                  </Typography>
                  {/*  <Typography variant="body2" color="text.secondary">
                    Minted at {asset?.sell_orders[0]?.created_date.slice(0, 10)}
                  </Typography> */}
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </CarrouselStyledMini>
      </Grid>
      <Grid xs={12} sm={12} md={12} sx={{ pl: upSm ? 10 : 0 }}>
        <MotionInView variants={textAnimate}>
          <Typography
            gutterBottom
            variant="overline"
            sx={{ color: 'text.secondary', display: 'block' }}
          >
            FAQ
          </Typography>
        </MotionInView>

        <MotionInView variants={textAnimate}>
          <Typography variant="h2" paragraph>
            FREQUENT QUESTIONS
          </Typography>
        </MotionInView>

        <div style={{ marginTop: upSm ? '210px' : '25px' }}>
          <Accordion
            expanded={expanded === 'panel1'}
            onChange={handleChange('panel1')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography>How to Buy a DOBER</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                In our opensea collection
                https://opensea.io/collection/thedobermenclub/. Connect your
                wallet/account / Select your favorite DOBER / Click Buy Now /
                Select payment method{' '}
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'panel2'}
            onChange={handleChange('panel2')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography>Why buy a DOBER</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                By Holding DOBER NFT you are going to be the owner of a part of
                our uprising price collection. The DOBER Asset floor price is
                always increasing its value. We are currently on pre-sale so our
                prices are low. And its a good oportunity to buy a DOBER that is
                going to be a avatar in our PLAY 2 EARN Future game
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'panel3'}
            onChange={handleChange('panel3')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3bh-content"
              id="panel3bh-header"
            >
              <Typography>How giveaways work ?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                If you Own a DOBER you are already whitelisted, If you dont,
                each giveaway is presented at our social media with its
                requisites ! When the totality of the collection has been
                minted, we gonna giveaway 2 Teslas !
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'panel4'}
            onChange={handleChange('panel4')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel4bh-content"
              id="panel4bh-header"
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                Any trouble ?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Contact us at dobermenclub@gmail.com.</Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </Grid>
    </Grid>
  );
}
