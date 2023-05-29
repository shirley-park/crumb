import { Box, Typography, Button } from '@mui/material'
import { shades } from '../../theme'

const CheckoutSuccess = () => {
  return (
    <Box width="80%" height="50vh" m="100px auto">
      <Typography sx={{ mb: '60px', mt: '100px' }} align="center" variant="h3">
        ✅ Thank you for your order!
      </Typography>

      <Box align="center">
        <a href="/">
          <Button
            sx={{
              backgroundColor: shades.primary[200],
              color: 'white',
              borderRadius: '20px',
              px: '20px',
              marginLeft: '20px',
              '&:hover': {
                backgroundColor: shades.neutral[300],
                color: 'black',
              },
            }}
          >
            Back to the store
          </Button>
        </a>
      </Box>
    </Box>
  )
}

export default CheckoutSuccess
