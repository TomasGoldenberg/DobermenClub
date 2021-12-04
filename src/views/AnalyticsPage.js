// material
import { Box, Grid, Container, Typography } from '@material-ui/core';
// components
import Page from '../components/Page';
import AnalyticsExternalLinks from '../components/analytics/AnalyticsExternalLinks';
import AnalyticsUsers from '../components/analytics/AnalyticsUsers';
import AnalyticsBuyAttempts from '../components/analytics/AnalyticsBuyAttempts';
import AnalyticsNewsUpdate from '../components/analytics/AnalyticsNewsUpdate';
import AnalyticsHomePage from '../components/analytics/AnalyticsHomePage';
import AnalyticsOrderTimeline from '../components/analytics/AnalyticsOrderTImeline';
import AnalyticsVisitsByCountry from '../components/analytics/AnalyticsVisitsByCountry';
import AnalyticsWebsiteVisits from '../components/analytics/AnalyticsWebsiteVisits';
import AnalyticsTrafficBySite from '../components/analytics/AnalyticsTrafficBySite';
import AnalyticsCurrentSubject from '../components/analytics/AnalyticsCurrentSubject';
import AnalyticsConversionRates from '../components/analytics/AnalyticsConversionRates';

// ----------------------------------------------------------------------

export default function GeneralAnalytics() {
  return (
    <Page title="General: Analytics | Minimal-UI">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsHomePage />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsExternalLinks />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsBuyAttempts />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsUsers />
          </Grid>

          <Grid item xs={12}>
            <AnalyticsVisitsByCountry />
          </Grid>

          <Grid item xs={12} md={6} lg={12}>
            <AnalyticsWebsiteVisits />
          </Grid>
          {/* 
          <Grid item xs={12} md={6} lg={8}>
            <AnalyticsConversionRates />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsCurrentSubject />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AnalyticsNewsUpdate />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsOrderTimeline />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsTrafficBySite />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
