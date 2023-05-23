import {
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  TextField,
} from '@mui/material'
import AddressForm from './AddressForm'

const BillingInfo = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  setFieldValue,
}) => {
  return (
    <Box m="30px auto">
      <Box>
        <Typography sx={{ mb: '15px' }} fontSize="18px">
          Billing Information
        </Typography>
        <Box m="30px 0">
          <Box>
            <TextField
              fullWidth
              type="text"
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={!!touched.email && !!errors.email}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: 'span 4', marginBottom: '15px' }}
            />
            <TextField
              fullWidth
              type="text"
              label="Phone"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.phone}
              name="phone"
              error={!!touched.phone && !!errors.phone}
              helperText={touched.phone && errors.phone}
              sx={{ gridColumn: 'span 4' }}
            />
          </Box>
        </Box>
        <AddressForm
          type="billingAddress"
          values={values.billingAddress}
          touched={touched}
          errors={errors}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />
      </Box>

      <Box mb="20px">
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              values={values.shippingAddress.isSameAddress}
              onChange={() =>
                setFieldValue(
                  'shippingAddress.isSameAddress',
                  !values.shippingAddress.isSameAddress
                )
              }
            />
          }
          label="Same for Shipping Address"
        />
      </Box>

      {!values.shippingAddress.isSameAddress && (
        <Box>
          <Typography sx={{ mb: '15px' }} fontSize="18px">
            Shipping Information
          </Typography>
          <AddressForm
            type="shippingAddress"
            values={values.shippingAddress}
            touched={touched}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />
        </Box>
      )}
    </Box>
  )
}

export default BillingInfo
