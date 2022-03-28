import * as Yup from 'yup';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// utilits 
import axios from '../../../utils/axios';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const { register } = useAuth();
  const { enqueueSnackbar } = useSnackbar();


  const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('FirstName is required'),
    lastName: Yup.string().required('LastName is required'),
    email: Yup.string().required('Email is required').email(),
    state: Yup.string().required('Confirm Password is required'),
    password: Yup.string().required('Password is required'),
    confirmpassword: Yup.string().required('Confirm Password is required'),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    state: '',
    password: '',
    confirmpassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,

    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("firstName", data.firstName)
      formData.append("lastName", data.lastName)
      formData.append("email", data.email)
      formData.append("state", data.state)
      formData.append("password", data.password)
      formData.append("confirmpassword", data.confirmpassword)
      const response = await axios.post(`api/register`, formData);
      const { message } = response.data;
      enqueueSnackbar(message);
    } catch (error) {
      console.error(error);
    }
  };

  const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

  const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
      event.preventDefault();

      if (elements == null) {
        return;
      }

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });
    };

    const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

    return (
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit" disabled={!stripe || !elements}>
          Pay
        </button>
      </form>
    );
  };
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
    // <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
    //   <Stack spacing={3}>
    //     {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

    //     <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
    //       <RHFTextField name="firstName" label="First Name" />
    //       <RHFTextField name="lastName" label="Last Name" />
    //     </Stack>

    //     <RHFTextField name="state" label="State/Region" />
    //     <RHFTextField name="email" label="Email Address" />

    //     <RHFTextField
    //       name="password"
    //       label="Password"
    //       type={showPassword ? 'text' : 'password'}
    //       InputProps={{
    //         endAdornment: (
    //           <InputAdornment position="end">
    //             <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
    //               <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
    //             </IconButton>
    //           </InputAdornment>
    //         ),
    //       }}
    //     />

    //     <RHFTextField
    //       name="confirmpassword"
    //       label="ConfirmPassword"
    //       type={showPassword ? 'text' : 'password'}
    //       InputProps={{
    //         endAdornment: (
    //           <InputAdornment position="end">
    //             <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
    //               <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
    //             </IconButton>
    //           </InputAdornment>
    //         ),
    //       }}
    //     />
    //     <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
    //       Register
    //     </LoadingButton>
    //   </Stack>
    // </FormProvider>
  );
}
