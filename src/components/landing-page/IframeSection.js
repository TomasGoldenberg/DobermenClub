import React from 'react';

const IframeSection = ({ url, height, width }) => (
  <iframe
    height={height || 700}
    style={{ borderColor: '#161C24' }}
    width={width || window.innerWidth}
    src={url}
    title="embeded"
  />
);

export default IframeSection;
