import React, { useState, useEffect } from 'react';
// material
import {
  alpha,
  useTheme,
  experimentalStyled as styled
} from '@material-ui/core/styles';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import {
  Box,
  Grid,
  Card,
  Container,
  Typography,
  useMediaQuery,
  Chip
} from '@material-ui/core';
import WatchIcon from '@mui/icons-material/Watch';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { varFadeInUp, MotionInView, varFadeInDown } from '../animate';
import { getCollectionAssets } from '../../api/opensea';
import { DOBERMEN_ADDRESS, DOBERMEN_SLUG } from '../../config';
// ----------------------------------------------------------------------
dayjs.extend(relativeTime);

const CARDS = [
  {
    icon: '/static/icons/ic_design.svg',
    title: 'UI & UX Design',
    description:
      'The set is built on the principles of the atomic design system. It helps you to create projects fastest and easily customized packages for your projects.'
  },
  {
    icon: '/static/icons/ic_code.svg',
    title: 'Development',
    description:
      'Easy to customize and extend each component, saving you time and money.'
  },
  {
    icon: '/static/brand/logo_single.svg',
    title: 'Branding',
    description:
      'Consistent design in colors, fonts ... makes brand recognition easy.'
  }
];

const shadowIcon = (color) => `drop-shadow(2px 2px 2px ${alpha(color, 0.48)})`;

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: window.screen.width < 600 ? theme.spacing(5) : theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(15)
  }
}));

const CardStyle = styled(Card)(({ theme }) => {
  const shadowCard = (opacity) =>
    theme.palette.mode === 'light'
      ? alpha(theme.palette.grey[500], opacity)
      : alpha(theme.palette.common.black, opacity);

  return {
    maxWidth: 380,
    minHeight: 440,
    margin: 'auto',
    textAlign: 'center',
    padding: theme.spacing(2, 2, 0),
    boxShadow: `-40px 40px 80px 0 ${shadowCard(0.48)}`,
    [theme.breakpoints.up('md')]: {
      boxShadow: 'none',
      backgroundColor:
        theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
    },
    '&.cardLeft': {
      [theme.breakpoints.up('md')]: { marginTop: -40 }
    },
    '&.cardCenter': {
      [theme.breakpoints.up('md')]: {
        marginTop: -80,
        backgroundColor: theme.palette.background.paper
      }
    }
  };
});

const CardIconStyle = styled('img')(({ theme }) => ({
  width: 300,
  height: 300,
  margin: 'auto',
  marginBottom: '20px',
  filter: shadowIcon(theme.palette.primary.main)
}));

// ----------------------------------------------------------------------

