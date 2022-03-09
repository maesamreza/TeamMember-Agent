import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
    Stack,
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


export default function SalesApproval() {
    const theme = useTheme();
    const { themeStretch } = useSettings();
    const { enqueueSnackbar } = useSnackbar();
    const { getallsaleman, salespersons } = useAuth();
    const ID = localStorage.getItem('AgentViewID')
    useEffect(() => {
        try {
            getallsaleman(ID);
            setData(salespersons)
        } catch (error) {
            console.log(error)
        }
    }, [])

    const SalePersonID = async (e) => {
        const IDs = e;
        const response = await axios.get(`api/approve/seller/${ID}/${IDs}`);
        const { message } = response.data;
        setData(salespersons)
        enqueueSnackbar(message);
    }
    const SalePersonDeactivaID = async (e) => {
        const ID = e;
        const response = await axios.get(`api/deactive/agent/${ID}`);
        const { message } = response.data;
        // console.log(response.data)
        enqueueSnackbar(message);
        setData(salespersons)
        getallsaleman(ID);
    }
    const columns = [{
        name: "name",
        label: "Name",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Actions",
        options: {
            customBodyRender: (row) => {
                return (
                    <>
                        <Button size="small" variant="contained" style={{ margin: '10px' }} onClick={(e) => { SalePersonID(row.rowData[0]) }}>
                            Apporve
                        </Button>
                    </>
                );
            }
        }
    }
    ];
    const options = {
        filterType: "dropdown",
        responsive: "scroll",
        selectableRows: true
    };

    const [data, setData] = useState([]);


    return (
        <Page title="SalePerson">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <Grid>
                    <Card>
                        {data !== null ?
                            <MUIDataTable
                                title={"SalesPerson"}
                                data={data}
                                columns={columns}
                                options={options}
                            /> : 'No SalePerson'}
                    </Card>
                </Grid>
            </Container>
        </Page >
    );
}

// ----------------------------------------------------------------------
