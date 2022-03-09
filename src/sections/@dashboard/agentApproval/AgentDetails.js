import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, TextField } from '@mui/material';
// hooks
import useAuth from '../../../hooks/useAuth';
// utils
import { fData } from '../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// _mock
import { countries } from '../../../_mock';
// components
import Label from '../../../components/Label';
import { FormProvider, RHFSelect, RHFSwitch, RHFTextField, RHFUploadAvatar } from '../../../components/hook-form';

// ----------------------------------------------------------------------

export default function AgentProfile() {
    const navigate = useNavigate();

    const { enqueueSnackbar } = useSnackbar();

    const { agentdetail } = useAuth();
    console.log(useAuth())
    return (
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

                        <TextField label='Agent ID' value={agentdetail?.id} readonly />
                        <TextField label='Agent Name' value={agentdetail?.name} readonly />
                        <TextField label='Agent Email' value={agentdetail?.email} readonly />
                        <TextField label='Agent State' value={agentdetail?.state} readonly />

                    </Box>

                </Card>
            </Grid>
        </Grid>
    );
}
