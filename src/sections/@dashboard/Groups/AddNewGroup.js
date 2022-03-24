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
import { Box, Card, Grid, Stack, Switch, Typography, FormControlLabel } from '@mui/material';
// Hooks
import useAuth from '../../../hooks/useAuth';
// utils
import axios from '../../../utils/axios';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// _mock
import { countries } from '../../../_mock';
// components
import Label from '../../../components/Label';
import { FormProvider, RHFSelect, RHFSwitch, RHFTextField, RHFUploadAvatar } from '../../../components/hook-form';

// ----------------------------------------------------------------------

export default function AddNewGroup(props) {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const userID = localStorage.getItem('UserID');

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
            const response = await axios.post(`api/add/groupe`, formData);
            const { message } = response.data;
            enqueueSnackbar(message);
            props.func()
        } catch (error) {
            console.error(error);
        }
    };



    return (
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
                                Create Group
                            </LoadingButton>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>
        </FormProvider>
    );
}
