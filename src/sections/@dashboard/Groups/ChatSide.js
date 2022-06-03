import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Stack, Drawer, ListSubheader, Typography, Divider, List, ListItem, ListItemText } from '@mui/material';
// redux
import { useSelector } from '../../../redux/store';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// utils
import axios from '../../../utils/axios';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Scrollbar from '../../../components/Scrollbar';
//
import ChatAccount from './ChatAccount';


// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

const SIDEBAR_WIDTH = 220;
const SIDEBAR_COLLAPSE_WIDTH = 96;

const AVATAR_SIZE = 48;
const AVATAR_SIZE_GROUP = 32;


const AvatarWrapperStyle = styled('div')({
    position: 'absolute',
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    '& .MuiAvatar-img': { borderRadius: '50%' },
    '& .MuiAvatar-root': { width: '100%', height: '100%' },
});

export default function ChatSidebar(props) {
    const theme = useTheme();
    const userID = localStorage.getItem('UserID');

    const navigate = useNavigate();

    const { pathname } = useLocation();

    const [openSidebar, setOpenSidebar] = useState(true);

    const [searchQuery, setSearchQuery] = useState('');

    const [searchResults, setSearchResults] = useState([]);

    const [isSearchFocused, setSearchFocused] = useState(false);

    const { conversations, activeConversationId } = useSelector((state) => state.chat);

    const isDesktop = useResponsive('up', 'md');

    const displayResults = searchQuery && isSearchFocused;

    const isCollapse = isDesktop && !openSidebar;


    // eslint-disable-next-line consistent-return

    useEffect(() => {
        getGroups();
        getOtherGroups();
    }, [props]);
    const handleOpenSidebar = () => {
        setOpenSidebar(true);
    };
    console.log(props)
    const handleCloseSidebar = () => {
        setOpenSidebar(false);
    };

    const [group, setGroups] = useState([]);
    const [othergroup, setotherGroups] = useState([]);

    const [isLoading, setisLoading] = useState(false);
    const [isLoading2, setisLoading2] = useState(false);

    const getGroups = async () => {
        setisLoading(false)
        const response = await axios.get(`api/agent/own/groupes/${userID}`);
        const { message, groupes, status } = response.data;
        // console.log(groupes)
        if (status === 'success') {
            setGroups(groupes)
            setisLoading(true)
        } else {
            setisLoading(false)
        }
    }
    const getOtherGroups = async () => {
        setisLoading2(false)
        const response = await axios.get(`api/agent/groupes/${userID}`);
        const { message, groupes, status } = response.data;
        // console.log(groupes)
        if (status === 'success') {
            setotherGroups(groupes)
            setisLoading2(true)
        } else {
            setisLoading2(false)
        }
    }
    const View = (id) => {
        navigate(`/dashboard/group/${id}`)
    }



    const renderContent = (
        <>
            <Box sx={{ py: 2, px: 3 }}>
                <Stack direction="row" alignItems="center" justifyContent="center">
                    {!isCollapse && (
                        <>
                            {/* <ChatAccount /> */}
                            <Box sx={{ flexGrow: 1 }} >
                                <Typography variant="h6" align="center" sx={{ color: 'text.secondary' }} gutterBottom>Groups</Typography>
                            </Box>
                        </>
                    )}


                </Stack>

            </Box>
            <Divider />
            <Scrollbar>
                <List
                    sx={{
                        width: '100%',
                        maxWidth: 360,
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
                            <ListSubheader>{`Own Groups`}</ListSubheader>
                            {!isLoading ? <ListItem key={`item-${'1'}-${'1'}`}>
                                <ListItemText primary={`No Groups`} />
                            </ListItem> :
                                group.map((section) => (
                                    <ListItem key={`item-${section.id}-${section.id}`} sx={{ cursor: 'pointer' }} onClick={(e) => { View(section.id) }}>
                                        <ListItemText primary={` ${section.name} ${section.private === 1 ? "(Private)" : ''}`} />
                                    </ListItem>
                                ))}
                        </ul>
                    </li>
                    <li key={`section-1`}>
                        <ul>
                            <ListSubheader>{`Other Groups`}</ListSubheader>
                            {!isLoading2 ? <ListItem key={`item-${'1'}-${'1'}`}>
                                <ListItemText primary={`No Groups`} />
                            </ListItem> :
                                othergroup.map((section) => (
                                    <ListItem key={`item-${section.id}-${section.id}`} sx={{ cursor: 'pointer' }} onClick={(e) => { View(section.id) }}>
                                        <ListItemText primary={` ${section.name} ${section.private === 1 ? "(Private)" : ''}`} />
                                    </ListItem>
                                ))}
                        </ul>
                    </li>
                </List>

            </Scrollbar>

        </>
    );

    return (
        <>
            <Drawer
                open={openSidebar}
                variant="persistent"
                sx={{
                    width: SIDEBAR_WIDTH,
                    transition: theme.transitions.create('width'),
                    '& .MuiDrawer-paper': {
                        position: 'static',
                        width: SIDEBAR_WIDTH,
                    },
                    ...(isCollapse && {
                        width: SIDEBAR_COLLAPSE_WIDTH,
                        '& .MuiDrawer-paper': {
                            width: SIDEBAR_COLLAPSE_WIDTH,
                            position: 'static',
                            transform: 'none !important',
                            visibility: 'visible !important',
                        },
                    }),
                }}
            >
                {renderContent}
            </Drawer>

        </>
    );
}
