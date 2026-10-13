import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private readonly logger;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleJoinContest(data: any, client: Socket): void;
    handleLeaveContest(data: any, client: Socket): void;
    handleJoinUser(data: any, client: Socket): void;
    broadcastToContest(contestId: string, event: string, data: any): void;
    emitToUser(userId: string, event: string, data: any): void;
}
