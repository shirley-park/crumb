import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Typography, IconButton, Button } from '@mui/material'
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { shades } from '../../theme'
import { addToCart } from '../../state'
import Item from '../../components/Item'
import { useItemsQuery } from '../../hooks/useItemsQuery'
import { useItemQuery } from '../../hooks/useItemQuery'

const ProductDetails = () => {
  const { itemId } = useParams()
  const dispatch = useDispatch()
  const [count, setCount] = useState(1)

  const itemsQuery = useItemsQuery()
  const items = itemsQuery.isSuccess ? itemsQuery.data.data : []

  const itemQuery = useItemQuery(itemId)
  const item = itemQuery.isSuccess ? itemQuery.data : []

  return (
    <Box width="80%" m="80px auto">
      {/* product detail container */}
      <Box display="flex" flexWrap="wrap" columnGap="40px">
        <Box flex="1 1 40%" m="40px">
          <img
            src={`http://localhost:1337${item?.attributes?.image?.data[0].attributes?.url}`}
            alt={item?.name}
            width="90%"
          />
        </Box>
        <Box flex="1 1 40%">
          <Box m="50px 0 20px 0">
            <Typography variant="h3">{item?.attributes?.name}</Typography>
            <Typography sx={{ mt: '10px' }}>
              ${item?.attributes?.price}
            </Typography>
            <Typography sx={{ mt: '20px' }}>
              {item?.attributes?.shortDescription}
            </Typography>
            <Typography sx={{ mt: '20px' }}>
              {item?.attributes?.ingredients}
            </Typography>
          </Box>

          <Box display="flex" justifyContent="start" mt="30px">
            {/* Quantity */}
            <Box
              display="flex"
              alignItems="center"
              backgroundColor={shades.neutral[100]}
              borderRadius="20px"
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography color={shades.primary[300]}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>

            {/* Add to cart button */}
            <Button
              onClick={() => {
                dispatch(addToCart({ item: { ...item, count } }))
              }}
              sx={{
                backgroundColor: shades.primary[300],
                color: 'white',
                marginLeft: '20px',
                borderRadius: '20px',
              }}
            >
              Add to cart
            </Button>
          </Box>
        </Box>
      </Box>

      <Box mt="50px" width="100%">
        <Typography variant="h3" textAlign="left">
          You may also like
        </Typography>
        <Box
          mt="30px"
          display="flex"
          flexWrap="wrap"
          justifyContent="space-between"
        >
          {items
            .filter((item) => item.id !== Number(itemId))
            .slice(0, 3)
            .map((item) => (
              <Item item={item} key={`${item.name}-${item.id}`} />
            ))}
        </Box>
      </Box>
    </Box>
  )
}

export default ProductDetails
