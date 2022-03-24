import { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Divider, Stack, Typography, Avatar, Input, IconButton } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import {
  addRecipients,
  onSendMessage,
  getConversation,
  getParticipants,
  markConversationAsRead,
  resetActiveConversation,
} from '../../../redux/slices/chat';
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

// ----------------------------------------------------------------------

const conversationSelector = (state) => {
  const { conversations, activeConversationId } = state.chat;
  const conversation = activeConversationId ? conversations.byId[activeConversationId] : null;
  if (conversation) {
    return conversation;
  }
  const initState = {
    id: '',
    messages: [],
    participants: [],
    unreadCount: 0,
    type: '',
  };
  return initState;
};


const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 320,
  padding: theme.spacing(1.5),
  marginTop: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.neutral,
}));

const InfoStyle = styled(Typography)(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(0.75),
  color: theme.palette.text.secondary,
}));

const RootStyle = styled('div')(({ theme }) => ({
  minHeight: 56,
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  paddingLeft: theme.spacing(2),
}));
export default function ChatWindow() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { conversationKey } = useParams();
  const { contacts, recipients, participants, activeConversationId } = useSelector((state) => state.chat);
  const conversation = useSelector((state) => conversationSelector(state));

  const mode = conversationKey ? 'DETAIL' : 'COMPOSE';
  const displayParticipants = participants.filter((item) => item.id !== '8864c717-587d-472a-929a-8e5f298024da-0');

  useEffect(() => {
    const getDetails = async () => {
      dispatch(getParticipants(conversationKey));
      try {
        await dispatch(getConversation(conversationKey));
      } catch (error) {
        console.error(error);
        navigate(PATH_DASHBOARD.chat.new);
      }
    };
    if (conversationKey) {
      getDetails();
    } else if (activeConversationId) {
      dispatch(resetActiveConversation());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationKey]);

  useEffect(() => {
    getGroups()
  }, [])


  const [messagess, setMessage] = useState('');
  const ID = localStorage.getItem('UserID')

  const handleSendMessage = async () => {
    try {
      const formData = new FormData;
      formData.append('message', messagess)
      const response = await axios.post(`api/groupe/send/message/1`, formData);
      // const { message } = response.data;
      getGroups();
      setMessage('');
    } catch (error) {
      console.error(error);
    }
  };
  const [GroupMessages, setGroupMessages] = useState([]);
  const getGroups = async () => {
    const response = await axios.get(`api/groupe/messages/1`);
    const { messages } = response.data;
    setGroupMessages(messages)
  }
  return (
    <Stack sx={{ flexGrow: 1, minWidth: '1px' }}>
      {/* {mode === 'DETAIL' ? (
        <ChatHeaderDetail participants={displayParticipants} />
      ) : (
        <ChatHeaderCompose
          recipients={recipients}
          contacts={Object.values(contacts.byId)}
          onAddRecipients={handleAddRecipients}
        />
      )} */}
      <Box sx={{ flexGrow: 1, display: 'flex', }}>
        <IconButton color="primary" sx={{ mx: 1 }}>
          <Iconify icon="ic:round-send" width={22} height={22} />
        </IconButton>
      </Box>
      <Divider />

      <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
        <Stack sx={{ flexGrow: 1 }}>
          <Scrollbar sx={{ p: 3, height: 1 }}>
            {GroupMessages.map((option) => (
              <Box
                sx={{
                  display: 'flex',
                  ...(option.agent_id === ID && {
                    ml: 'auto',
                  }),
                }}
              >

                <div>
                  <InfoStyle
                    variant="caption"
                    sx={{
                      ...(option.agent_id === ID && { justifyContent: 'flex-end' }),
                    }}
                  >
                    {option.agent_name}

                  </InfoStyle>

                  <ContentStyle
                    sx={{
                      ...(option.agent_id === ID && { color: 'grey.800', bgcolor: 'primary.lighter' }),
                    }}
                  >
                    <Typography variant="body2">{option.message}</Typography>
                  </ContentStyle>
                  <InfoStyle
                    variant="caption"
                    sx={{
                      ...(option.agent_id === ID && { justifyContent: 'flex-end' }),
                    }}
                  >
                    {new Date(option.created_at).toLocaleString('en-US', { timeZone: 'America/New_York' })}

                  </InfoStyle>
                </div>
              </Box>
            ))}
          </Scrollbar>
          <Divider />
          <RootStyle>
            <Input
              fullWidth
              value={messagess}
              disableUnderline
              // onKeyUp={handleKeyUp}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Type a message"
            />

            <Divider orientation="vertical" flexItem />

            <IconButton color="primary" onClick={handleSendMessage} sx={{ mx: 1 }}>
              <Iconify icon="ic:round-send" width={22} height={22} />
            </IconButton>

          </RootStyle>

        </Stack>

      </Box>
    </Stack>
  );
}
