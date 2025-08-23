import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../routes/routes.js';
import customBaseQuery from './customBaseQuery.js';

export const channelsApi = createApi ({
  reducerPath: 'channels',
  tagTypes: [ 'Channel' ],
  baseQuery: customBaseQuery(routes.channelsPath()),
  endpoints: builder => ({
    getChannels: builder.query({
      query: () => '',
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Channel', id })), 'Channel']
          : ['Channel'],
    }),
    addChannel: builder.mutation({
      query: (task) => ({
        method: 'POST',
        body: task,
      }),
      invalidatesTags: ['Channel'],
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: id,
        method: 'DELETE',
      }),
      invalidatesTags: ['Channel'],
    }),
  }),
})

export const { useAddChannelMutation, useGetChannelsQuery, useRemoveChannelMutation } = channelsApi;