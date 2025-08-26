import { createApi } from '@reduxjs/toolkit/query/react';
import routes from '../routes/routes.js';
import customBaseQuery from './customBaseQuery.js';

export const channelsApi = createApi ({
  reducerPath: 'channels',
  tagTypes: [ 'Channel' ],
  baseQuery: customBaseQuery(routes.channelsPath()),
  endpoints: builder => ({
    getChannels: builder.query({
      query: () => '',
      providesTags: ['Channel'],
    }),
    addChannel: builder.mutation({
      query: (channel) => ({
        method: 'POST',
        body: channel,
      }),
      invalidatesTags: ['Channel'],
    }),
    renameChannel: builder.mutation({
      query: ({ id, channel }) => ({
        url: id,
        method: 'PATCH',
        body: channel,
      }),
      invalidatesTags: ['Message'],
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

export const { useAddChannelMutation, useGetChannelsQuery, useRemoveChannelMutation, useEditChannelMutation } = channelsApi;