import React from 'react';
import { Button, useMediaQuery } from '@material-ui/core';
import {
  useTheme,
  experimentalStyled as styled
} from '@material-ui/core/styles';
import { PATH_HOME } from '../../routes/paths';
import 'animate.css';

const AnimatedSection = () => {
  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.up('md'));

  return (
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
          style={{ marginLeft: isMobile ? '0px' : '120px' }}
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
          style={{
            marginLeft: isMobile ? '0px' : '126px',
            marginTop: '-156px'
          }}
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
        <Button target="_blank" href={PATH_HOME.purchase} variant="contained">
          CHECK IT OUT !
        </Button>
      </div>
    </div>
  );
};

export default AnimatedSection;
