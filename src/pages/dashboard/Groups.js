import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useSnackbar } from 'notistack';
// @mui
import { Card, Container, Button, Box, Modal } from '@mui/material';
import MUIDataTable from "mui-datatables";

// redux
import { useDispatch } from '../../redux/store';
import { getConversations, getContacts } from '../../redux/slices/chat';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
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

export default function Group() {
  const { themeStretch } = useSettings();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
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
    const response = await axios.get(`api/all/groupe`);
    const { message, groupes } = response.data;
    setData(groupes)
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
  const columns = [
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
      name: "id",
      label: "Action",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, row) => {
          // console.log(va)
          return (
            <>
              <Button
                variant="contained"
                startIcon={<Iconify icon={'eva:plus-fill'} />}
                onClick={(e) => { JoinGroup(value) }}
              >
                Join Groups
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
    <Page title="Chat">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Chat"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Chat' }]}
          action={<>
            <Button
              variant="contained"
              startIcon={<Iconify icon={'eva:plus-fill'} />}
              onClick={handleOpen}
            >
              Create New Group
            </Button>
            <Button
              variant="contained"
              startIcon={<Iconify icon={'eva:plus-fill'} />}
              onClick={handleOpen2}
              sx={{ ml: 2 }}
            >
              Join New Group
            </Button>
          </>
          }
        />
        <Card sx={{ height: '72vh', display: 'flex' }}>
          <ChatSidebar />
          {id ? <ChatWindow /> : null}

        </Card>
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddNewGroup func={handleClose} />
        </Box>
      </Modal>
      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          {showData ?
            <MUIDataTable
              title={"Groups"}
              data={data}
              columns={columns}
              options={options}
            /> : <LoadingScreen />}
        </Box>
      </Modal>
    </Page>
  );
}
