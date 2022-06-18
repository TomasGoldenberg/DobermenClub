import React from 'react';
import { Box, Button } from '@material-ui/core';

const PhotoSection = ({ hasButton, image, link }) => {
  console.log(window?.innerWidth);
  return (
    <Box>
      <img src={image} width={window?.innerWidth} alt="join us" />
      {hasButton && (
        <Box
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <Button
            variant="contained"
            sx={{
              width: '100%',
              borderRadius: '0px'
            }}
            onClick={() => {
              window.open(link);
            }}
          >
            JOIN DISCORD
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default PhotoSection;
