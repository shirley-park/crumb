import { Box, Button, Divider, IconButton, Typography } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import styled from '@emotion/styled'
import { shades } from '../../theme'
import {
  decreaseCount,
  increaseCount,
  removeFromCart,
  setIsCartOpen,
} from '../../state'
import { useNavigate } from 'react-router-dom'

// styled Flexbox component
const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ShoppingCart = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart.cart)
  const isCartOpen = useSelector((state) => state.cart.isCartOpen)

  const cartSubtotal = cart.reduce((total, item) => {
    return total + item.count * item.attributes.price
  }, 0)

  return (
    // overlay
    <Box
      display={isCartOpen ? 'block' : 'none'}
      backgroundColor="rgba(0, 0, 0, 0.3)"
      position="fixed"
      zIndex={10}
      width="100%"
      height="100%"
      left="0"
      top="0"
      overflow="auto"
    >
      {/* cart */}
      <Box
        position="fixed"
        right="0"
        bottom="0"
        width="max(400px, 30%)"
        height="100%"
        backgroundColor="white"
      >
        <Box padding="30px" overflow="auto" height="100%">
          {/* header */}
          <FlexBox mb="15px">
            <Typography variant="h3">Shopping bag ({cart.length})</Typography>
            <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
              <CloseIcon />
            </IconButton>
          </FlexBox>

          {/* shopping bag list */}
          <Box>
            {cart.map((item) => (
              <Box key={item.attributes.id}>
                <FlexBox p="15px 0">
                  <Box flex="1 1 40%">
                    <img
                      src={`http://localhost:1337${item?.attributes?.image?.data[0].attributes?.url}`}
                      alt={item?.name}
                      width="123px"
                      height="164px"
                    />
                  </Box>
                  <Box flex="1 1 60%">
                    <FlexBox mb="5px">
                      <Typography fontWeight="bold">
                        {item.attributes.name}
                      </Typography>
                      <IconButton
                        onClick={() =>
                          dispatch(removeFromCart({ id: item.id }))
                        }
                      >
                        <CloseIcon />
                      </IconButton>
                    </FlexBox>
                    <Typography>{item.attributes.shortDescription}</Typography>
                    <FlexBox m="15px 0">
                      <Box
                        display="flex"
                        alignItems="center"
                        border={`1.5px solid ${shades.neutral[500]}`}
                        borderRadius="20px"
                      >
                        <IconButton
                          onClick={() =>
                            dispatch(decreaseCount({ id: item.id }))
                          }
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography>{item.count}</Typography>
                        <IconButton
                          onClick={() =>
                            dispatch(increaseCount({ id: item.id }))
                          }
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>

                      {/* Price */}
                      <Typography>${item.attributes.price}</Typography>
                    </FlexBox>
                  </Box>
                </FlexBox>
                <Divider />
              </Box>
            ))}
          </Box>

          {/* Actions - subtotal, price, checkout */}
          <Box m="20px 0">
            <FlexBox m="20px 0">
              <Typography fontWeight="bold">Subtotal</Typography>
              <Typography fontWeight="bold">${cartSubtotal}</Typography>
            </FlexBox>
            <Button
              disabled={cart.length > 0 ? false : true}
              sx={{
                backgroundColor: shades.primary[200],
                color: 'white',
                borderRadius: '30px',
                minWidth: '100%',
                padding: '20px 40px',
                m: '20px 0',
                '&:hover': {
                  backgroundColor: shades.primary[300],
                },
              }}
              onClick={() => {
                navigate('/checkout')
                dispatch(setIsCartOpen({}))
              }}
            >
              Checkout
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ShoppingCart
