import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Channels from '../Components/chat/Channels.jsx';
import Messages from '../Components/chat/Messages.jsx';
import {
  useAddChannelMutation,
  useDeleteChannelMutation,
  useGetChannelsQuery,
  useUpdateChannelMutation,
} from '../services/channelsApi.js';
import { useAddMessageMutation, useGetMessagesQuery } from '../services/messagesApi.js';
import Spinner from '../Components/Spinner.jsx';

const ChatPage = () => {
  const { isLoading: isGettingChannels } = useGetChannelsQuery();
  const { isLoading: isGettingMessages } = useGetMessagesQuery();
  const [{ isLoading: isAddingChannel }] = useAddChannelMutation();
  const [{ isLoading: isAddingMessages }] = useAddMessageMutation();
  const [{ isLoading: isRemovingChannel }] = useDeleteChannelMutation();
  const [{ isLoading: isRenamingChannel }] = useUpdateChannelMutation();

  const isLoading = [
    isGettingChannels,
    isGettingMessages,
    isAddingChannel,
    isRemovingChannel,
    isRenamingChannel,
    isAddingMessages].some(Boolean);
  if (isLoading) {
    return  <Spinner />;
  }

  return (
    <>
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
          <Channels />
          <Messages />
        </Row>
      </Container>
    </>
  );
};

export default ChatPage;