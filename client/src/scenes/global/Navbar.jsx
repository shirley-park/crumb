import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Badge,
  Box,
  IconButton,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { ShoppingBagOutlined, SearchOutlined } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { setIsCartOpen } from '../../state'

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart.cart)

  const [navbarBg, setNavbarBg] = useState(false)

  useEffect(() => {
    const handleNavbar = () => {
      if (window.scrollY >= 95) {
        setNavbarBg(true)
      } else {
        setNavbarBg(false)
      }
    }
    window.addEventListener('scroll', handleNavbar)
  }, [])

  const isNonMobile = useMediaQuery('(min-width:600px)')

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        width="100%"
        height="80px"
        backgroundColor={
          navbarBg ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0)'
        }
        color={navbarBg ? 'white' : 'black'}
        position="fixed"
        top="0"
        left="0"
        zIndex="1"
      >
        <Box
          width="80%"
          margin="auto"
          display="flex"
          justifyContent={isNonMobile ? 'center' : 'start'}
        >
          <Box
            onClick={() => navigate('/')}
            sx={{ '&:hover': { cursor: 'pointer' } }}
            color={navbarBg ? 'black' : 'white'}
          >
            <Typography variant="h1">CRUMB</Typography>
          </Box>
        </Box>
      </Box>

      <Box
        display="flex"
        justifyContent="end"
        width="100%"
        margin="auto"
        backgroundColor="rgba(255, 255, 255, 0)"
        color="black"
        position="fixed"
        top="0"
        left="0"
        zIndex="1"
      >
        <Box
          display="flex"
          justifyContent="end"
          height="80px"
          columnGap="20px"
          zIndex="2"
        >
          <IconButton sx={{ color: `${navbarBg ? 'black' : 'white'}` }}>
            <SearchOutlined fontSize="large" />
          </IconButton>
          <Badge
            badgeContent={cart.length}
            color="secondary"
            invisible={cart.length === 0}
            sx={{
              '& .MuiBadge-badge': {
                right: 5,
                top: 5,
                padding: '0 4px',
                height: '14px',
                minWidth: '13px',
              },
            }}
          >
            <IconButton
              onClick={() => dispatch(setIsCartOpen({}))}
              sx={{
                color: `${navbarBg ? 'black' : 'white'}`,
                marginRight: '40px',
              }}
            >
              <ShoppingBagOutlined fontSize="large" />
            </IconButton>
          </Badge>
        </Box>
      </Box>
    </>
  )
}

export default Navbar
