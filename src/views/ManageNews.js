import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Container,
  Typography,
  TextField,
  Switch,
  Button,
  IconButton,
  CircularProgress
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import Page from '../components/Page';
import { getNews, deleteNews } from '../api/uploads';

const UploadsPage = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const getAllNews = async () => {
      setLoading(true);
      const news = await getNews();
      setNews(news);
      setLoading(false);
    };
    getAllNews();
  }, []);

  const handleDelete = async (itemId) => {
    try {
      await deleteNews(itemId);
      const updatedNews = news.filter((item) => item.id !== itemId);
      setNews(updatedNews);
    } catch (error) {
      prompt(error.message);
    }
  };
  return (
    <Page title="Dober News Managment">
      <Container maxWidth="x1" sx={{ mt: 13 }}>
        <Grid container spacing={2}>
          {loading ? (
            <div
              style={{
                height: '100vh',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <CircularProgress />
            </div>
          ) : (
            <Grid item xs={12}>
              {news.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <img alt="item" src={item.imageThumb} />
                  <Typography>{item.title}</Typography>
                  <IconButton
                    onClick={() => {
                      handleDelete(item.id);
                    }}
                  >
                    X
                  </IconButton>
                </Box>
              ))}
              {!news.length && 'No News to manage'}
            </Grid>
          )}
        </Grid>
      </Container>
    </Page>
  );
};

export default UploadsPage;
