import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { loadStripe } from '@stripe/stripe-js';
import {
    CardElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
// @mui
import {
    Container,
    Button,
    Box,
    Modal,
    Typography,
    TextField, Grid, Card
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// utils
import axios from '../../utils/axios';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import SalesPacakge from '../../sections/@dashboard/License/SalesPacakge';
import Iconify from '../../components/Iconify';
import LoadingScreen from '../../components/LoadingScreen';
import StriImg from '../../assets/image/Stripe_logo.png'

// ----------------------------------------------------------------------
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    background: ` linear-gradient(to bottom, rgba(255, 255, 255, 0.52), rgba(255, 255, 255, 0.73)),url(${StriImg})`,
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    backgroundSize: 'cover'
};
const style2 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 500,
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    background: '#000',
    backgroundSize: 'cover',
};


export default function BuyOackge() {
    const { themeStretch } = useSettings();
    const { enqueueSnackbar } = useSnackbar();
    const [StripeKey, setStripeKey] = useState('');
    const [showData, setShowData] = useState(false)
    useEffect(() => {
        try {
            SripeInfo();
        } catch (error) {
            console.log(error)
        }
    }, [])
    const SripeInfo = async () => {
        try {
            const response = await axios.get(`api/stripe/info`);
            const { prices, testKey } = response.data.data;
            setStripeKey(testKey);
        } catch (error) {
            console.error(error);
        }
    };
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);
    const BuyPack = async (paymentMethod) => {
            try {
            const formData = new FormData();
            formData.append("paymentMethod", paymentMethod.id)
            formData.append("usableFor", NLic)
            const response = await axios.post(`api/pay/custom/license/create`, formData);
            const { message } = response.data;
            handleClose()
            handleClose2()
            setShowData(false)
            enqueueSnackbar(message)
        } catch (error) {
            console.error(error);
        }
    };
    const CheckoutForm = () => {
        const stripe = useStripe();
        const elements = useElements();

        const handleSubmit = async (event) => {
            event.preventDefault();
            
            if (elements == null) {
                return;
            }
            
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement),
            });
            setShowData(true)
            BuyPack(paymentMethod);

        };


        return (
            <form onSubmit={handleSubmit}>
                <Box>
                    <Typography variant="h4" sx={{ mb: 5 }}>
                        Card details
                    </Typography>
                    <CardElement />

                    <LoadingButton fullWidth size="small" sx={{ mt: 5 }} variant="contained" type="submit" disabled={!stripe || !elements}>
                        Pay
                    </LoadingButton>
                </Box>

            </form>
        );
    };
    const stripePromise = loadStripe(StripeKey);
    const [PriceC, setPriceC] = useState(0)
    const [NLic, setNLic] = useState(0)
    const [cup, setCup] = useState(false)
    useEffect(() => {
        PriceCal()
    }, [NLic])
    const PriceCal = () => {
        const Val = 59 * NLic
        setPriceC(Val)
    }
    return (
        <Page >
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading="Buy License"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Packages', href: PATH_DASHBOARD.root },
                    ]}
                    action={
                        <Button
                            variant="contained"
                            startIcon={<Iconify icon={'eva:plus-fill'} />}
                            onClick={handleOpen2}
                        >
                            Customize your own Packages
                        </Button>
                    }
                />

                <SalesPacakge />
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        {!showData ?
                            <Elements stripe={stripePromise}>
                                <CheckoutForm />
                            </Elements>
                            : <LoadingScreen />}

                    </Box>
                </Modal>
                <Modal
                    open={open2}
                    onClose={handleClose2}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >

                    <Grid item xs={12} md={8} sx={style2}>
                        <Card sx={{ p: 3 }}>
                            <Box
                                sx={{
                                    display: 'grid',
                                    columnGap: 2,
                                    rowGap: 3,
                                    gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                                }}
                            >
                                {/* {showData ? */}
                                <TextField label="Total Amount" value={PriceC} variant="outlined" disabled />
                                <TextField label="Number of License" variant="outlined" onChange={(e) => { setNLic(e.target.value) }} />
                                {/* <LoadingButton  variant="outlined"  onClick={()=>setCup(!cup)}>Coupon</LoadingButton>
                                {
                                    !cup ? null :
                                        <TextField label="Enter Coupon" variant="outlined" onChange={(e) => { setNLic(e.target.value) }} />
                                } */}

                                {/* : <LoadingScreen />} */}
                            </Box>
                            <LoadingButton sx={{ mt: 1 }} variant="contained" onClick={handleOpen} >
                                Create Package
                            </LoadingButton>
                        </Card>
                    </Grid>
                </Modal>
            </Container>
        </Page>
    );
}
