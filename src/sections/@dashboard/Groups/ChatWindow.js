import { useEffect, useState, useMemo } from 'react';
import * as Yup from 'yup';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import MUIDataTable from "mui-datatables";
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
  Grid,
  TextField,
  FormControl
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Remove } from '@mui/icons-material';

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
  const [UpdateModal2, setUpdateModal2] = useState(false);
  const [UpdateModal3, setUpdateModal3] = useState(false);
  const handleUpdateModalOpen = () => setUpdateModal(true);
  const handleUpdateModalClose = () => setUpdateModal(false);
  const handleUpdateModalOpen2 = () => setUpdateModal2(true);
  const handleUpdateModalClose2 = () => setUpdateModal2(false);
  const handleUpdateModalOpen3 = () => setUpdateModal3(true);
  const handleUpdateModalClose3 = () => setUpdateModal3(false);
  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    des: Yup.string().required('Description is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: '',
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

  const Leave = async () => {
    try {

      const response = await axios.get(`api/leave/groupe/${id}`);
      const { message } = response.data;
      enqueueSnackbar(message);
      getGroupsMember()
      getGroupsMemberRating()
      handleUpdateModalClose()
    } catch (error) {
      console.error(error);
    }
  };
  const [StartDate, setStartDate] = useState('')
  const [EndDate, setEndDate] = useState('')
  const StartDateState = (event) => {
    setStartDate(event.target.value);
  }
  const EndDateState = (event) => {
    setEndDate(event.target.value);
  }
  const FitlerReports = async () => {
    setisLoading2(false)
    const response = await axios.get(`api/sellers/rating/groupe/${id}?startdate=${StartDate}&enddate=${EndDate}`);
    const { Rating, status } = response.data;
    // console.log(members)
    if (status === 'success') {
      setRating(Rating)
      setisLoading2(true)
    } else {
      setisLoading(false)
    }
  }
  const columns = [

    {
      name: "AgentName",
      label: "AgentName",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "SalePersonName",
      label: "SalePersonName",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "SalePersonState",
      label: "SalePersonState",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "TotalSale",
      label: "TotalSale",
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
                <Stack direction="row" spacing={2}>
                  <Button startIcon={<AddIcon />} onClick={handleUpdateModalOpen2}>
                    Add Private Member
                  </Button>
                </Stack>
                {/* <Stack direction="row" spacing={2}>
                  <Button startIcon={<Remove />} onClick={handleUpdateModalOpen3}>
                    Remove Private Member
                  </Button>
                </Stack> */}
                <Stack direction="row" spacing={2} onClick={Delete}>
                  <Button startIcon={<DeleteIcon />}>
                    Delete Group
                  </Button>
                </Stack>

                <Stack direction="row" spacing={2} onClick={Leave}>
                  <Button startIcon={<ExitToAppIcon />}>
                    Leave Group
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

              {!isLoading ? <ListItem key={`item-${'1'}-${'1'}`}>
                <ListItemText primary={`No Group Member`} />
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
              <Stack direction="row-reverse" >

                <Button sx={{ m: 4, width: 20, height: 50 }} variant='contained' onClick={(e) => { FitlerReports() }}>Search</Button>
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

              {!isLoading ? <ListItem key={`item-${'1'}-${'1'}`}>
                <ListItemText primary={`No Group Member`} />
              </ListItem> :

                <MUIDataTable
                  title={"Ranking"}
                  data={rating}
                  columns={columns}
                  options={options}
                />
              }
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


      <Modal
        open={UpdateModal2}
        onClose={handleUpdateModalClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddMember />
        </Box>
      </Modal>

      <Modal
        open={UpdateModal3}
        onClose={handleUpdateModalClose3}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <RemoveMember />
        </Box>
      </Modal>
    </Stack >

  );
}

const AddMember = () => {
  const { id } = useParams();
  useEffect(() => { Agents() }, [])
  const NewUserSchema = Yup.object().shape({
    agentid: Yup.string().required('Name is required'),
  });

  const defaultValues = useMemo(
    () => ({
      agentid: '',
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
      const response = await axios.get(`api/join/private/groupe/${id}/${data.agentid}`, formData);
      const { message } = response.data;

    } catch (error) {
      console.error(error);
    }
  };
  const [agent, setAgent] = useState([])
  const [Show, setShow] = useState(false)
  const Agents = async () => {
    try {
      const response = await axios.get(`api/get/agents`);
      const { agents } = response.data;
      setAgent(agents)
      setShow(true)
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            {/* <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }} */}
            {/* > */}
            <RHFSelect name="agentid" label="Agent" >
              <option value='' />
              {!Show ? <option value='' >No Agent Found</option> :
                agent.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
            </RHFSelect>
            {/* </Box> */}

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Add Private Member
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  )
}


const RemoveMember = () => {
  const { id } = useParams();

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: '',
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
      const response = await axios.post(`api/update/groupe/${id}`, formData);
      const { message } = response.data;
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            {/* <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            > */}
            <RHFTextField name="name" label="Name" />
            {/* </Box> */}

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Remove Private Member
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  )
}