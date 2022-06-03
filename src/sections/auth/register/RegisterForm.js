import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import $ from 'jquery';
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
import { useNavigate } from 'react-router-dom';

// @mui
import { Stack, IconButton, InputAdornment, Alert, Box, Modal, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_AUTH } from '../../../routes/paths';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// utility 
import axios from '../../../utils/axios';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField ,RHFSelect} from '../../../components/hook-form';
import StriImg from '../../../assets/image/Stripe_logo.png'
import LoadingScreen from '../../../components/LoadingScreen';
// ----------------------------------------------------------------------
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  background: ` linear-gradient(to bottom, rgba(255, 255, 255, 0.52), rgba(255, 255, 255, 0.73)),url(${StriImg})`,
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  backgroundSize: 'cover'
};

export default function RegisterForm() {
  const { register } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();


  const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setisLoading] = useState(false)
  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('FirstName is required'),
    lastName: Yup.string().required('LastName is required'),
    email: Yup.string().required('email is required').matches(/(@statefarm.com)/),
    coupon: Yup.string(),
    state: Yup.string().required('Confirm Password is required'),
    password: Yup.string().required('Password is required'),
    confirmpassword: Yup.string().required('Confirm Password is required'),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    state: '',
    coupon: '',
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
    setisLoading(true)
    try {
      const formData = new FormData();
      formData.append("firstName", data.firstName)
      formData.append("lastName", data.lastName)
      formData.append("email", data.email)
      formData.append("state", data.state)
      formData.append("coupon", data.coupon)
      formData.append("password", data.password)
      formData.append("confirmpassword", data.confirmpassword)
      formData.append("paymentMethod", PaymentID)
      formData.append("priceId", PriceID)
      const response = await axios.post(`api/register`, formData);
      const { message } = response.data;
      enqueueSnackbar(message);
      handleClose()
      navigate(PATH_AUTH.login)
      setisLoading(false)

    } catch (error) {
      console.error(error);
    }
  };
  const [StripeKey, setStripeKey] = useState('');
  const [PriceID, setPriceID] = useState('');
  const [PaymentID, setPaymentID] = useState('');
  const SripeInfo = async () => {
    try {
      const response = await axios.get(`api/stripe/info`);
      const { prices, testKey } = response.data.data;
      setStripeKey(testKey);
      setPriceID(prices[0]?.price_id);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    SripeInfo();
    State();

  }, [])
  const [state, setState] = useState([])
  const [Show2, setShow2] = useState(false)
  const State = async () => {
    try {
      const response = await axios.get(`api/get/states`);
      const { states } = response.data;
      setState(states)
      setShow2(true)
    } catch (error) {
      console.error(error);
    }
  }

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



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
      setPaymentID(paymentMethod.id)
      $('#bbn').trigger('click');

    };

    return (
      <form onSubmit={handleSubmit}>
        <Box>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Card details
          </Typography>
          <CardElement />

          <LoadingButton fullWidth size="small" sx={{ mt: 5 }} variant="contained" type="submit" disabled={!stripe || !elements}>
            Pay
          </LoadingButton>
        </Box>

      </form>
    );
  };
  const stripePromise = loadStripe(StripeKey);
  return (
    <>
      {isLoading ? <LoadingScreen /> : null}
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <RHFTextField name="firstName" label="First Name" />
            <RHFTextField name="lastName" label="Last Name" />
          </Stack>

          <RHFSelect name="state" label="State" >
            <option value='' />
            {!Show2 ? <option value='' >No State Found</option> :
              state.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.state} ({option.code})
                </option>
              ))}
          </RHFSelect>
          <RHFTextField name="email" label="Email address" helperText="email must match the following: @statefarm.com"/>
          <RHFTextField name="coupon" label="Coupon(if Available)" />

          <RHFTextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <RHFTextField
            name="confirmpassword"
            label="ConfirmPassword"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <LoadingButton fullWidth size="large" variant="contained" onClick={handleOpen} >
            Payment
          </LoadingButton>
          <input type='submit' id='bbn' style={{ display: 'none' }} />

        </Stack>

      </FormProvider>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </Box>
      </Modal>
    </>
  );
}
