import { createApi } from '@reduxjs/toolkit/query/react'
import routes from '../routes/routes.js'
import customBaseQuery from './customBaseQuery.js'
import { socket } from './sockets/sockets.js'

export const channelsApi = createApi ({
  reducerPath: 'channels',
  tagTypes: [ 'Channel' ],
  baseQuery: customBaseQuery(routes.channelsPath()),
  endpoints: builder => ({
    getChannels: builder.query({
      query: () => '',
      providesTags: ['Channel'],
      async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
        try {
          await cacheDataLoaded

          const handleNewChannel = (channel) => {
            updateCachedData((draft) => {
              draft.push(channel)
            })
          }

          const handleRenameChannel = (channel) => {
            updateCachedData((draft) => {
              const index = draft.findIndex(c => c.id === channel.id)
              if (index !== -1) draft[index] = channel
            })
          }

          const handleRemoveChannel = ({ id }) => {
            updateCachedData((draft) => {
              const index = draft.findIndex(m => m.id === id)
              if (index !== -1) draft.splice(index, 1)
            })
          }

          socket.on('newChannel', handleNewChannel)
          socket.on('renameChannel', handleRenameChannel)
          socket.on('removeChannel', handleRemoveChannel)
          await cacheEntryRemoved
          socket.off('newChannel', handleNewChannel)
          socket.off('renameChannel', handleRenameChannel)
          socket.off('removeChannel', handleRemoveChannel)
        }
        catch (e) {
          console.error('Ошибка в onCacheEntryAdded', e)
        }
      },
    }),
    addChannel: builder.mutation({
      query: channel => ({
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
      query: id => ({
        url: id,
        method: 'DELETE',
      }),
      invalidatesTags: ['Channel'],
    }),
  }),
})

export const { useAddChannelMutation, useGetChannelsQuery, useRemoveChannelMutation, useRenameChannelMutation } = channelsApi
