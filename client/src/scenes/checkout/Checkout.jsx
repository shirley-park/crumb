import { useSelector } from 'react-redux'
import { Box, Button, Stepper, Step, StepLabel } from '@mui/material'
import { Formik } from 'formik'
import { useState } from 'react'
import * as yup from 'yup'
import { shades } from '../../theme'

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

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <Box width="40%" m="100px auto">
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
    </Box>
  )
}

export default Checkout
