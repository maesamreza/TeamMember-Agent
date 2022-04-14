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
    Box
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
                            {row.rowData[7] === 1 ? 'Aprrove' : 'Deactive'}
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
            name: "AnnualizedHealthPremium",
            label: "Annualized Health Premium",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "AnnualizedLifePremium",
            label: "Annualized Life Premium",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "HealthApplications",
            label: "Health Applications",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "LifeApplications",
            label: "Life Applications",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "OtherFinancialServices",
            label: "Other Financial Services",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "RawNewAutoQuotes",
            label: "Raw New Auto Quotes",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "RawNewAutoWritten",
            label: "Raw New Auto Written",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "TotalFireWritten",
            label: "Total Fire Written",
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
