import React from 'react';
import {
  useTheme,
  experimentalStyled as styled
} from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const StyledImg = styled('img')({
  height: '80vh',
  width: `${window.innerWidth / 3}px`,
  marginTop: '12px',
  backgroundRepeat: 'no-repeat'
});

const InfoDoor = ({ section, setSectionText }) => {
  const doorImg =
    'https://i.ibb.co/LCNBKHc/2112-w032-n003-246-B-p1-246-02-Artboard-3-1.png';

  return (
    <div style={{ position: 'relative' }}>
      <StyledImg src={doorImg} />
      <Button
        variant="contained"
        onClick={() => {
          setSectionText(section.toLowerCase());
        }}
        sx={{
          ml: '33%',
          mt: 5,
          position: 'absolute',
          left: '7%',
          width: '100px',
          top: '44%'
        }}
      >
        {section}
      </Button>
    </div>
  );
};

export default InfoDoor;
