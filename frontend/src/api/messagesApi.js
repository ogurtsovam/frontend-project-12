import { createApi } from '@reduxjs/toolkit/query/react';
import routes from '../routes/routes.js';
import customBaseQuery from './customBaseQuery.js';

export const messagesApi = createApi ({
  reducerPath: 'messages',
  tagTypes: [ 'Message' ],
  baseQuery: customBaseQuery(routes.messagesPath()),
  endpoints: builder => ({
    getMessages: builder.query({
      query: () => '',
      providesTags: ['Message'],
    }),
    addMessage: builder.mutation({
      query: (message) => ({
        method: 'POST',
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

export const { useGetMessagesQuery, useAddMessageMutation, useRemoveMessageMutation } = messagesApi;
