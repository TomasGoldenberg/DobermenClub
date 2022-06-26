import React, { useEffect } from 'react';
import { Button, useMediaQuery } from '@material-ui/core';
// material
import {
  useTheme,
  experimentalStyled as styled
} from '@material-ui/core/styles';
// components
import Page from '../components/Page';
import {
  LedBannerItem,
  LandingFooter,
  MintCountDown,
  NextMilestone,
  LandingDarkMode,
  LandingAdvertisement,
  IframeSection,
  LandingHugePackElements,
  PhotoSection,
  AnimatedSection
} from '../components/landing-page';
import { LOGnewVisit } from '../api/metrics';
import AnalyticsVisitsByCountry from '../components/analytics/AnalyticsVisitsByCountry';
import 'animate.css';
import { PATH_HOME } from '../routes/paths';

const publicIp = require('public-ip');

// ----------------------------------------------------------------------

const RootStyle = styled(Page)({
  height: '100%'
});

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default
}));

// ----------------------------------------------------------------------

export default function LandingPage() {
  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    const logMetric = async (type) => {
      const ip = await publicIp.v4();
      try {
        LOGnewVisit(ip, 'NONE', 'NONE', type);
      } catch (error) {
        console.log(error);
      }
    };

    logMetric('home_visits');
  }, []);

  const BANNERS = [
    {
      primary: (
        <p
          style={{
            fontFamily: 'system-ui',
            fontSize: isMobile ? '20px' : '24px'
          }}
        >
          What is an NFT Anyway ?
          <strong style={{ fontSize: isMobile ? '30px' : '34px' }}>
            {' '}
            <br /> Any asset with value{' '}
          </strong>
        </p>
      ),
      flexDirection: 'row-reverse',
      image: 'https://i.ibb.co/YNghHZw/Untitled-19-11-Artboard-13.png'
    },
    {
      primary: (
        <p
          style={{
            fontFamily: 'system-ui',
            fontSize: isMobile ? '20px' : '24px',
            marginLeft: '50px'
          }}
        >
          Represented by a unique {isMobile && 'entry'}
          <br />
          <strong style={{ fontSize: isMobile ? '30px' : '34px' }}>
            {' '}
            {!isMobile && 'entry'} on a BLOCKCHAIN
          </strong>
        </p>
      ),
      flexDirection: 'row',
      shortenImage: isMobile,
      image: 'https://i.ibb.co/Tg4kZDn/Untitled-19-10-Artboard-12.png'
    },
    {
      primary: (
        <p
          style={{
            fontFamily: 'system-ui',
            fontSize: isMobile ? '20px' : '24px'
          }}
        >
          PROVE OWNERSHIP <br />{' '}
          <strong style={{ fontSize: isMobile ? '30px' : '34px' }}>
            {' '}
            Sell or trade the asset
          </strong>
        </p>
      ),
      flexDirection: 'row-reverse',
      image: 'https://i.ibb.co/DYyNWMm/Untitled-19-12-Artboard-14.png'
    },
    {
      onlyText: true,
      primary: (
        <h2>
          <strong style={{ fontSize: isMobile ? '29px' : '34px' }}>
            BUY YOUR OWN DOBER{isMobile && <br />} NFT JUST HERE
          </strong>
        </h2>
      )
    }
  ];

  return (
    <RootStyle title="DobermenClub | NFT COLLECTION" id="move_top">
      <ContentStyle>
        <PhotoSection image="https://i.ibb.co/DRS8xd8/IMG-1396.jpg" />
        <AnimatedSection />

        <PhotoSection image="https://i.ibb.co/mC0c2Hv/subhero.jpg" />
        <IframeSection url="https://dober-gallery.vercel.app/" />
        <div
          style={{
            backgroundImage: `url("https://i.ibb.co/y0ScCQG/Untitled-19-09-Artboard-11.png")`,
            backgroundSize: 'cover'
          }}
        >
          {BANNERS.map((banner) => (
            <LedBannerItem key={banner.image} {...banner} />
          ))}
        </div>
        <PhotoSection image="https://i.ibb.co/Fwk95dw/Untitled-19-13-Artboard-15.png" />

        <AnalyticsVisitsByCountry version="PUBLIC" />
        <NextMilestone />
        <div
          style={{
            backgroundImage: `url("https://i.ibb.co/y0ScCQG/Untitled-19-09-Artboard-11.png")`,
            backgroundSize: 'cover'
          }}
        >
          <MintCountDown />
        </div>

        <LandingHugePackElements />
        <LandingDarkMode isMobile={isMobile} />
        <PhotoSection
          hasButton
          link="https://discord.com/invite/z3PbKfPwHh/"
          image="https://i.ibb.co/kXtjtGb/2847-01-Artboard-25.png"
        />
        <LandingFooter />
      </ContentStyle>
    </RootStyle>
  );
}
