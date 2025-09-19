import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const connectSocket = (url?: string) => {
	if (!socket) {
		socket = io(url || window.location.origin, {
			transports: ["websocket"],
		});
	}
	return socket;
};

export const disconnectSocket = () => {
	if (socket) {
		socket.disconnect();
		socket = null;
	}
};

export const subscribeEvent = (
	event: string,
	callback: (data: any) => void
) => {
	if (socket) {
		socket.on(event, callback);
	}
};

export const unsubscribeEvent = (event: string) => {
	if (socket) {
		socket.off(event);
	}
};
