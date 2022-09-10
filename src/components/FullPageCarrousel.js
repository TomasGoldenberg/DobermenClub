import React, { useState, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';
import { getNews } from '../api/uploads';

const height = 400;
function Example() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getLatestNews = async () => {
      const news = await getNews();

      setItems(news);
    };
    getLatestNews();
  }, []);

  return (
    <>
      {items.length && (
        <Carousel
          height={`${height}px`}
          onChange={(current, prev) => {}}
          next={(next, active) =>
            console.log(`we left ${active}, and are now at ${next}`)
          }
          prev={(prev, active) =>
            console.log(`we left ${active}, and are now at ${prev}`)
          }
        >
          {items.map((item, i) => (
            <Item key={i} item={item} />
          ))}
        </Carousel>
      )}
    </>
  );
}

function Item(props) {
  return (
    <Paper
      style={{
        backgroundImage: `url("https://i.ibb.co/y0ScCQG/Untitled-19-09-Artboard-11.png")`,
        backgroundSize: 'cover',
        display: 'flex',
        justifyContent: 'space-evenly',
        paddingBottom: '10px',
        paddingTop: '10px'
      }}
    >
      <img
        alt="news"
        src={props.item.image}
        style={{ width: '30%', height: `${height}px` }}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }}
      >
        <h1 style={{ marginBottom: '30px' }}>{props.item.title}</h1>
        <h3>{props.item.text}</h3>
        {props.item.hasButton && (
          <Button
            sx={{ mt: 4 }}
            onClick={() => {
              window.open(props.item.buttonLink);
            }}
            className="CheckButton"
          >
            {props.item.buttonText}
          </Button>
        )}
      </div>
    </Paper>
  );
}

export default Example;
