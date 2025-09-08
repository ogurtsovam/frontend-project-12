import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const customBaseQuery = baseUrl =>
  fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  })

export default customBaseQuery
