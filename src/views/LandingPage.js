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
  return (
    <RootStyle title="DobermenClub | NFT COLLECTION" id="move_top">
      <LandingHero />

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
