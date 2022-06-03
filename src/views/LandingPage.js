import React, { useEffect } from 'react';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
// components
import Page from '../components/Page';
import {
  LandingHero,
  LandingFooter,
  MintCountDown,
  NextMilestone,
  LandingDarkMode,
  LandingAdvertisement,
  LandingRoadmap,
  LandingHugePackElements,
  PhotoSection
} from '../components/landing-page';
import { LOGnewVisit } from '../api/metrics';
import AnalyticsVisitsByCountry from '../components/analytics/AnalyticsVisitsByCountry';

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
  return (
    <RootStyle title="DobermenClub | NFT COLLECTION" id="move_top">
      <LandingHero />
      <AnalyticsVisitsByCountry version="PUBLIC" />

      <ContentStyle>
        {window.screen.width < 600 && (
          <PhotoSection image="https://i.ibb.co/z4jTcdC/DOBER-girl-face-02-Artboard-4.png" />
        )}
        <NextMilestone />
        <MintCountDown />
        <PhotoSection image="https://i.ibb.co/Mh6S0QF/1882-01-Artboard-2-2.png" />
        {window.screen.width > 600 && <LandingAdvertisement />}
        <LandingRoadmap />

        <LandingHugePackElements />
        <LandingDarkMode />
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
