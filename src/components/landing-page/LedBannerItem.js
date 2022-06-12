import React from 'react';

const LedBannerItem = ({ image, text, flexDirection, onlyText }) => {
  const flex = 'yes';
  return (
    <div
      style={{
        position: 'relative',
        height: '250px',
        display: 'flex',
        flexDirection: flexDirection || 'row',
        alignItems: 'center',
        justifyContent: onlyText ? 'center' : 'space-around'
      }}
    >
      <img
        src="https://i.ibb.co/qxrmMSj/Untitled-19-07-Artboard-8.png"
        alt="led"
        style={{ position: 'absolute', zIndex: 99999 }}
      />
      {onlyText ? (
        <>{text}</>
      ) : (
        <>
          {text}
          <img height={200} alt="images" src={image} />
        </>
      )}
    </div>
  );
};

export default LedBannerItem;
