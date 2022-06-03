import { useState } from 'react';
import { useSnackbar } from 'notistack';
// @mui
import { useTheme } from '@mui/material/styles';
import { Button, Card, Container, Grid, Modal, Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/system';

// hooks
import useSettings from '../../hooks/useSettings';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';

// components
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Page from '../../components/Page';
// sections
import LicenseTab from '../../sections/@dashboard/Reffer/Table';
import Tab from '../../sections/@dashboard/Reffer/UsedTable';
import Iconify from '../../components/Iconify';
import axiosInstance from '../../utils/axios';
// ----------------------------------------------------------------------
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  backgroundSize: 'cover'
};
export default function AddNewSale() {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const { themeStretch } = useSettings();
  const [showResults, setShowResults] = useState(true)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [NLic, setNLic] = useState("")
  const BuyPack = async () => {
    try {
      const formData = new FormData();
      formData.append("email",NLic)
      const response = await axiosInstance.post(`api/refer/agent`, formData);
      const { message } = response.data;
      handleClose()
      enqueueSnackbar(message)
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Page>
      <Container maxWidth={themeStretch ? false : 'xl'}>

        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <HeaderBreadcrumbs
              heading="Refer"
              links={[
                { name: 'Dashboard', href: PATH_DASHBOARD.root },
                { name: 'Refer' },
              ]}
              action={
                <Button
                  variant="contained"
                  startIcon={<Iconify icon={'eva:plus-fill'} />}
                  onClick={handleOpen}
                >
                  Send Mail
                </Button>
              }
            />
            <Grid item xs={12} md={12} lg={12} sx={{
              textAlign: 'right'
            }}>
              <LoadingButton variant="contained" sx={{ m: 3 }} onClick={() => { setShowResults(true) }}>
               Registered
              </LoadingButton>

              <LoadingButton variant="contained" onClick={() => { setShowResults(false) }}>
                Pending
              </LoadingButton>
            </Grid>
            {showResults ? <LicenseTab /> : <Tab />}

          </Grid>
        </Grid>
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Grid item xs={12} md={8} sx={style}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
              }}
            >
              {/* {showData ? */}
              <TextField label="Email" value={NLic}  onChange={(e) => { setNLic(e.target.value) }} variant="outlined" />
            </Box>
            <LoadingButton sx={{ mt: 3 }} variant="contained" onClick={(e)=>{BuyPack()}} >
              Send
            </LoadingButton>
          </Card>
        </Grid>
      </Modal>
    </Page>
  );
}
