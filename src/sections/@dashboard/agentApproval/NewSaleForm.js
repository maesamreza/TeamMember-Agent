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

export default function AddNewForm() {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const userID = localStorage.getItem('UserID');
    const { getallsaleman } = useAuth();

    const NewUserSchema = Yup.object().shape({
        firstName: Yup.string().required('FirstName is required'),
        lastName: Yup.string().required('LastName is required'),
        email: Yup.string().required('Email is required').email(),
        password: Yup.string().required('Password is required'),
        confirmpassword: Yup.string().required('Confirm Password is required'),
        picture: Yup.mixed().test('required', 'Avatar is required', (value) => value !== ''),
        city: Yup.string().required('Password is required'),
        country: Yup.string().required('Password is required'),
        phone: Yup.string().required('Password is required'),
        state: Yup.string().required('Confirm Password is required'),
    });

    const defaultValues = useMemo(
        () => ({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmpassword: '',
            picture: '',
            city: '',
            country: '',
            phone: '',
            state: '',

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
            formData.append("lastName", data.lastName)
            formData.append("firstName", data.firstName)
            formData.append("email", data.email)
            formData.append("password", data.password)
            formData.append("confirmpassword", data.confirmpassword)
            formData.append("picture", data.picture)
            formData.append("city", data.city)
            formData.append("country", data.country)
            formData.append("phone", data.phone)
            formData.append("state", data.state)
            const response = await axios.post(`api/register/seller`, formData);
            const { message } = response.data;
            enqueueSnackbar(message);
            getallsaleman(userID);
            navigate(PATH_DASHBOARD.general.agentApproval);
        } catch (error) {
            console.error(error);
        }
    };


    const handleDrop = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];

            if (file) {
                setValue(
                    'picture',
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                );
            }
        },
        [setValue]
    );


    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Card sx={{ py: 10, px: 3 }}>

                        <Box sx={{ mb: 5 }}>
                            <RHFUploadAvatar
                                name="picture"
                                accept="image/*"
                                maxSize={3145728}
                                onDrop={handleDrop}
                                helperText={
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            mt: 2,
                                            mx: 'auto',
                                            display: 'block',
                                            textAlign: 'center',
                                            color: 'text.secondary',
                                        }}
                                    >
                                        Allowed *.jpeg, *.jpg, *.png, *.gif
                                    </Typography>
                                }
                            />
                        </Box>

                    </Card>
                </Grid>

                <Grid item xs={12} md={8}>
                    <Card sx={{ p: 3 }}>
                        <Box
                            sx={{
                                display: 'grid',
                                columnGap: 2,
                                rowGap: 3,
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                            }}
                        >
                            <RHFTextField name="firstName" label="FirstName" />
                            <RHFTextField name="lastName" label="LastName" />
                            <RHFTextField name="email" label="Email" />
                            <RHFTextField name="password" label="Password" type='password' />
                            <RHFTextField name="confirmpassword" label="Confirm Password" type='password' />
                            <RHFTextField name="city" label="City" />
                            <RHFTextField name="country" label="Country" />
                            <RHFTextField name="state" label="State" />
                            <RHFTextField name="phone" label="Phone" />
                        </Box>

                        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                                Cerate SalePerson
                            </LoadingButton>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>
        </FormProvider>
    );
}
