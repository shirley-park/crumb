import { useSelector } from 'react-redux'
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Typography,
} from '@mui/material'
import { Formik } from 'formik'
import { useState } from 'react'
import * as yup from 'yup'
import { shades } from '../../theme'
import BillingInfo from './BillingInfo'
import OrderReview from './OrderReview'
import { loadStripe } from '@stripe/stripe-js'

const initialValues = {
  email: '',
  phone: '',

  billingAddress: {
    firstName: '',
    lastName: '',
    streetAddress: '',
    city: '',
    postcode: '',
    country: '',
  },
  shippingAddress: {
    isSameAddress: true,
    firstName: '',
    lastName: '',
    streetAddress: '',
    city: '',
    postcode: '',
    country: '',
  },
  // email: '',
  // phone: '',
}

const checkoutSchema = [
  yup.object().shape({
    email: yup.string().required('required'),
    phone: yup.string().required('required'),
    billingAddress: yup.object().shape({
      firstName: yup.string().required('required'),
      lastName: yup.string().required('required'),
      streetAddress: yup.string().required('required'),
      city: yup.string().required('required'),
      postcode: yup.string().required('required'),
      country: yup.string().required('required'),
    }),
    shippingAddress: yup.object().shape({
      isSameAddress: yup.boolean(),
      firstName: yup.string().when('isSameAddress', {
        is: false,
        then: () => yup.string().required('required'),
      }),
      lastName: yup.string().when('isSameAddress', {
        is: false,
        then: () => yup.string().required('required'),
      }),
      streetAddress: yup.string().when('isSameAddress', {
        is: false,
        then: () => yup.string().required('required'),
      }),
      city: yup.string().when('isSameAddress', {
        is: false,
        then: () => yup.string().required('required'),
      }),
      postcode: yup.string().when('isSameAddress', {
        is: false,
        then: () => yup.string().required('required'),
      }),
      country: yup.string().when('isSameAddress', {
        is: false,
        then: () => yup.string().required('required'),
      }),
    }),
  }),
  yup.object().shape({
    email: yup.string().required('required'),
    phone: yup.string().required('required'),
  }),
]

const stripePromise = loadStripe(
  'pk_test_51NAmi3AHkOqY5i5NbBaEXLm5EOMLcwVCwavObcVPkavyvncj36FdWL4yK77ISnovZ1LQKCxcZrnD3sXpftm8pcVk00hO9UIaK6'
)

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0)
  const cart = useSelector((state) => state.cart.cart)
  const stepOne = activeStep === 0
  const stepTwo = activeStep === 1
  const emptyCart = cart.length === 0

  const handleFormSubmit = async (values, actions) => {
    // if the shippingAddress is the same, copy over billing address
    if (stepOne && values.shippingAddress.isSameAddress) {
      setActiveStep(activeStep + 1)
      actions.setFieldValue('shippingAddress', {
        ...values.billingAddress,
        isSameAddress: true,
      })
    }

    if (stepTwo) {
      makePayment(values)
    }

    actions.setTouched({})
  }

  async function makePayment(values) {
    const stripe = await stripePromise
    const requestBody = {
      username: [values.firstName, values.lastName].join(''),
      email: values.email,
      products: cart.map(({ id, count }) => ({ id, count })),
    }

    const response = await fetch('http://localhost:1337/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    })
    const session = await response.json()
    await stripe.redirectToCheckout({
      sessionId: session.id,
    })
  }

  return (
    <Box width="70%" m="100px auto">
      {/* Checkout steps */}
      <Stepper activeStep={activeStep}>
        <Step>
          <StepLabel>Billing and shipping</StepLabel>
        </Step>
        <Step>
          <StepLabel>Order review</StepLabel>
        </Step>
      </Stepper>
      {/* Billing information */}
      <Box>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema[activeStep]}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <>
              <Box m="30px auto">
                <Typography sx={{ mb: '15px' }} fontSize="18px">
                  {emptyCart ? 'Your cart is empty' : null}
                </Typography>
              </Box>

              <form onSubmit={handleSubmit}>
                {!emptyCart && stepOne && (
                  <BillingInfo
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                  />
                )}

                {stepTwo && <OrderReview cart={cart} />}

                <Box display="flex" justifyContent="space-between" gap="60px">
                  {stepTwo && (
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{
                        backgroundColor: shades.primary[200],
                        borderRadius: '30px',
                        marginTop: '30px',
                        padding: '15px 40px',
                        '&:hover': {
                          backgroundColor: shades.primary[300],
                        },
                      }}
                      onClick={() => setActiveStep(activeStep - 1)}
                    >
                      Back
                    </Button>
                  )}
                  <Button
                    fullWidth
                    type="submit"
                    color="primary"
                    variant="contained"
                    sx={{
                      backgroundColor: shades.primary[200],
                      borderRadius: '30px',
                      marginTop: '30px',
                      padding: '15px 40px',
                      '&:hover': {
                        backgroundColor: shades.primary[300],
                      },
                    }}
                  >
                    {!stepTwo ? 'Next' : 'Continue to payment'}
                  </Button>
                </Box>
              </form>
            </>
          )}
        </Formik>
      </Box>
    </Box>
  )
}

export default Checkout
