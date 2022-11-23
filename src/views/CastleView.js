import React, { useState } from 'react';
import {
  useTheme,
  experimentalStyled as styled
} from '@material-ui/core/styles';
import { Modal, Box, Button, useMediaQuery } from '@material-ui/core';

import Page from '../components/Page';
import InfoDoor from '../components/doberland/InfoDoor';

const SECTIONS_TEXT = {
  roadmap: [
    {
      link: 'https://i.ibb.co/f9j6Fx9/Map-old-01-Artboard-2-1.png',
      width: 1000,
      height: 500
    },
    {
      link: 'https://i.ibb.co/nkHRG8n/Map-old-01-Artboard-2-2.png',
      width: 550,
      height: 600
    }
  ],
  anatomy: [
    {
      link: 'https://i.ibb.co/wzpDZ4D/40768-01-Artboard-3.png',
      width: 1000,
      height: 600
    },
    {
      link: 'https://i.ibb.co/k8rGhdG/40768-02-Artboard-3-Copy.png',
      width: 1000,
      height: 600
    }
  ],
  history: [
    {
      link: 'https://i.ibb.co/MhgCc62/40768-02-Artboard-3-Copy-2.png',
      width: 1000,
      height: 500
    },
    {
      link: 'https://i.ibb.co/BgCTmB3/40768-01-Artboard-3-1.png',
      width: 1000,
      height: 600
    }
  ]
};

const CastleView = () => {
  const [sectionText, setSectionText] = useState('');
  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.up('md'));
  const background =
    'https://i.ibb.co/xLSR2HZ/2112-w032-n003-246-B-p1-246-01-Artboard-2-3.png';

  return (
    <>
      <div
        style={
          isMobile
            ? {
                display: 'flex',
                overflow: 'hidden',
                width: '100%',
                flexDirection: 'column',
                justifyContent: 'center',
                backgroundImage: `url(${background})`
              }
            : {
                display: 'flex',
                overflow: 'hidden',
                width: '100%',
                height: '90vh',
                justifyContent: 'center',
                backgroundImage: `url(${background})`
              }
        }
      >
        <InfoDoor
          isMobile={isMobile}
          setSectionText={setSectionText}
          section="Roadmap"
        />
        <InfoDoor
          isMobile={isMobile}
          setSectionText={setSectionText}
          section="History"
        />
        <InfoDoor
          isMobile={isMobile}
          setSectionText={setSectionText}
          section="Anatomy"
        />
      </div>
      <Modal
        sx={{ overflow: isMobile ? 'scroll' : 'auto' }}
        open={Boolean(sectionText.length)}
        onClose={() => {
          setSectionText([]);
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: isMobile ? '90%' : '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: isMobile ? '100%' : '90%',
            bgcolor: 'transparent',
            overflow: isMobile ? 'scroll' : 'auto',
            p: 4
          }}
        >
          <div
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: 'center',
              overflow: isMobile ? 'scroll' : 'auto'
            }}
          >
            {SECTIONS_TEXT[sectionText]?.map((sectionImage) => (
              <img
                style={
                  isMobile
                    ? { width: '100%' }
                    : { maxWidth: `${sectionImage.width}px` }
                }
                width={sectionImage.width}
                height={sectionImage.height}
                key={sectionImage.link}
                src={sectionImage.link}
                alt="background"
              />
            ))}
            {isMobile && (
              <Button
                variant="contained"
                onClick={() => {
                  setSectionText([]);
                }}
              >
                Close
              </Button>
            )}
          </div>
        </Box>
      </Modal>
    </>
  );
};
export default CastleView;
