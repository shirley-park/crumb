import { useQuery } from 'react-query'

async function getItems() {
  const items = await fetch('http://localhost:1337/api/items?populate=*', {
    method: 'GET',
  })
  const itemsJson = await items.json()
  return itemsJson
}

export const useItemsQuery = () => {
  const itemsQuery = useQuery(['items'], getItems, {})
  return itemsQuery
}
