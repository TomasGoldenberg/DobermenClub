import React, { useState } from 'react';
import {
  Box,
  Grid,
  Container,
  Typography,
  TextField,
  Switch,
  Button,
  CircularProgress
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import Page from '../components/Page';
import { postImage, uploadNews } from '../api/uploads';

const UploadsPage = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    hasButton: false,
    buttonText: '',
    buttonLink: '',
    imageThumb: '',
    image: ''
  });

  const handleChange = (field, value, isMultiple, values) => {
    if (!isMultiple) {
      setFormData({
        ...formData,
        [field]: value
      });
    } else {
      setFormData({
        ...formData,
        ...values
      });
    }
  };
  const handleUpload = async (e) => {
    try {
      setLoading(true);
      const { url, thumb } = await postImage(e.target.files[0]);
      const newValues = {
        imageThumb: thumb.url,
        image: url
      };
      handleChange(null, null, true, newValues);
    } catch (error) {
      prompt(error.message);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await uploadNews(formData);
      window.location.reload();
    } catch (error) {
      prompt(error.message);
    }
    setLoading(false);
  };
  return (
    <Page title="Dober uploads">
      <Container maxWidth="x1" sx={{ mt: 13 }}>
        <Grid container spacing={2}>
          {loading ? (
            <CircularProgress />
          ) : (
            <Grid item xs={12}>
              <TextField
                fullWidth
                value={formData.title}
                label="News Title"
                helperText="Use short titles"
                sx={{ mb: 3 }}
                onChange={(e) => {
                  handleChange('title', e.target.value);
                }}
              />
              <TextField
                value={formData.text}
                fullWidth
                label="News Text"
                onChange={(e) => {
                  handleChange('text', e.target.value);
                }}
                multiline
                rows={2}
                helperText="Use short descriptions (te amo)"
                sx={{ mb: 3 }}
              />

              <Box sx={{ display: 'flex' }}>
                <Switch
                  checked={formData.hasButton}
                  onChange={(e) => {
                    handleChange('hasButton', !formData.hasButton);
                  }}
                />
                <Typography>Has Button ?</Typography>
              </Box>

              {formData.hasButton && (
                <>
                  <TextField
                    fullWidth
                    value={formData.buttonText}
                    label="Button Text"
                    sx={{ mb: 3 }}
                    onChange={(e) => {
                      handleChange('buttonText', e.target.value);
                    }}
                  />
                  <TextField
                    fullWidth
                    value={formData.buttonLink}
                    label="Button Link"
                    sx={{ mb: 3 }}
                    onChange={(e) => {
                      handleChange('buttonLink', e.target.value);
                    }}
                  />
                </>
              )}
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-around'
                }}
              >
                <input type="file" name="image" onChange={handleUpload} />
                {formData.imageThumb && (
                  <img src={formData.imageThumb} alt="upload" />
                )}
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%'
                }}
              >
                <Button
                  onClick={() => {
                    history.push('/manage-news');
                  }}
                >
                  Manage News
                </Button>
                <Button onClick={handleSave}>Upload</Button>
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
    </Page>
  );
};

export default UploadsPage;
