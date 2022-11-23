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
import Footer from '../components/doberland/FooterDoberland';

const publicIp = require('public-ip');

const RootStyle = styled(Page)({
  height: '100%'
});
const StyledImg = styled('img')({
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

  const StyledButton = styled(Button)(
    isMobile
      ? {
          position: 'absolute',
          width: '100%'
        }
      : {
          position: 'absolute',
          top: '25%',
          left: '66%',
          width: '30%',
          padding: '21px'
        }
  );

  return (
    <RootStyle title="DOBERLAND 3.0 | NFT COLLECTION">
      <Grid>
        <StyledImg
          src={
            isMobile
              ? 'https://i.ibb.co/j3NhyF5/3436-02-Artboard-6.png'
              : 'https://i.ibb.co/LnjRdZn/IMG-3198.png'
          }
          alt="background"
        />
        <StyledButton
          onClick={() => {
            history.push(PATH_DOBERLAND.castle);
          }}
          variant="contained"
        >
          ENTER
        </StyledButton>
      </Grid>
      <Footer />
    </RootStyle>
  );
};

export default DoberlandPage;
