import { Box, Typography } from '@mui/material'

const Footer = () => {
  return (
    <>
      <Box margin="120px 0">
        <Box
          width="80%"
          margin="auto"
          display="flex"
          justifyContent="space-between"
          alignItems="start"
          flexWrap="wrap"
        >
          <Box>
            <Typography variant="h3" mb="20px">
              CRUMB
            </Typography>
          </Box>

          <Box>
            <Typography variant="h4" mb="20px">
              About us
            </Typography>
            <Typography variant="h4" mb="20px">
              Visit our store
            </Typography>
          </Box>

          <Box>
            <Typography variant="h4" mb="20px">
              Contact
            </Typography>
            <Typography variant="h4" mb="20px">
              Terms and conditions
            </Typography>
            <Typography variant="h4" mb="20px">
              Help
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Footer
