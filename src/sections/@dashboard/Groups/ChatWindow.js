import { useEffect, useState, useMemo } from 'react';
import * as Yup from 'yup';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useSnackbar } from 'notistack';

// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { styled } from '@mui/material/styles';
import {
  Box,
  Divider,
  Stack,
  Typography,
  Button,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  IconButton,
  Popover,
  Modal,
  Card,
  Grid
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

// utils
import axios from '../../../utils/axios';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
//
import Scrollbar from '../../../components/Scrollbar';
import ChatRoom from './ChatRoom';
import Iconify from '../../../components/Iconify';
// import ChatMessageList from './ChatMessageList';
// import ChatHeaderDetail from './ChatHeaderDetail';
import ChatMessageInput from './ChatMessageInput';
// import ChatHeaderCompose from './ChatHeaderCompose';
import { FormProvider, RHFSelect, RHFSwitch, RHFTextField, RHFUploadAvatar } from '../../../components/hook-form';


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

export default function ChatWindow() {
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const userID = localStorage.getItem('UserID')
  const [isLoading, setisLoading] = useState(true);
  const [isLoading2, setisLoading2] = useState(true);
  const [memberss, setMembers] = useState([]);
  const [rating, setRating] = useState([]);
  const [GroupData, setGroupData] = useState([]);
  useEffect(() => {
    getGroupsMember()
    getGroupsMemberRating()
  }, [id])

  const getGroupsMember = async () => {
    setisLoading(false)
    const response = await axios.get(`api/groupe/members/${id}`);
    const { members, status } = response.data;
    // console.log(members)
    if (status === 'success') {
      setMembers(members.agents)
      setGroupData(members)
      setisLoading(true)
    } else {
      setisLoading(false)
    }
  }
  const getGroupsMemberRating = async () => {
    setisLoading2(false)
    const response = await axios.get(`api/sellers/rating/groupe/${id}`);
    const { Rating, status } = response.data;
    // console.log(members)
    if (status === 'success') {
      setRating(Rating)
      setisLoading2(true)
    } else {
      setisLoading(false)
    }
  }

  // Menu Mop
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const ids = open ? 'simple-popover' : undefined;
  // Modal For Update 
  const [UpdateModal, setUpdateModal] = useState(false);
  const handleUpdateModalOpen = () => setUpdateModal(true);
  const handleUpdateModalClose = () => setUpdateModal(false);
  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    des: Yup.string().required('Description is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: '',
      des: '',
    }),

  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    watch,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name)
      formData.append("des", data.des)
      const response = await axios.post(`api/update/groupe/${id}`, formData);
      const { message } = response.data;
      enqueueSnackbar(message);
      getGroupsMember()
      getGroupsMemberRating()
      handleUpdateModalClose()
    } catch (error) {
      console.error(error);
    }
  };
  // Delet
  const Delete = async () => {
    try {
      
      const response = await axios.post(`api/delete/groupe/${id}`);
      const { message } = response.data;
      enqueueSnackbar(message);
      getGroupsMember()
      getGroupsMemberRating()
      handleUpdateModalClose()
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Stack sx={{ flexGrow: 1, minWidth: '1px' }}>
      <Box sx={{ py: 2, px: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="center">
          <>
            {/* <ChatAccount /> */}
            <Box sx={{ flexGrow: 1 }} > <Typography variant="h6" sx={{ color: 'text.secondary' }} gutterBottom>{GroupData.name}</Typography></Box>
            <Box sx={{ flexGrow: 1, textAlign: 'right' }} >
              <IconButton aria-describedby={ids} variant="contained" onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
              <Popover
                id={ids}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                // anchorOrigin={{
                //   vertical: 'bottom',
                //   horizontal: 'left',
                // }}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              >
                {/* <Stack direction="row" spacing={2}>
                  <Button  startIcon={<AddIcon />}>
                    Add Members
                  </Button>
                </Stack> */}
                <Stack direction="row" spacing={2}>
                  <Button startIcon={<UpgradeIcon />} onClick={handleUpdateModalOpen}>
                    Update Group
                  </Button>
                </Stack>

                <Stack direction="row" spacing={2} onClick={Delete}>
                  <Button startIcon={<DeleteIcon />}>
                    Delete Group
                  </Button>
                </Stack>

              </Popover>
            </Box>
          </>
        </Stack>
      </Box >
      <Divider />
      <Scrollbar>
        <List
          sx={{
            width: '100%',
            // maxWidth: 360,
            bgcolor: 'background.paper',
            position: 'relative',
            overflow: 'auto',
            maxHeight: 1000,
            '& ul': { padding: 0 },
          }}
          subheader={<li />}
        >
          <li key={`section-1`}>
            <ul>
              <ListItemText primary={`Members`} />

              {!isLoading ?   <ListItem key={`item-${'1'}-${'1'}`}>
                    <ListItemText primary={`No Gourp Member`} />
                  </ListItem> :
                memberss.map((section) => (
                  <ListItem key={`item-${section}-${section.id}`}>
                    <ListItemText primary={` ${section.name}`} />
                  </ListItem>
                ))}
            </ul>
          </li>
          <li key={`section-1`}>
            <ul>
              <ListItemText primary={`RaTing`} />

              {!isLoading ?   <ListItem key={`item-${'1'}-${'1'}`}>
                    <ListItemText primary={`No Gourp Member`} />
                  </ListItem> :
                rating.map((section) => (
                  <ListItem key={`item-${section}-${section.id}`}>
                    <ListItemText secondary={`Agent: ${section.AgentName}`} />
                    <ListItemText secondary={`Sales Person: ${section.SalePersonName}`} />
                    <ListItemText secondary={`State: ${section.SalePersonState}`} />
                    <ListItemText secondary={`TotalSale: ${section.TotalSale}`} />
                  
                  </ListItem>
                ))}
            </ul>
          </li>
        </List>

      </Scrollbar>
      <Modal
        open={UpdateModal}
        onClose={handleUpdateModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Card sx={{ p: 3 }}>
                  <Box
                    sx={{
                      display: 'grid',
                      columnGap: 2,
                      rowGap: 3,
                      gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                    }}
                  >
                    <RHFTextField name="name" label="Name" />
                    <RHFTextField name="des" label="Decsription" />
                  </Box>

                  <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                    <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                      Update Group
                    </LoadingButton>
                  </Stack>
                </Card>
              </Grid>
            </Grid>
          </FormProvider>
        </Box>
      </Modal>
    </Stack >

  );
}
