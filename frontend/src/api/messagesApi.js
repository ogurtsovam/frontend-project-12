import { createApi } from '@reduxjs/toolkit/query/react';
import routes from '../routes/routes.js';
import customBaseQuery from './customBaseQuery.js';
import { socket } from './sockets/sockets.js'

export const messagesApi = createApi ({
  reducerPath: 'messages',
  tagTypes: [ 'Message' ],
  baseQuery: customBaseQuery(routes.messagesPath()),
  endpoints: builder => ({
    getMessages: builder.query({
      query: () => '',
      providesTags: ['Message'],
      async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
        try {
          await cacheDataLoaded;

          const handleNewMessage = (message) => {
            updateCachedData((draft) => {
              draft.push(message);
            });
          };

          const handleRenameMessage = (message) => {
            updateCachedData((draft) => {
              const index = draft.findIndex((m) => m.id === message.id);
              if (index !== -1) draft[index] = message;
            });
          };

          const handleRemoveMessage = ({ id }) => {
            updateCachedData((draft) => {
              const index = draft.findIndex((m) => m.id === id);
              if (index !== -1) draft.splice(index, 1);
            });
          };

          socket.on('newMessage', handleNewMessage);
          socket.on('renameMessage', handleRenameMessage);
          socket.on('removeMessage', handleRemoveMessage);
          await cacheEntryRemoved;
          socket.off('newMessage', handleNewMessage);
          socket.off('renameMessage', handleRenameMessage);
          socket.off('removeMessage', handleRemoveMessage);
        } catch (e) {
          console.error('Ошибка в onCacheEntryAdded', e);
        }
      },
    }),
    addMessage: builder.mutation({
      query: (message) => ({
        method: 'POST',
        body: message,
      }),
      invalidatesTags: ['Message'],
    }),
    renameMessage: builder.mutation({
      query: ({id, message}) => ({
        url: id,
        method: 'PATCH',
        body: message,
      }),
      invalidatesTags: ['Message'],
    }),
    removeMessage: builder.mutation({
      query: (id) => ({
        url: id,
        method: 'DELETE',
      }),
      invalidatesTags: ['Message'],
    }),
  }),
})

export const { useGetMessagesQuery, useAddMessageMutation, useRemoveMessageMutation, useEditMessageMutation } = messagesApi;
