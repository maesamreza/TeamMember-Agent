import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useSnackbar } from 'notistack';
// @mui
import { Card, Container, Button, Box, Modal, Typography } from '@mui/material';
import MUIDataTable from "mui-datatables";

// redux
import { useDispatch } from '../../redux/store';
import { getConversations, getContacts } from '../../redux/slices/chat';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// import useAuth from '../../hooks/useAuth'
// components
import axios from '../../utils/axios';
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import ChatSidebar from '../../sections/@dashboard/Groups/ChatSide';
import ChatWindow from '../../sections/@dashboard/Groups/ChatWindow';
import AddNewGroup from '../../sections/@dashboard/Groups/AddNewGroup';
import Iconify from '../../components/Iconify';
import LoadingScreen from '../../components/LoadingScreen';
// ----------------------------------------------------------------------
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const style2 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  background: 'rbga(0,0,0,1)',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function GroupReq() {
  const { themeStretch } = useSettings();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  // const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => {
    GetAllGroups()
    setOpen2(true)
  };
  const handleClose2 = () => setOpen2(false);
  const [showData, setShowData] = useState(false)

  const ID = localStorage.getItem('UserID')
  useEffect(() => {
    try {
      GetAllGroups();

    } catch (error) {
      console.log(error)
    }
  }, [])
  const GetAllGroups = async () => {
    setShowData(false)
    const response = await axios.get(`api/all/request/groupe`);
    const { message, requests } = response.data;
    setData(requests)
    enqueueSnackbar(message);
    setTimeout(() => {
      setShowData(true)
    }, 100);
  }

  const JoinGroup = async (value) => {
    setShowData(false)
    const response = await axios.get(`api/join/groupe/${value}`);
    const { message, groupes } = response.data;
    setData(groupes)
    enqueueSnackbar(message);
    handleClose2()
  }
  const ReqGroup = async (value) => {
    setShowData(false)
     console.log(value)
    const GID = value[0]
    const AID= value[2] 
    const response = await axios.get(`api/join/private/groupe/${value[2]}/${value[0]}`);
    const { message, requests } = response.data;
    GetAllGroups()
    enqueueSnackbar(message);
    handleClose2()
  }
  const ReJGroup = async (value) => {
    setShowData(false)
     console.log(value)
    const GID = value[0]
    const AID= value[2] 
    const response = await axios.get(`api/remove/request/${value[2]}/${value[0]}`);
    const { message, requests } = response.data;
    GetAllGroups()
    enqueueSnackbar(message);
    handleClose2()
  }
  const columns = [
    {
      name: "agent_id",
      label: "#",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "agent_name",
      label: "Agent Name",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "agents_groupe_id",
      label: "Group#",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "group_name",
      label: "GroupName#",
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
          console.log(row)
          return (
            <>
              <Button
                variant="contained"
                startIcon={<Iconify icon={'eva:plus-fill'} />}
                onClick={(e) => { ReqGroup(row.rowData) }}
              >
                Accept
              </Button>
              <Button
                variant="contained"
                startIcon={<Iconify icon={'eva:plus-fill'} />}
                onClick={(e) => { ReJGroup(row.rowData) }}
              >
                Reject
              </Button>

            </>
          );
        }
      }
    },


  ];
  const options = {
    filterType: "dropdown",
    responsive: "scroll",
    selectableRows: false
  };
  const [data, setData] = useState([]);


  return (
    <Page title="Groups">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Groups Request"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Groups Request' }]}
        />
        <Card>
          {showData ?
            <MUIDataTable
              title={"Groups Request"}
              data={data}
              columns={columns}
              options={options}
            /> : <LoadingScreen />}

        </Card>
      </Container>
    </Page>
  );
}
