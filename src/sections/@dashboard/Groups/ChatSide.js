import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Stack, Drawer, IconButton, Avatar, ListItemAvatar, Typography, Divider, List, ListItemText } from '@mui/material';
// redux
import { useSelector } from '../../../redux/store';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// utils
import axios from '../../../utils/axios';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Iconify from '../../../components/Iconify';
import Label from '../../../components/Label';
import Scrollbar from '../../../components/Scrollbar';
//
import ChatAccount from './ChatAccount';
import ChatConversationList from './ChatConversationList';
import MyAvatar from '../../../components/MyAvatar';

import BadgeStatus from '../../../components/BadgeStatus';
// ----------------------------------------------------------------------

const ToggleButtonStyle = styled((props) => <IconButton disableRipple {...props} />)(({ theme }) => ({
    left: 0,
    zIndex: 9,
    width: 32,
    height: 32,
    position: 'absolute',
    top: theme.spacing(13),
    borderRadius: `0 12px 12px 0`,
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    boxShadow: theme.customShadows.primary,
    '&:hover': {
        backgroundColor: theme.palette.primary.darker,
    },
}));

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

    useEffect(() => {
        getGroups();

        if (!isDesktop) {
            return handleCloseSidebar();
        }
        return handleOpenSidebar();
    }, [isDesktop, pathname]);

    // eslint-disable-next-line consistent-return
    useEffect(() => {
    }, []);

    useEffect(() => {
        getGroups();
    }, [props]);
    const handleOpenSidebar = () => {
        setOpenSidebar(true);
    };

    const handleCloseSidebar = () => {
        setOpenSidebar(false);
    };

    const [group, setGroups] = useState([]);

    const getGroups = async () => {
        const response = await axios.get(`api/agent/groupes/${userID}`);
        const { message, groupes } = response.data;
        // console.log(groupes)
        setGroups(groupes)
    }
    const renderContent = (
        <>
            <Box sx={{ py: 2, px: 3 }}>
                <Stack direction="row" alignItems="center" justifyContent="center">
                    {!isCollapse && (
                        <>
                            <ChatAccount />
                            <Box sx={{ flexGrow: 1 }} > <Typography variant="h6" align="center" sx={{ color: 'text.secondary' }} gutterBottom>Groups</Typography></Box>
                        </>
                    )}


                </Stack>

            </Box>
            <Divider />
            <Scrollbar>
                <List disablePadding >
                    {group.map((option) => (
                        <>
                            <ListItemAvatar sx={{ cursor: 'pointer' }}>
                                <Typography variant="h6" align="center" sx={{ color: 'text.secondary', m: 1 }} gutterBottom>
                                    {option.name}
                                </Typography>
                                <Divider />
                            </ListItemAvatar>
                        </>
                    ))}

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
