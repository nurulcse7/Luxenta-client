import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getSocket = (): Socket => {
	if (!socket) {
		socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
			transports: ["websocket"],
		});

		socket.on("connect", () => {
			// console.log("Socket connected:", socket?.id);
		});

		socket.on("disconnect", () => {
			// console.log("Socket disconnected");
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
	if (socket) socket.on(event, callback);
};

export const unsubscribeEvent = (event: string) => {
	if (socket) socket?.off(event);
};
