import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import moment from 'moment';
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
    Modal,
    Box,
    FormControl,
    TextField
} from '@mui/material';
import MUIDataTable from "mui-datatables";
import { LoadingButton } from '@mui/lab';
import { BsFillEyeFill, BsFillCheckCircleFill } from "react-icons/bs";
import { FcApproval } from "react-icons/fc";
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';

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
// sections
import { UserListHead, UserListToolbar, UserMoreMenu } from '../user/list';

// ----------------------------------------------------------------------

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    backgroundSize: 'cover',
    background: '#000'
};
// ----------------------------------------------------------------------


export default function SalesApproval() {
    const theme = useTheme();
    const { themeStretch } = useSettings();
    const { enqueueSnackbar } = useSnackbar();
    const ID = localStorage.getItem('UserID')
    useEffect(() => {
        try {
            GetAllSaleMan();
        } catch (error) {
            console.log(error)
        }
    }, [])
    const GetAllSaleMan = async () => {
        const response = await axios.get(`api/data/sellers/${ID}`);
        const { message, salePersons } = response.data;
        setData(salePersons)
        enqueueSnackbar(message);

    }
    const SalePersonID = async (e) => {
        const IDs = e;
        const response = await axios.get(`api/approve/seller/${IDs}/${ID}`);
        const { message } = response.data;
        GetAllSaleMan();
        enqueueSnackbar(message);
    }
    const SalePersonDeactivaID = async (e) => {
        const IDs = e;
        const response = await axios.get(`api/deactive/seller/${IDs}/${ID}`);
        const { message } = response.data;
        // console.log(response.data)
        enqueueSnackbar(message);
        GetAllSaleMan();
    }
    const SalePersonViewID = async (e) => {
        const IDs = e;
        const response = await axios.get(`api/seller/reports/${IDs}`);
        const { message, reports } = response.data;
        // console.log(response.data)
        setData2(reports)
        enqueueSnackbar(message);
        GetAllSaleMan();
    }
    const [open, setOpen] = useState(false);
    const handleOpen = (e) => {
        setOpen(true)
        SalePersonViewID(e)
        setUserID(e)
    }

    const handleClose = () => setOpen(false);
    const columns = [
        {
            name: "id",
            label: "ID",
            options: {
                filter: true,
                sort: true,
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
            name: "email",
            label: "Email",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "phone",
            label: "Phone",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "city",
            label: "City",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "country",
            label: "Country",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "state",
            label: "State",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "is_active",
            label: "Approve",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, row) => {
                    return (
                        <>
                            {row.rowData[7] === 1 ? 'Approve' : 'Deactive'}
                        </>
                    );
                }
            },
        },
        {
            name: "Actions",
            options: {
                customBodyRender: (value, row) => {
                    return (
                        <>
                            {row.rowData[7] === 1 ?
                                <LoadingButton size="small" variant="contained" style={{ margin: '10px' }} onClick={(e) => { SalePersonDeactivaID(row.rowData[0]) }} >
                                    Deactive
                                </LoadingButton>
                                :
                                <LoadingButton size="small" variant="contained" style={{ margin: '10px' }} onClick={(e) => { SalePersonID(row.rowData[0]) }} >
                                    Approve
                                </LoadingButton>}
                            <LoadingButton size="small" variant="contained" onClick={(e) => { handleOpen(row.rowData[0]) }}>
                                {`View`}
                            </LoadingButton>
                        </>
                    );
                }
            }
        }
    ];
    const options = {
        filterType: "dropdown",
        responsive: "scroll",
        selectableRows: false,
    };

    const [data, setData] = useState([]);

    const columns2 = [
        {
            name: "created_at",
            label: "Date",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, row) => {
                    return (
                        <>
                            {moment(value).format('D MMMM YYYY')}
                        </>
                    )
                }
            }
        },
        {
            name: "RawNewAutoQuotes",
            label: "RawNewAutoQuotes",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "RawNewAutoWritten",
            label: "RawNewAutoWritten",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "TotalFireWritten",
            label: "TotalFireWritten",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "LifeApplications",
            label: "LifeApplications",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "AnnualizedLifePremium",
            label: "AnnualizedLifePremium",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "HealthApplications",
            label: "HealthApplications",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "AnnualizedHealthPremium",
            label: "AnnualizedHealthPremium",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "OtherFinancialServices",
            label: "OtherFinancialServices",
            options: {
                filter: true,
                sort: true,
            }
        },  
    ];
    const options2 = {
        filterType: "dropdown",
        responsive: "scroll",
        selectableRows: false,
    };

    const [data2, setData2] = useState([]);
    const [StartDate, setStartDate] = useState('')
    const [EndDate, setEndDate] = useState('')
    const [UserID, setUserID] = useState('')
    const [showData, setShowData] = useState(false)
    const StartDateState = (event) => {
        setStartDate(event.target.value);
    }
    const EndDateState = (event) => {
        setEndDate(event.target.value);
    }
    const FitlerReports = async () => {
        setShowData(false)
        const response = await axios.get(`api/seller/reports/${UserID}?startdate=${StartDate}&enddate=${EndDate}`);
        const { message, reports } = response.data;
        enqueueSnackbar(message);
        setData2(reports)
        // const AHP = reports.map((e) => (e.AnnualizedHealthPremium))
        // const ALP = reports.map((e) => (e.AnnualizedLifePremium))
        // const HP = reports.map((e) => (e.HealthApplications))
        // const LP = reports.map((e) => (e.LifeApplications))
        // const OFS = reports.map((e) => (e.OtherFinancialServices))
        // const RNAQ = reports.map((e) => (e.RawNewAutoQuotes))
        // const RNAW = reports.map((e) => (e.RawNewAutoWritten))
        // const TFW = reports.map((e) => (e.OtherFinancialServices))
        // setAnnualizedHealthPremium(AHP)
        // setAnnualizedLifePremium(ALP)
        // setHealthApplications(HP)
        // setLifeApplications(LP)
        // setOtherFinancialServices(OFS)
        // setRawNewAutoQuotes(RNAQ)
        // setRawNewAutoWritten(RNAW)
        // setTotalFireWritten(TFW)

        setTimeout(() => {
            setShowData(true)
        }, 1000);
    }

    return (
        <Page title="">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <Grid>
                    <HeaderBreadcrumbs
                        heading="Sale Person Approval"
                        links={[
                            { name: 'Dashboard', href: PATH_DASHBOARD.root },
                            { name: 'Sales Person Approval' },
                        ]}
                        action={
                            <Button
                                variant="contained"
                                component={RouterLink}
                                to={PATH_DASHBOARD.general.addNewSale}
                                startIcon={<Iconify icon={'eva:plus-fill'} />}
                            >
                                New Sales Person
                            </Button>
                        }
                    />

                    <Card>
                        {data !== null ?
                            <MUIDataTable
                                title={"Sales Person"}
                                data={data}
                                columns={columns}
                                options={options}
                            /> : 'No Sale Person'}
                    </Card>
                </Grid>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Stack direction="row-reverse" >

                            <Button sx={{ m: 4, width: 20, height: 50 }} variant='outlined' onClick={(e) => { FitlerReports() }}>Search</Button>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                End Date<TextField
                                    type='date'
                                    placeholder="End Date"
                                    onChange={(e) => { EndDateState(e) }}
                                />
                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                Start Date  <TextField
                                    type='date'
                                    placeholder="Start Date"
                                    onChange={(e) => { StartDateState(e) }}
                                />
                            </FormControl>

                        </Stack>
                        {data2 !== null ?
                            <MUIDataTable
                                title={"Sales Person"}
                                data={data2}
                                columns={columns2}
                                options={options2}
                            /> : 'No Sale Person'}

                    </Box>
                </Modal>
            </Container>
        </Page >
    );
}

// ----------------------------------------------------------------------
