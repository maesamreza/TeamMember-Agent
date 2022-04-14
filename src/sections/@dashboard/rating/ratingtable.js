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
    TextField,
    Modal,
    InputAdornment,
    InputLabel,
    MenuItem,
    FormControl,
    Select,

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
import InputStyle from '../../../components/InputStyle';

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
    const [Filter, setFilter] = useState('')
    const [Search, setSearch] = useState('')
    const ID = localStorage.getItem('UserID')
    useEffect(() => {
        try {
            GetAllRating();

        } catch (error) {
            console.log(error)
        }
    }, [])
    const GetAllRating = async () => {
        setShowData(false)
        const response = await axios.get(`api/all/sellers/rating`);
        const { message, Rating } = response.data;
        setData(Rating)
        enqueueSnackbar(message);

        setTimeout(() => {
            setShowData(true)
        }, 1000);
    }
    const FilterState = (event) => {
        setFilter(event.target.value);
    }
    const SearchState = (event) => {
        setSearch(event.target.value);
    }
    const FitlerRating = async () => {
        setShowData(false)
        const response = await axios.get(`api/all/sellers/rating?sort=${Filter}&search=${Search}`);
        const { message, Rating } = response.data;
        setData(Rating)
        enqueueSnackbar(message);

        setTimeout(() => {
            setShowData(true)
        }, 1000);
    }


    const columns = [
        {
            name: "SalePersonId",
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
            name: "SalePersonName",
            label: "Name",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "SalePersonEmail",
            label: "Email",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "SalePersonState",
            label: "State",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "AgentName",
            label: "Agent Name",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "AgentEmail",
            label: "Agent Email",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "TotalSale",
            label: "Total Sale",
            options: {
                filter: true,
                sort: true,
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
        download: false,
        search:false
    };

    const [data, setData] = useState([]);



    return (

        <Grid item xs={12} md={12}>

            <Card>
                <Stack direction="row-reverse" >

                    <Button sx={{ m: 1, width: 20, height: 50 }} variant='outlined' onClick={(e)=>{FitlerRating()}}>Search</Button>

                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <TextField

                            placeholder="State"
                            onChange={(e)=>{SearchState(e)}}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Iconify icon={'eva:search-fill'} sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }} />
                                    </InputAdornment>
                                ),
                            }}

                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={Filter}
                            label="Filter"
                            onChange={FilterState}
                        >
                            <MenuItem value={''}>Filter</MenuItem>
                            <MenuItem value={'name'}>Name</MenuItem>
                            <MenuItem value={'email'}>Email</MenuItem>
                            <MenuItem value={'city'}>City</MenuItem>
                            <MenuItem value={'country'}>Country</MenuItem>
                            <MenuItem value={'phone'}>Phone</MenuItem>
                            <MenuItem value={'state'}>State</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>

                {showData ?
                    <MUIDataTable
                        title={"Rating"}
                        data={data}
                        columns={columns}
                        options={options}
                    /> : <LoadingScreen />}
            </Card>
        </Grid>


    );
}


// ----------------------------------------------------------------------
