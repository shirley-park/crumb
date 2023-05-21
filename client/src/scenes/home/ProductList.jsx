import React, { useState } from 'react'
import Item from '../../components/Item'
import { Typography } from '@mui/material'
import { Tabs, Tab, Box } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import { AnimatePresence } from 'framer-motion'
import { useItemsQuery } from '../../hooks/useItemsQuery'

const ProductList = () => {
  const [filterValue, setFilterValue] = useState('all')
  const breakPoint = useMediaQuery('(min-width:600px)')

  const handleFilter = (event, newFilterValue) => {
    setFilterValue(newFilterValue)
  }

  const itemsQuery = useItemsQuery(filterValue)

  const items = itemsQuery.isSuccess ? itemsQuery.data.data : []

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
        onChange={handleFilter}
        centered
        TabIndicatorProps={{ sx: { display: breakPoint ? 'block' : 'none' } }}
        sx={{
          m: '30px',
          '& .MuiTabs-flexContainer': {
            flexWrap: 'wrap',
          },
        }}
      >
        <Tab label="All" value="all" />
        <Tab label="Bread" value="bread" />
        <Tab label="Pastry" value="pastry" />
      </Tabs>

      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="50px"
        columnGap="2%"
      >
        <AnimatePresence>
          {filterValue === 'all' &&
            items.map((item) => (
              <Item item={item} key={`${item.name}-${item.id}`} />
            ))}
          {filterValue === 'bread' &&
            breadItems.map((item) => (
              <Item item={item} key={`${item.name}-${item.id}`} />
            ))}
          {filterValue === 'pastry' &&
            pastryItems.map((item) => (
              <Item item={item} key={`${item.name}-${item.id}`} />
            ))}
        </AnimatePresence>
      </Box>
    </Box>
  )
}

export default ProductList
