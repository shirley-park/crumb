import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Typography, IconButton, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { useDispatch } from 'react-redux'
import { shades } from '../../theme'
import { addToCart } from '../../state'
import Item from '../../components/Item'

const ProductDetails = () => {
  const { itemId } = useParams()
  const [item, setItem] = useState(null)
  const dispatch = useDispatch()
  const [count, setCount] = useState(1)
  const [otherItems, setOtherItems] = useState([])

  async function getItem() {
    const item = await fetch(
      `http://localhost:1337/api/items/${itemId}?populate=image`,
      {
        method: 'GET',
      }
    )
    const itemJson = await item.json()
    setItem(itemJson.data)
  }

  async function getOtherItems() {
    const otherItems = await fetch(
      `http://localhost:1337/api/items?populate=*`,
      {
        method: 'GET',
      }
    )
    const otherItemsJson = await otherItems.json()
    setOtherItems(otherItemsJson.data)
  }

  useEffect(() => {
    getItem()
    getOtherItems() // eslint-disable-next-line
  }, [itemId])

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
        <Box display="flex" flexWrap="wrap" justifyContent="space-between">
          {otherItems.map((otherItem) => (
            <Item item={otherItem} key={`${otherItem.name}-${otherItem.id}`} />
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default ProductDetails
