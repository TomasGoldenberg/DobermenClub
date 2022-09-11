import React from 'react';

const IframeSection = ({ url, isMobile }) => (
  <iframe
    height={700}
    style={{ borderColor: 'black' }}
    width={window.innerWidth}
    src={url}
    title="embeded"
  />
);

export default IframeSection;