export default function MintCountDown() {
  const [countDown, setCountDown] = useState('23:00:19');
  const [latestAssets, setLatestAssets] = useState([]);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  useEffect(() => {
    const parseTime = (time) => {
      if (time.toString().length === 1) {
        return `0${time}`;
      }
      return time.toString();
    };
    const now = new Date();

    const releaseHour = 17;

    let leftHour = parseTime(releaseHour - now.getHours());

    if (releaseHour - now.getHours() < 0) {
      const difference = now.getHours() - releaseHour;
      leftHour = parseTime(24 - difference);
    }

    const leftMinutes = parseTime(59 - now.getMinutes());
    const leftSeconds = parseTime(59 - now.getSeconds());

    setCountDown(`${leftHour}:${leftMinutes}:${leftSeconds}`);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      let changeHour = false;
      let changeMinute = false;
      let time;
      setCountDown((prevState) => (time = prevState));

      if (!time) {
        return () => {};
      }

      const hours = Number(time.slice(0, 2));
      const minutes = Number(time.slice(3, 5));
      const seconds = Number(time.slice(-2));
      let hoursString = time.slice(0, 2);
      let minutesString = time.slice(3, 5);
      let secondsString = time.slice(-2);

      const handleZeros = (number) => {
        let string = number.toString();
        const isLessThanTen = string.length === 1;
        string = isLessThanTen ? `0${string}` : string;
        return string;
      };

      if (
        minutesString === '00' &&
        secondsString === '00' &&
        hoursString === '00'
      ) {
        hoursString = '23';
        changeHour = true;
        minutesString = '59';
        changeMinute = true;
        secondsString = '59';
      }

      if (minutesString === '00' && secondsString === '00' && !changeHour) {
        hoursString = handleZeros(hours - 1);
        changeHour = true;
        minutesString = '59';
        changeMinute = true;
        secondsString = '59';
      }

      if (secondsString === '00' && !changeHour) {
        minutesString = handleZeros(minutes - 1);
        secondsString = '59';
        changeMinute = true;
      }

      if (!changeMinute && !changeHour) {
        secondsString = handleZeros(seconds - 1);
      }

      const newTime = `${hoursString}:${minutesString}:${secondsString}`;
      setCountDown(newTime);
    }, 1000);

    const getLatestNfts = async () => {
      const items = await getCollectionAssets(DOBERMEN_ADDRESS, DOBERMEN_SLUG);
      setLatestAssets(items);
    };
    getLatestNfts();
  }, []);
  const getNextCountDown = () => {
    const hours = Number(countDown.slice(0, 2)) + 24;
    const restOfTheTime = countDown.slice(2, countDown.length);
    const newTime = `${hours}${restOfTheTime}`;
    return newTime;
  };

  const getTraitByType = (list, type) =>
    list.filter((asset) => asset.trait_type?.toUpperCase() === type);

  const getCardLabel = (index, latestAsset) => {
    let cardOrder;
    if (index === 0) {
      cardOrder = 'prev';
    } else if (index === 1) {
      cardOrder = 'current';
    }
    if (index === 2) {
      cardOrder = 'next';
    }

    const sellOrderSafe = latestAsset.sell_orders?.length
      ? latestAsset.sell_orders[0]
      : null;
    const gmtBrowser = new Date().getTimezoneOffset() / 60;
    let createdDate = new Date(sellOrderSafe?.created_date);
    const hoursInMilliseconds = 3600000;
    if (sellOrderSafe) {
      if (gmtBrowser > 0) {
        createdDate = new Date(
          new Date(createdDate) - hoursInMilliseconds * gmtBrowser
        );
      } else {
        createdDate = new Date(
          new Date(createdDate) + hoursInMilliseconds * gmtBrowser
        );
      }
    }
    const labels = {
      prev: `Minted  ${
        sellOrderSafe ? dayjs(createdDate.toISOString()).fromNow() : 'Last mint'
      }`,
      current: `Minted in ${countDown}`,
      next: `Minted in ${getNextCountDown()}`
    };

    return labels[cardOrder];
  };
  return (
    <RootStyle id="release">
      <Container maxWidth="lg">
        <Box sx={{ mb: { xs: 10, md: 25 } }}>
          <MotionInView variants={varFadeInUp}>
            <Typography
              gutterBottom
              variant="overline"
              align="center"
              sx={{ color: 'text.secondary', display: 'block' }}
            >
              Latest Mints
            </Typography>
          </MotionInView>
          <MotionInView variants={varFadeInDown}>
            <Typography variant="h2" align="center" sx={{ color: '#25C369' }}>
              Next Release in : {countDown}
            </Typography>
          </MotionInView>
        </Box>

        <Grid container spacing={isDesktop ? 10 : 5}>
          {latestAssets.map((latestAsset, index) => {
            let rarety = latestAsset.traits.find(
              (asset, index) => asset.trait_type === 'RARETY'
            )?.value;

            const powers = getTraitByType(latestAsset.traits, 'POWER');
            const accessories = getTraitByType(
              latestAsset.traits,
              'ACCESSORIES'
            );

            if (window.screen.width < 600 && index === 0) {
              return <> </>;
            }

            if (index > 0) {
              rarety = '????';
              latestAsset.image_preview_url =
                'https://i.ibb.co/JKLyzmL/2847-01-Artboard-25-2.png';
              latestAsset.name = '????';
            }

            if (index === 2) {
              latestAsset.image_preview_url =
                'https://i.ibb.co/XXGKTWc/2847-01-Artboard-25-1.png';
            }
            return (
              <Grid key={index} item xs={12} md={4}>
                <MotionInView variants={varFadeInUp}>
                  <CardStyle
                    className={
                      (index === 0 && 'cardLeft') ||
                      (index === 1 && 'cardCenter')
                    }
                  >
                    <Typography
                      variant="h5"
                      paragraph
                      sx={{ color: '#25C369', mt: 2 }}
                    >
                      {getCardLabel(index, latestAsset)}
                    </Typography>
                    <CardIconStyle
                      src={latestAsset ? latestAsset.image_preview_url : ''}
                      alt={latestAsset?.name}
                      sx={{
                        ...(index === 0 && {
                          filter: (theme) => shadowIcon(theme.palette.info.main)
                        }),
                        ...(index === 1 && {
                          filter: (theme) =>
                            shadowIcon(theme.palette.error.main)
                        })
                      }}
                    />

                    <Grid xs={12}>
                      <Box
                        style={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}
                      >
                        <Grid
                          xs={12}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between'
                          }}
                        >
                          <Chip
                            label={rarety?.toUpperCase()}
                            variant="outlined"
                            color="primary"
                            icon={<LocalFireDepartmentIcon />}
                          />

                          <Typography variant="h5" paragraph>
                            <Chip label={latestAsset?.name} color="warning" />
                          </Typography>
                        </Grid>
                      </Box>
                      <Grid
                        xs={12}
                        style={{
                          display: 'flex',
                          marginBottom: '15px',
                          justifyContent: 'space-between'
                        }}
                      >
                        <Chip
                          label={`Powers : ${index > 0 ? '?' : powers.length}`}
                          variant="outlined"
                          color="error"
                          icon={<FlashOnIcon />}
                        />
                        <Chip
                          label={`Accessories : ${
                            index > 0 ? '?' : accessories.length
                          }`}
                          variant="outlined"
                          color="secondary"
                          icon={<WatchIcon />}
                        />
                      </Grid>

                      <Grid
                        xs={12}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '10px'
                        }}
                      >
                        {powers?.map((item) => {
                          if (index > 0) {
                            return <></>;
                          }
                          return (
                            <Chip
                              icon={<FlashOnIcon />}
                              key={item.value}
                              size="small"
                              label={item.value.toUpperCase()}
                              color="error"
                            />
                          );
                        })}
                      </Grid>
                    </Grid>
                  </CardStyle>
                </MotionInView>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </RootStyle>
  );
}
