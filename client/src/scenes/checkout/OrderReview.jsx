import { Box, Typography, Divider } from '@mui/material'
import styled from '@emotion/styled'

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const OrderReview = ({ cart }) => {
  const cartSubtotal = cart.reduce((total, item) => {
    return total + item.count * item.attributes.price
  }, 0)

  return (
    <Box m="30px auto">
      <Box>
        <Typography sx={{ mb: '15px' }} fontSize="18px">
          Review your order
        </Typography>
        <Box>
          {cart.map((item) => (
            <Box key={`${item.attributes.id} - ${item.attributes.name}`}>
              <FlexBox p="15px 0">
                <Box flex="1 1 40%">
                  <img
                    src={`http://localhost:1337${item?.attributes?.image?.data[0].attributes?.url}`}
                    alt={item?.name}
                    width="120px"
                    height="165px"
                  />
                </Box>
                <Box flex="1 1 60%" m>
                  <FlexBox mb="10px">
                    <Typography fontWeight="bold">
                      {item.attributes.name}
                    </Typography>
                  </FlexBox>

                  <Typography>${item?.attributes?.price.toFixed(2)}</Typography>

                  <FlexBox m="15px 0">
                    <Box>
                      <Typography>Qty: {item.count}</Typography>
                    </Box>
                    <Box>
                      <Typography fontWeight="bold">
                        ${(item.count * item.attributes.price).toFixed(2)}
                      </Typography>
                    </Box>
                  </FlexBox>
                </Box>
              </FlexBox>
              <Divider />
            </Box>
          ))}
        </Box>
        <Box m="20px 0">
          <FlexBox m="20px 0">
            <Typography fontWeight="bold">Total</Typography>

            <Typography fontWeight="bold">
              ${cartSubtotal.toFixed(2)}
            </Typography>
          </FlexBox>
        </Box>
      </Box>
    </Box>
  )
}

export default OrderReview
