// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sections
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
import AddNewSales from '../../sections/@dashboard/agentApproval/NewSaleForm';
// ----------------------------------------------------------------------

export default function AddNewSale() {
  const theme = useTheme();
  const { themeStretch } = useSettings();

  return (
    <Page title="Agent: New Agent">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <AddNewSales />
            </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
