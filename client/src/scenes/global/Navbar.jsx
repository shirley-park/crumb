import { useDispatch, useSelector } from 'react-redux'
import { Badge, Box, IconButton, Typography } from '@mui/material'
import { ShoppingBagOutlined, SearchOutlined } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { setIsCartOpen } from '../../state'

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart.cart)

  return (
    <>
      <Box
        position="sticky"
        top="0"
        left="0"
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80px"
        backgroundColor="rgba(255, 255, 255)"
        zIndex="1"
      >
        <Box width="80%" display="flex" justifyContent="space-between">
          <button onClick={() => navigate('/')}>
            <Typography variant="h1">CRUMB</Typography>
          </button>

          <Box>
            <IconButton sx={{ color: 'black', marginRight: '15px' }}>
              <SearchOutlined fontSize="large" />
            </IconButton>
            <Badge
              badgeContent={cart.length}
              color="secondary"
              invisible={cart.length === 0}
              sx={{
                '& .MuiBadge-badge': {
                  right: 38,
                  top: 18,
                  padding: '4px 4px',
                  height: '15px',
                  minWidth: '15px',
                },
              }}
            >
              <IconButton
                onClick={() => dispatch(setIsCartOpen({}))}
                sx={{
                  color: 'black',
                }}
              >
                <ShoppingBagOutlined fontSize="large" />
              </IconButton>
            </Badge>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Navbar
