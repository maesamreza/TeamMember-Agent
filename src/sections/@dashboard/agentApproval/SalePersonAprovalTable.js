import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useSnackbar } from 'notistack';
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
    Stack
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


// ----------------------------------------------------------------------


export default function SalesPersonApproval() {

    const theme = useTheme();
    const navigate = useNavigate();
    const { themeStretch } = useSettings();
    const { enqueueSnackbar } = useSnackbar();
    const { getallsaleman, salePersons } = useAuth();
    const userID = localStorage.getItem('UserID')

    useEffect(() => {
        // getallsaleman(userID);
        // try {
        //     getallsaleman(userID);
        //     // setData(salePersons)
        // } catch (error) {
        //     console.log(error)
        // }

    }, [])
    const SaleID = async (e) => {
        const ID = e;
        const response = await axios.get(`api/approve/seller/${ID}/${userID}`);
        const { message } = response.data;
        // setData(salePersons)
        enqueueSnackbar(message);
    }
    const SaleDeactivaID = async (e) => {
        const ID = e;
        const response = await axios.get(`api/deactive/seller/${ID}/${userID}`);
        const { message } = response.data;
        // console.log(response.data)
        enqueueSnackbar(message);
        // setData(salePersons)
    }
    // const AgentViewID = async (ID) => {
    //     localStorage.setItem('AgentViewID', ID)
    //     try {
    //         await getagentdetail(ID);
    //         navigate(PATH_DASHBOARD.general.saleApproval);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }
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
                                <LoadingButton size="small" variant="contained" style={{ margin: '10px' }} onClick={(e) => { SaleDeactivaID(row.rowData[0]) }} >
                                    Deactive
                                </LoadingButton>
                                :
                                <LoadingButton size="small" variant="contained" style={{ margin: '10px' }} onClick={(e) => { SaleID(row.rowData[0]) }} >
                                    Apporve
                                </LoadingButton>}
                            {/* <LoadingButton size="small" variant="contained" onClick={(e) => { AgentViewID(row.rowData[0]) }}  >
                                {`View`}
                            </LoadingButton> */}
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

    // const [data, setData] = useState([]);
    const data = salePersons;
    return (
        <Page title="">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <Grid>

                    <Card>
                        {data !== null ?
                            <MUIDataTable
                                title={"Sale Persons"}
                                data={data}
                                columns={columns}
                                options={options}
                            /> : 'Refresh'
                        }
                    </Card>
                </Grid>
            </Container>
        </Page >
    );
}

// ----------------------------------------------------------------------
