import React from 'react';
import { Link as ScrollLink } from 'react-scroll';
// material
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { LoadingButton } from '@material-ui/lab';
import {
  Link,
  Container,
  Typography,
  TextField,
  Grid
} from '@material-ui/core';
//
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';

import Logo from '../Logo';

// ----------------------------------------------------------------------

export default function LandingFooter() {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const ContactSchema = Yup.object().shape({
    message: Yup.string().min(19, 'Too Short!').required('Message required'),
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required')
  });

  const formik = useFormik({
    initialValues: {
      message: '',
      email: ''
    },
    validationSchema: ContactSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      try {
        console.log(values);
        // SAVE MESSAGE
        enqueueSnackbar('Thanks for your time!', {
          variant: 'success'
        });
        resetForm();
      } catch (error) {
        enqueueSnackbar(error.message, { variant: 'error' });

        setErrors({ afterSubmit: error.code || error.message });
        setSubmitting(false);
      }
    }
  });
  const {
    errors,
    touched,
    handleSubmit,
    isSubmitting,
    getFieldProps,
    isValid
  } = formik;

  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center', py: 5 }}>
      <ScrollLink spy smooth>
        <Logo sx={{ mb: 1, mx: 'auto' }} />
      </ScrollLink>
      <Grid item xs={12}>
        <Typography
          textAlign="start"
          gutterBottom
          sx={{ color: 'text.secondary' }}
        >
          Propose us a custom DOBER just as you would looove one
        </Typography>
      </Grid>
      <FormikProvider value={formik}>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="E-mail"
                {...getFieldProps('email')}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tell us about your custom DOBER"
                multiline
                rows={3}
                {...getFieldProps('message')}
                error={Boolean(touched.message && errors.message)}
                helperText={
                  (touched.message && errors.message) ||
                  'Specify about what type accessories and details you would love!'
                }
              />
            </Grid>
            <Grid item xs={12}>
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                pending={isSubmitting}
              >
                Submit
              </LoadingButton>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
      <Typography variant="caption">
        © All rights reserved
        <br />{' '}
        <div
          onDoubleClick={() => {
            history.push('/upload');
          }}
        >
          Made
        </div>{' '}
        by &nbsp;
        <Link component={RouterLink} to="/auth/login">
          TheDobermenClub 2022
        </Link>
      </Typography>
    </Container>
  );
}
