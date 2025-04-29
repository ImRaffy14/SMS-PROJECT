import { Server, Socket } from 'socket.io';

export default function registerSocketHandlers(io: Server) {
    io.on('connection', (socket: Socket) => {
        console.log(`User connected: ${socket.id}`);
    
        // Handle incoming messages from the client
        
        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });
}