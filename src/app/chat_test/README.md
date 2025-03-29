# Group Chat Implementation

This is a sample group chat implementation using Socket.io that integrates with the backend chat server.

## Features

- Real-time messaging using Socket.io
- Room-based chat functionality
- User authentication via JWT
- Message history with automatic scrolling
- UI indicators for connection status
- Error handling for connection issues

## How to Use

1. Navigate to `/chat_test/[room-id]` where `[room-id]` is the ID of the room you want to join
2. The chat will automatically connect to the Socket.io server defined in your environment variables
3. You can switch between chat rooms using the room buttons
4. Type your message in the input field and press "Send" or hit Enter

## Authentication

The chat uses JWT tokens for authentication. Make sure you have a valid token stored in `localStorage` under the key `token`. If no token is available, a test token will be used for demonstration purposes.

## Backend Integration

This frontend component is designed to work with the Socket.io server implementation in the backend. The backend handles:

- User authentication
- Room membership verification
- Message broadcasting
- Connection management

## Events

The chat component uses the following Socket.io events:

- `connect`: Established when the Socket.io connection is successful
- `connect_error`: Triggered when there's an error connecting to the server
- `error`: Custom errors sent from the server
- `joinRoom`: Sent to the server when joining a chat room
- `leaveRoom`: Sent to the server when leaving a chat room
- `chatMessage`: Sent to the server when sending a message
- `message`: Received from the server when there's a new message

## Implementation Notes

- The component handles both system messages and user messages
- Messages are displayed differently based on the sender (current user vs others)
- The chat automatically scrolls to the bottom when new messages arrive 