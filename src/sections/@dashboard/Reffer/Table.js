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

// sections
import { UserListHead, UserListToolbar, UserMoreMenu } from '../user/list';

// ----------------------------------------------------------------------


// ----------------------------------------------------------------------


export default function RegisterTab() {
    const theme = useTheme();
    const { themeStretch } = useSettings();
    const { enqueueSnackbar } = useSnackbar();
    const [showData, setShowData] = useState(false)

    const ID = localStorage.getItem('UserID')
    useEffect(() => {
        try {
            GetAllUsableLicnese();

        } catch (error) {
            console.log(error)
        }
    }, [])
    const GetAllUsableLicnese = async () => {
        setShowData(false)
        const response = await axios.get(`api/refer/accepted/${ID}`);
        const { message, proceed } = response.data;
        setData(proceed)
        enqueueSnackbar(message);

       setTimeout(() => {
           
           setShowData(true)
       }, 100);
    }


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
            name: "email",
            label: "Email",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "join_date",
            label: "Join Date",
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
    };

    const [data, setData] = useState([]);



    return (

        <Grid item xs={12} md={12}>

            <Card>
                {showData ?
                    <MUIDataTable
                        title={"Accepted Refer"}
                        data={data}
                        columns={columns}
                        options={options}
                    /> : <LoadingScreen />}
            </Card>
        </Grid>


    );
}


// ----------------------------------------------------------------------
