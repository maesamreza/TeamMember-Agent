// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Stack } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sections
import {
  AppWidget,
  AppWelcome,
  AppFeatured,
  AppNewInvoice,
  AppTopAuthors,
  AppTopRelated,
  AppAreaInstalled,
  AppWidgetSummary,
  AppCurrentDownload,
  AppTopInstalledCountries,
} from '../../sections/@dashboard/general/app';
import {
  EcommerceWelcome,
  EcommerceNewProducts,
  EcommerceYearlySales,
  EcommerceBestSalesman,
  EcommerceSaleByGender,
  EcommerceWidgetSummary,
  EcommerceSalesOverview,
  EcommerceLatestProducts,
  EcommerceCurrentBalance,
} from '../../sections/@dashboard/general/e-commerce';

// ----------------------------------------------------------------------

export default function GeneralApp() {
  const { user } = useAuth();
  const theme = useTheme();
  const { themeStretch } = useSettings();

  return (
    <Page>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
      
          <Grid item xs={12} md={4}>
            <EcommerceWidgetSummary
              title="Raw New Auto Quotes"
              // percent={2.6}
              total={765}
              chartColor={theme.palette.primary.main}
              chartData={[0,765]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <EcommerceWidgetSummary
              title="Raw New Auto Written"
              // percent={-0.1}
              total={18765}
              chartColor={theme.palette.chart.main}
              chartData={[56, 47]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <EcommerceWidgetSummary
              title="Total Fire Written"
              // percent={0.6}
              total={4876}
              chartColor={theme.palette.chart.main}
              chartData={[40, 70]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <EcommerceWidgetSummary
              title="Life Applications"
              // percent={2.6}
              total={765}
              chartColor={theme.palette.primary.main}
              chartData={[22, 8]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <EcommerceWidgetSummary
              title="AnnualizedLifePremium"
              // percent={2.6}
              total={765}
              chartColor={theme.palette.primary.main}
              chartData={[22, 8]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <EcommerceWidgetSummary
              title="Health Applications"
              // percent={2.6}
              total={765}
              chartColor={theme.palette.primary.main}
              chartData={[22, 8]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <EcommerceWidgetSummary
              title="Annualized ealth Premium"
              // percent={2.6}
              total={765}
              chartColor={theme.palette.primary.main}
              chartData={[22, 8]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <EcommerceWidgetSummary
              title="Other Financial Services"
              // percent={2.6}
              total={765}
              chartColor={theme.palette.primary.main}
              chartData={[22, 8]}
            />
          </Grid>

        </Grid>
      </Container>
    </Page>
  );
}
