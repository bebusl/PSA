import io from "socket.io-client";
const SOCKET_URL = process.env.REACT_APP_WEBSOCKET_SERVER;

const socket = io(SOCKET_URL);

export default socket;
