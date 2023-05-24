import { Box, Typography, FormControlLabel, Checkbox } from '@mui/material'

import AddressForm from './AddressForm'

const ShippingInfo = ({
  values,
  touched,
  errors,
  handleBlur,
  handleChange,
  setFieldValue,
}) => {
  return (
    <Box m="30px auto">
      <Box mb="20px">
        <Typography sx={{ mb: '15px' }} fontSize="18px">
          Shipping Address
        </Typography>
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
          label="Same as Billing Address"
        />
      </Box>

      {!values.shippingAddress.isSameAddress && (
        <Box>
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

export default ShippingInfo
