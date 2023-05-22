import { Box, TextField } from '@mui/material'

const AddressForm = ({ type, values, handleBlur, handleChange }) => {
  return (
    <Box
      display="grid"
      gap="15px"
      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
      mt="30px"
    >
      <TextField
        fullWidth
        type="text"
        label="First Name"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.firstName}
        sx={{ gridColumn: 'span 2' }}
      />
      <TextField
        fullWidth
        type="text"
        label="Last Name"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.lastName}
        sx={{ gridColumn: 'span 2' }}
      />
      <TextField
        fullWidth
        type="text"
        label="Street Address"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.address}
        sx={{ gridColumn: 'span 4' }}
      />

      <TextField
        fullWidth
        type="text"
        label="City"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.city}
        sx={{ gridColumn: 'span 2' }}
      />

      <TextField
        fullWidth
        type="text"
        label="Postcode"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.postcode}
        sx={{ gridColumn: 'span 2' }}
      />
      <TextField
        fullWidth
        type="text"
        label="Country"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.country}
        sx={{ gridColumn: 'span 4' }}
      />
    </Box>
  )
}

export default AddressForm
