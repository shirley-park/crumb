import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setItems } from '../../state'
import Item from '../../components/Item'
import { Typography } from '@mui/material'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'

const ProductList = () => {
  const dispatch = useDispatch()
  const [filterValue, setFilterValue] = useState('all')
  const breakPoint = useMediaQuery('(min-width:600px)')
  const items = useSelector((state) => state.cart.items)
  console.log(items)

  const handleChange = (event, newFilterValue) => {
    setFilterValue(newFilterValue)
  }

  async function getItems() {
    const items = await fetch(
      'http://localhost:1337/api/items?populate=image',
      { method: 'GET' }
    )
    const itemsJson = await items.json()
    dispatch(setItems(itemsJson.data))
  }

  useEffect(() => {
    getItems()
  }, [])

  const breadItems = items.filter(
    (item) => item.attributes.category === 'bread'
  )

  const pastryItems = items.filter(
    (item) => item.attributes.category === 'pastry'
  )

  return (
    <Box width="80%" margin="80px auto">
      <Typography variant="h3" textAlign="center">
        Browse our baked goods
      </Typography>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={filterValue}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { display: breakPoint ? 'block' : 'none' } }}
        sx={{
          m: '25px',
          '& .MuiTabs-flexContainer': {
            flexWrap: 'wrap',
          },
        }}
      >
        <Tab label="All" value="all" />
        <Tab label="Bread" value="bread" />
        <Tab label="Pastry" value="pastry" />
      </Tabs>
    </Box>
  )
}

export default ProductList
