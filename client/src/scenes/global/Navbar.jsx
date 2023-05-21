// import { useState, useEffect } from 'react'
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

  const isNonMobile = useMediaQuery('(min-width:600px)')

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        width="100%"
        height="80px"
        backgroundColor="rgba(255, 255, 255)"
        color="black"
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
          >
            <Typography variant="h1">CRUMB</Typography>
          </Box>

          <Box display="flex" justifyContent="end" columnGap="20px">
            <IconButton sx={{ color: 'black' }}>
              <SearchOutlined fontSize="large" />
            </IconButton>
            <Badge
              badgeContent={cart.length}
              color="secondary"
              invisible={cart.length === 0}
              sx={{
                '& .MuiBadge-badge': {
                  right: 50,
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
                  marginRight: '40px',
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
