import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
// components
import Page from '../components/Page';
import {
  LedBannerItem,
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
import 'animate.css';

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

  const BANNERS = [
    {
      primary: (
        <p style={{ fontFamily: 'system-ui', fontSize: '24px' }}>
          What is an NFT Anyway ?
          <strong style={{ fontSize: '34px' }}>
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
            fontSize: '24px',
            marginLeft: '50px'
          }}
        >
          Represented by a unique
          <br />
          <strong style={{ fontSize: '34px' }}> entry on a BLOCKCHAIN</strong>
        </p>
      ),
      flexDirection: 'row',
      image: 'https://i.ibb.co/Tg4kZDn/Untitled-19-10-Artboard-12.png'
    },
    {
      primary: (
        <p style={{ fontFamily: 'system-ui', fontSize: '24px' }}>
          PROVE OWNERSHIP <br />{' '}
          <strong style={{ fontSize: '34px' }}> Sell or trade the asset</strong>
        </p>
      ),
      flexDirection: 'row-reverse',
      image: 'https://i.ibb.co/DYyNWMm/Untitled-19-12-Artboard-14.png'
    },
    {
      onlyText: true,
      primary: (
        <h2>
          <strong style={{ fontSize: '34px' }}>
            BUY YOUR OWN DOBER NFT JUST HERE
          </strong>
        </h2>
      )
    }
  ];

  return (
    <RootStyle title="DobermenClub | NFT COLLECTION" id="move_top">
      <ContentStyle>
        <PhotoSection image="https://i.ibb.co/DRS8xd8/IMG-1396.jpg" />

        <div
          style={{
            marginTop: '40px',
            marginBottom: '40px',
            justifyContent: 'space-around',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <div>
            <img
              width={300}
              style={{ marginLeft: '120px' }}
              height={250}
              className="animate__animated animate__bounce animate__infinite animate__slow"
              src="https://i.ibb.co/VjVNy4k/Untitled-19-1-03-Artboard-3.png"
              alt="basket"
            />
            <img
              className="animate__animated animate__pulse animate__infinite"
              src="https://i.ibb.co/WcPwcDw/Untitled-19-1-02-Artboard-2.png"
              alt="basket"
              width={300}
              style={{ marginLeft: '126px', marginTop: '-156px' }}
              height={250}
            />
          </div>

          <div>
            <h1 style={{ marginBottom: '20px', fontWeight: 'bold' }}>
              Visit our OPENSEA store !
            </h1>
            <p style={{ marginBottom: '15px' }}>
              Visit our official store to adquire one of the <br /> trendiest
              projects of the month !
            </p>
            <Button variant="contained">CHECK IT OUT !</Button>
          </div>
        </div>
        {window.screen.width < 600 && (
          <PhotoSection image="https://i.ibb.co/BKCGZP1/hero.jpg" />
        )}
        <PhotoSection image="https://i.ibb.co/mC0c2Hv/subhero.jpg" />

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
