import React, { useEffect } from 'react';
import { Button, useMediaQuery, Grid } from '@material-ui/core';
// material
import {
  useTheme,
  experimentalStyled as styled
} from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

// components
import Page from '../components/Page';
import { LOGnewVisit } from '../api/metrics';
import { getSectionContent } from '../api/contents';
import 'animate.css';
import { PATH_DOBERLAND } from '../routes/paths';
import Footer from '../components/landing-page/LandingFooter';

const publicIp = require('public-ip');

const RootStyle = styled(Page)({
  height: '100%'
});
const StyledImg = styled('img')({
  height: '100vh'
});
const StyledButton = styled(Button)({
  position: 'absolute',
  top: '70%',
  width: '100%'
});

const DoberlandPage = () => {
  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.up('md'));
  const history = useHistory();

  useEffect(() => {
    const logMetric = async () => {
      const ip = await publicIp.v4();
      try {
        LOGnewVisit(ip, 'NONE', 'NONE', 'DOBERLAND');
      } catch (error) {
        console.log(error);
      }
    };
    logMetric();
  }, []);

  return (
    <RootStyle title="DOBERLAND 3.0 | NFT COLLECTION">
      <Grid>
        <StyledImg
          src="https://i.ibb.co/BjQWFpL/3436-01-Artboard-4-2.png"
          alt="background"
        />
        <StyledButton
          onClick={() => {
            history.push(PATH_DOBERLAND.castle);
          }}
          variant="contained"
        >
          Enter
        </StyledButton>
      </Grid>
      <Footer />
    </RootStyle>
  );
};

export default DoberlandPage;
