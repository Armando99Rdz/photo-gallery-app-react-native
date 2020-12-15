/** define URL's para las peticiones a Web API */

const BASE_URL = 'https://picsum.photos'

/** get all photos (list) */
export async function getList(page = 1) {
  const response = await fetch(`${BASE_URL}/v2/list?page=${page}`)
  const photos = await response.json()
  return photos;
}

/** get a photo by id with dimentions */
export function formatPhotoUri(id, width, height) {
  return `${BASE_URL}/id/${id}/${Math.floor(width)}/${Math.floor(height)}`
}