import { useQuery } from 'react-query'

async function getItem(itemId) {
  const item = await fetch(
    `http://localhost:1337/api/items/${itemId}?populate=image`,
    {
      method: 'GET',
    }
  )
  const itemJson = await item.json()
  return itemJson.data
}

export const useItemQuery = (itemId) => {
  const itemQuery = useQuery(['item', itemId], () => getItem(itemId), {
    enabled: !!itemId,
  })
  return itemQuery
}
