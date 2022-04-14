import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// hooks
import useSettings from '../../hooks/useSettings';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';

// components
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Page from '../../components/Page';
// sections
import LicenseTab from '../../sections/@dashboard/License/Table';
import Tab from '../../sections/@dashboard/License/UsedTable';
// ----------------------------------------------------------------------

export default function AddNewSale() {
  const theme = useTheme();
  const { themeStretch } = useSettings();
  const [showResults, setShowResults] = useState(true)

  return (
    <Page>
      <Container maxWidth={themeStretch ? false : 'xl'}>

        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <HeaderBreadcrumbs
              heading="License"
              links={[
                { name: 'Dashboard', href: PATH_DASHBOARD.root },
                { name: 'License' },
              ]}
            // action={
            //     <Button
            //         variant="contained"
            //         component={RouterLink}
            //         to={PATH_DASHBOARD.general.addNewSale}
            //         startIcon={<Iconify icon={'eva:plus-fill'} />}
            //     >
            //         New SalePerson
            //     </Button>
            // }
            />
            <Grid item xs={12} md={12} lg={12} sx={{
              textAlign: 'right'
            }}>
              <LoadingButton variant="contained" sx={{ m: 3 }} onClick={()=>{setShowResults(true)}}>
                Useable License
              </LoadingButton>

              <LoadingButton variant="contained" onClick={()=>{setShowResults(false)}}>
                Used License
              </LoadingButton>
            </Grid>
            { showResults ?  <LicenseTab /> : <Tab /> }
           
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
