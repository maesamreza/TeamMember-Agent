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
// sections
import { UserListHead, UserListToolbar, UserMoreMenu } from '../user/list';
import LoadingScreen from '../../../components/LoadingScreen';

// ----------------------------------------------------------------------


// ----------------------------------------------------------------------


export default function UseLicenseTab() {
    const theme = useTheme();
    const { themeStretch } = useSettings();
    const { enqueueSnackbar } = useSnackbar();
    const ID = localStorage.getItem('UserID')
    const [showData, setShowData] = useState(false)

    useEffect(() => {
        try {

            GetAllUseLicnese();
        } catch (error) {
            console.log(error)
        }
    }, [])

    const GetAllUseLicnese = async () => {
        const response = await axios.post(`api/license/used/${ID}`);
        const { message, License } = response.data;
        setData2(License)
        enqueueSnackbar(message);

        setTimeout(() => {
           
            setShowData(true)
        }, 100);
    }


    const columns2 = [
        {
            name: "",
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
            name: "licenseNo",
            label: "LicenseNo",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "licenseCost",
            label: "LicenseCost",
            options: {
                filter: true,
                sort: true,
            }
        },
        // {
        //     name: "usableFor",
        //     label: "UsableFor",
        //     options: {
        //         filter: true,
        //         sort: true,
        //     }
        // },
        // {
        //     name: "usedFor",
        //     label: "UsedFor",
        //     options: {
        //         filter: true,
        //         sort: true,
        //     }
        // },

    ];
    const options2 = {
        filterType: "dropdown",
        responsive: "scroll",
        selectableRows: true
    };

    const [data2, setData2] = useState([]);


    return (

        <Grid item xs={12} md={12}>

            <Card>
                {showData ? 
                    <MUIDataTable
                        title={"Used License"}
                        data={data2}
                        columns={columns2}
                        options={options2}
                    /> : <LoadingScreen />}
            </Card>
        </Grid>

    );
}


// ----------------------------------------------------------------------
