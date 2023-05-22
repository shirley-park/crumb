import { useSelector } from 'react-redux'
import { Box, Button, Stepper, Step, StepLabel } from '@mui/material'
import { Formik } from 'formik'
import { useState } from 'react'
import * as yup from 'yup'
import { shades } from '../../theme'
import AddressForm from './AddressForm'

const initialValues = {
  billingAddress: {
    firstName: '',
    lastName: '',
    streetAddress: '',
    city: '',
    postcode: '',
    country: '',
  },
  email: '',
  phone: '',
}

const checkoutSchema = [
  yup.object().shape({
    billingAddress: yup.object().shape({
      firstName: yup.string().required('required'),
      lastName: yup.string().required('required'),
      streetAddress: yup.string().required('required'),
      city: yup.string().required('required'),
      postcode: yup.string().required('required'),
      country: yup.string().required('required'),
    }),
    shippingAddress: yup.object().shape({
      firstName: yup.string().required('required'),
      lastName: yup.string().required('required'),
      streetAddress: yup.string().required('required'),
      city: yup.string().required('required'),
      postcode: yup.string().required('required'),
      country: yup.string().required('required'),
    }),
  }),
  yup.object().shape({
    email: yup.string().required('required'),
    phone: yup.string().required('required'),
  }),
]

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0)
  const cart = useSelector((state) => state.cart.cart)
  const isFirstStep = activeStep === 0
  const isSecondStep = activeStep === 1
  const isThirdStep = activeStep === 2

  const handleFormSubmit = async (value, actions) => {
    setActiveStep(activeStep + 1)
  }

  return (
    <Box width="50%" m="100px auto">
      <Stepper activeStep={activeStep}>
        <Step>
          <StepLabel>Billing</StepLabel>
        </Step>
        <Step>
          <StepLabel>Shipping</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment</StepLabel>
        </Step>
      </Stepper>
      <Box>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema[activeStep]}
        >
          <AddressForm />
        </Formik>
      </Box>
    </Box>
  )
}

export default Checkout
