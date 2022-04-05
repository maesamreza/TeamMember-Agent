import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import $ from 'jquery';
import { loadStripe } from '@stripe/stripe-js';
import {
    CardElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
// @mui
import { useTheme } from '@mui/material/styles';
import {
    Card,
    Grid,
    Table,
    Avatar,
    Button,
    Checkbox,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
    TableContainer,
    TablePagination,
    Stack,
    Box,
    Modal
} from '@mui/material';
import MUIDataTable from "mui-datatables";
import { LoadingButton } from '@mui/lab';
import { BsFillEyeFill, BsFillCheckCircleFill } from "react-icons/bs";
import { FcApproval } from "react-icons/fc";

// hooks
import useSettings from '../../../hooks/useSettings';
import useAuth from '../../../hooks/useAuth';
// utils
import axios from '../../../utils/axios';
// _mock_
import { _userList } from '../../../_mock';
// components
import Page from '../../../components/Page';
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import SearchNotFound from '../../../components/SearchNotFound';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import LoadingScreen from '../../../components/LoadingScreen';
import StriImg from '../../../assets/image/Stripe_logo.png'
// sections
import { UserListHead, UserListToolbar, UserMoreMenu } from '../user/list';

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

// ----------------------------------------------------------------------


export default function SalesPacakges() {
    const theme = useTheme();
    const { themeStretch } = useSettings();
    const { enqueueSnackbar } = useSnackbar();
    const [showData, setShowData] = useState(false)

    const ID = localStorage.getItem('UserID')
    useEffect(() => {
        try {
            GetAllLicences();
            SripeInfo();
        } catch (error) {
            console.log(error)
        }
    }, [])
    const GetAllLicences = async () => {
        setShowData(false)
        const response = await axios.get(`api/agent/license/all/package`);
        const { message, packages } = response.data;
        setData(packages)
        enqueueSnackbar(message);

        setTimeout(() => {

            setShowData(true)
        }, 100);
    }

    const [StripeKey, setStripeKey] = useState('');
    const [PackageID, setPackageID] = useState('');
    const [PaymentID, setPaymentID] = useState('');
    const [Price, setPrice] = useState('');
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
    const handleOpen = (value) => {
        setOpen(true)
        setPackageID(value[0])
        setPrice(value[3])
    };
    const handleClose = () => setOpen(false);
    const BuyPack = async (paymentMethod) => {
        try {
            const formData = new FormData();
            formData.append("paymentMethod", paymentMethod.id)
            // formData.append("price", Price)
            const response = await axios.post(`api/pay/license/create/${PackageID}`, formData);
            const { message } = response.data;
            handleClose()
            setShowData(true)
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
            setPaymentID(paymentMethod.id)
            setShowData(false)
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

    const columns = [
        {
            name: "id",
            label: "ID",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, row) => {
                    return (
                        <>
                            {row.rowIndex + 1}
                        </>
                    );
                }
            }
        },
        {
            name: "name",
            label: "Name",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "des",
            label: "Description",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "price",
            label: "Price",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "usableFor",
            label: "UsableFor",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "id",
            label: "Action",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, row) => {
                    return (
                        <>
                            <LoadingButton size="small" variant="contained" onClick={(e) => { handleOpen(row.rowData) }} >
                                Buy
                            </LoadingButton>
                        </>
                    )
                }
            }
        },
    ];
    const options = {
        filterType: "dropdown",
        responsive: "scroll",
        selectableRows: false,
        viewColumns: false,
        filter: false,
        sort: false,
        print: false,
        download: false
    };

    const [data, setData] = useState([]);



    return (

        <Grid item xs={12} md={12}>

            <Card>
                {showData ?
                    <MUIDataTable
                        title={"Buy License"}
                        data={data}
                        columns={columns}
                        options={options}
                    /> : <LoadingScreen />}
            </Card>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {showData ?
                        <Elements stripe={stripePromise}>
                            <CheckoutForm />
                        </Elements> : <LoadingScreen />}
                 
                </Box>
            </Modal>
        </Grid>


    );
}


// ----------------------------------------------------------------------
