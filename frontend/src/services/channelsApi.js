import { createApi } from '@reduxjs/toolkit/query/react';
import getRoute from '../routes/routes';
import getBaseQuery from './getBaseQuery';
import socket from '../socket/socket';

const channelsApi = createApi({
  reducerPath: 'channels',
  baseQuery: getBaseQuery(getRoute.channelsPath()),
  tagTypes: ['Channel'],
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => '',
      providesTags: ['Channel'],
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        await cacheDataLoaded;
        const addChannelListener = (data) => (updateCachedData((draft) => {
          draft.push(data);
        }));
        const removeChannelListener = ({ id }) => (updateCachedData((draft) => {
          const index = draft.findIndex((el) => el.id === id);
          if (index !== -1) {
            draft.splice(index, 1);
          }
        }));
        const renameChannelListener = ({ id, name }) => (updateCachedData((draft) => {
          const channel = draft.find((c) => c.id === id);
          if (channel) {
            channel.name = name;
          }
        }));
        socket.on('newChannel', addChannelListener);
        socket.on('removeChannel', removeChannelListener);
        socket.on('renameChannel', renameChannelListener);
        await cacheEntryRemoved;
        socket.off('newChannel', addChannelListener);
        socket.off('removeChannel', removeChannelListener);
        socket.off('renameChannel', renameChannelListener);
      },
    }),
    addChannel: builder.mutation({
      query: (channel) => ({
        method: 'POST',
        body: channel,
      }),
      
    }),
    updateChannel: builder.mutation({
      query: ({ id, ...body }) => ({
        method: 'PATCH',
        url: id,
        body,
      }),
      invalidatesTags: ['Channel'],
    }),
    deleteChannel: builder.mutation({
      query: (id) => ({
        method: 'DELETE',
        url: id,
      }),
      invalidatesTags: ['Channel'],
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useDeleteChannelMutation,
  useUpdateChannelMutation,
} = channelsApi;

export default channelsApi;