import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Typography } from '@mui/material'

const ProductDetails = () => {
  const { itemId } = useParams()
  const [item, setItem] = useState(null)

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

  useEffect(() => {
    getItem() // eslint-disable-next-line
  }, [itemId])

  return (
    <Box width="80%" m="80px auto">
      {/* outer container */}
      <Box display="flex" flexWrap="wrap" columnGap="40px">
        <Box flex="1 1 40%" m="40px">
          <img
            src={`http://localhost:1337${item?.attributes?.image?.data[0].attributes?.url}`}
            alt={item?.name}
            width="100%"
            // height="100%"
            style={{ objectFit: 'contain' }}
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
        </Box>
      </Box>
    </Box>
  )
}

export default ProductDetails
