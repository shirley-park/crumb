import { useSelector } from 'react-redux'
import { Box, Button, Stepper, Step, StepLabel } from '@mui/material'
import { Formik } from 'formik'
import { useState } from 'react'
import * as yup from 'yup'
import { shades } from '../../theme'
import BillingInfo from './BillingInfo'

const initialValues = {
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
      isSameAddress: yup.boolean(),
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

  console.log(cart)
  console.log(isThirdStep)

  const handleFormSubmit = async (values, actions) => {
    setActiveStep(activeStep + 1)

    if (isFirstStep && values.shippingAddress.isSameAddress) {
      actions.setFieldValue('shippingAddress', {
        ...values.billingAddress,
        isSameAddress: true,
      })
    }
  }

  return (
    <Box width="70%" m="100px auto">
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
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              {isFirstStep && (
                <BillingInfo
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}

              <Box display="flex" justifyContent="space-between" gap="50px">
                {!isFirstStep && (
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
                  {!isSecondStep ? 'Next' : 'Place Order'}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  )
}

export default Checkout
