import React from 'react';

const LedBannerItem = ({
  image,
  primary,
  secondary,
  flexDirection,
  onlyText
}) => {
  const flex = 'yes';
  return (
    <div
      style={{
        position: 'relative',
        height: '250px',
        display: 'flex',
        flexDirection: flexDirection || 'row',
        alignItems: 'center',
        justifyContent: onlyText ? 'center' : 'space-evenly'
      }}
    >
      <img
        src="https://i.ibb.co/qxrmMSj/Untitled-19-07-Artboard-8.png"
        alt="led"
        style={{
          width: '95%',
          position: 'absolute',
          zIndex: 99999
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

          <img height={150} alt="images" src={image} />
        </>
      )}
    </div>
  );
};

export default LedBannerItem;
