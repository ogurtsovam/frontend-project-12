import { selectToken } from "../slices/authSlice"

const getAuthHeader = (state) => {
  const token = selectToken(state)
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export default getAuthHeader;

const getAuthHead = () => {
  const userId = JSON.parse(localStorage.getItem('userId'))

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` }
  }

  return {}
}