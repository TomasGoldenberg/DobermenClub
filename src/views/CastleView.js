import React, { useState } from 'react';
import {
  useTheme,
  experimentalStyled as styled
} from '@material-ui/core/styles';
import { Modal, Box, Typography } from '@material-ui/core';

import Page from '../components/Page';
import InfoDoor from '../components/doberland/InfoDoor';

const SECTIONS_TEXT = {
  roadmap: [
    {
      link: 'https://i.ibb.co/9ZZQcbG/Map-old-01-Artboard-2.png',
      width: 1000,
      height: 500
    },
    { link: 'https://i.ibb.co/GW03Qcg/IMG-3181.png', width: 1000, height: 600 }
  ],
  anatomy: [
    {
      link: 'https://i.ibb.co/9ZZQcbG/Map-old-01-Artboard-2.png',
      width: 1000,
      height: 500
    },
    { link: 'https://i.ibb.co/GW03Qcg/IMG-3181.png', width: 1000, height: 600 }
  ],
  history: [
    {
      link: 'https://i.ibb.co/9ZZQcbG/Map-old-01-Artboard-2.png',
      width: 1000,
      height: 500
    },
    { link: 'https://i.ibb.co/GW03Qcg/IMG-3181.png', width: 1000, height: 600 }
  ]
};

const CastleView = () => {
  const [sectionText, setSectionText] = useState('');

  const background =
    'https://i.ibb.co/xLSR2HZ/2112-w032-n003-246-B-p1-246-01-Artboard-2-3.png';

  return (
    <>
      <div
        style={{
          display: 'flex',
          overflow: 'hidden',
          width: '100%',
          height: '90vh',

          justifyContent: 'center',
          backgroundImage: `url(${background})`
        }}
      >
        <InfoDoor setSectionText={setSectionText} section="Roadmap" />
        <InfoDoor setSectionText={setSectionText} section="History" />
        <InfoDoor setSectionText={setSectionText} section="Anatomy" />
      </div>
      <Modal
        open={Boolean(sectionText.length)}
        onClose={() => {
          setSectionText([]);
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '25%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'transparent',
            p: 4
          }}
        >
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {SECTIONS_TEXT[sectionText]?.map((sectionImage) => (
              <>
                {sectionImage.width ? (
                  <img
                    style={{ maxWidth: `${sectionImage.width}px` }}
                    width={sectionImage.width}
                    height={sectionImage.height}
                    key={sectionImage.link}
                    src={sectionImage.link}
                    alt="background"
                  />
                ) : (
                  <img
                    key={sectionImage.link}
                    src={sectionImage.link}
                    alt="background"
                  />
                )}
              </>
            ))}
          </div>
        </Box>
      </Modal>
    </>
  );
};
export default CastleView;
