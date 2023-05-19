import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { shades } from '../theme'
import { addToCart } from '../state'
import { IconButton, Box, Typography, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

const Item = ({ item, width }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [count, setCount] = useState(1)
  const [isHovered, setIsHovered] = useState(false)

  const { price, name, image } = item.attributes
  const imageAttributes = Object.assign({}, image.data[0].attributes)

  return (
    <Box width={width}>
      <Box
        position="relative"
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        <img
          src={`http://localhost:1337${imageAttributes.url}`}
          alt={item.name}
          width="300px"
          height="400px"
          onClick={() => navigate(`/item/${item.id}`)}
          style={{ cursor: 'pointer' }}
        />
        <Box
          display={isHovered ? 'blocked' : 'none'}
          position="absolute"
          bottom="10%"
          left="0"
          width="100%"
          padding="0 5%"
        >
          <Box display="flex" justifyContent="space-between">
            {/* Quantity counter */}
            <Box
              display="flex"
              alignItems="center"
              backgroundColor={shades.neutral[100]}
              borderRadius="3px"
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
              sx={{ backgroundColor: shades.primary[300], color: 'white' }}
            >
              Add to cart
            </Button>
          </Box>
        </Box>
      </Box>

      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        mt="3px"
      >
        <Typography>{name}</Typography>
        <Typography fontWeight="bold">${price}</Typography>
      </Box>
    </Box>
  )
}

export default Item
