import React from 'react';
import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

const LedBannerItem = ({
  image,
  primary,
  secondary,
  flexDirection,
  onlyText,
  shortenImage
}) => {
  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <div
      style={{
        position: 'relative',
        height: isMobile ? '335px' : '250px',
        display: 'flex',
        flexDirection: !isMobile ? flexDirection || 'row' : 'column',
        alignItems: 'center',
        justifyContent: onlyText ? 'center' : 'space-evenly'
      }}
    >
      <img
        src="https://i.ibb.co/qxrmMSj/Untitled-19-07-Artboard-8.png"
        alt="led"
        height={350}
        style={{
          width: '95%',
          position: 'absolute',
          zIndex: 1000
        }}
      />
      {onlyText ? (
        <>{primary}</>
      ) : (
        <>
          <div>
            <strong>{primary}</strong>
            {secondary}
          </div>

          <img
            style={
              shortenImage
                ? {
                    height: isMobile ? '120px' : '150px',
                    marginTop: isMobile ? '-80px' : '0px',
                    width: '75%'
                  }
                : {
                    height: isMobile ? '110px' : '150px',
                    marginTop: isMobile ? '-80px' : '0px'
                  }
            }
            alt="images"
            src={image}
          />
        </>
      )}
    </div>
  );
};

export default LedBannerItem;
