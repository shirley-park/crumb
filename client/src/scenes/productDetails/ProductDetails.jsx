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
      <Box display="flex" flexWrap="wrap">
        <Box flex="1 1 40%">
          <img
            src={`http://localhost:1337${item?.attributes?.image?.data[0].attributes?.url}`}
            alt={item?.name}
            width="123px"
            height="164px"
          />
        </Box>
        <Box flex="1 1 40%">
          <Typography>{item?.attributes?.name}</Typography>
          <Typography>{item?.attributes?.price}</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default ProductDetails
