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
        <Box flex="1 1 40%">
          <img
            src={`http://localhost:1337${item?.attributes?.image?.data[0].attributes?.url}`}
            alt={item?.name}
            width="100%"
            style={{ objectFit: 'contain' }}
          />
        </Box>
        <Box flex="1 1 40%" mb="40px">
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
                backgroundColor: shades.primary[200],
                color: 'white',
                px: '20px',
                marginLeft: '20px',
                borderRadius: '20px',
                '&:hover': {
                  backgroundColor: shades.primary[300],
                },
              }}
            >
              Add to cart
            </Button>
          </Box>
        </Box>
      </Box>

      <Box mt="60px" width="100%">
        <Typography variant="h3" textAlign="left">
          You may also like
        </Typography>
        <Box
          mt="30px"
          display="flex"
          flexWrap="wrap"
          justifyContent="space-between"
          rowGap="20px"
        >
          {items
            .filter((item) => item.id !== Number(itemId))
            .slice(0, 4)
            .map((item) => (
              <Item item={item} key={`${item.name}-${item.id}`} />
            ))}
        </Box>
      </Box>
    </Box>
  )
}

export default ProductDetails
