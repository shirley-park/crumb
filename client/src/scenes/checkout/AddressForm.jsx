import { Box, TextField } from '@mui/material'

const AddressForm = () => {
  return (
    <Box
      display="grid"
      gap="15px"
      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
      mt="60px"
    >
      <TextField
        fullWidth
        type="text"
        label="First Name"
        sx={{ gridColumn: 'span 2' }}
      />
      <TextField
        fullWidth
        type="text"
        label="Last Name"
        sx={{ gridColumn: 'span 2' }}
      />
      <TextField
        fullWidth
        type="text"
        label="Street Address"
        sx={{ gridColumn: 'span 4' }}
      />

      <TextField
        fullWidth
        type="text"
        label="City"
        sx={{ gridColumn: 'span 2' }}
      />

      <TextField
        fullWidth
        type="text"
        label="Postcode"
        sx={{ gridColumn: 'span 2' }}
      />
      <TextField
        fullWidth
        type="text"
        label="Country"
        sx={{ gridColumn: 'span 4' }}
      />
    </Box>
  )
}

export default AddressForm
