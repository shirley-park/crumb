import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setItems } from '../../state'

const ProductList = () => {
  const dispatch = useDispatch()
  const [value, setValue] = useState('all')

  const items = useSelector((state) => state.cart.items)
  console.log(items)

  const handleChange = (event, newValue) => {
    setValue(newValue)
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

  return <div>Bread!</div>
}

export default ProductList
