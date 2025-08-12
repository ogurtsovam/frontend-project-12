import { createApi } from '@reduxjs/toolkit/query/react';
import getRoute from '../routes';
import getBaseQuery from './getBaseQuery';

const channelsApi = createApi ({
  reducerPath: 'channels',
  baseQuery: getBaseQuery( getRoute.channelsPath() ),
  tagTypes: ['Channel'],
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => '',
      providesTags: ['Channel'],
    })
  })
})

export default channelsApi;