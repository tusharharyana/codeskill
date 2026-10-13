"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AppGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
let AppGateway = AppGateway_1 = class AppGateway {
    server;
    logger = new common_1.Logger(AppGateway_1.name);
    handleConnection(client) {
        this.logger.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    handleJoinContest(data, client) {
        const { contestId, userId } = data;
        if (contestId && userId) {
            const roomName = `contest_${contestId}`;
            client.join(roomName);
            this.logger.log(`User ${userId} joined room ${roomName}`);
            client.to(roomName).emit('user_joined', { userId });
        }
    }
    handleLeaveContest(data, client) {
        const { contestId, userId } = data;
        if (contestId && userId) {
            const roomName = `contest_${contestId}`;
            client.leave(roomName);
            this.logger.log(`User ${userId} left room ${roomName}`);
            client.to(roomName).emit('user_left', { userId });
        }
    }
    handleJoinUser(data, client) {
        const { userId } = data;
        if (userId) {
            const roomName = `user_${userId}`;
            client.join(roomName);
            this.logger.log(`User ${userId} joined room ${roomName}`);
        }
    }
    broadcastToContest(contestId, event, data) {
        const roomName = `contest_${contestId}`;
        this.server.to(roomName).emit(event, data);
    }
    emitToUser(userId, event, data) {
        const roomName = `user_${userId}`;
        this.server?.to(roomName).emit(event, data);
    }
};
exports.AppGateway = AppGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], AppGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('join_contest'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], AppGateway.prototype, "handleJoinContest", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leave_contest'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], AppGateway.prototype, "handleLeaveContest", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('join_user'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], AppGateway.prototype, "handleJoinUser", null);
exports.AppGateway = AppGateway = AppGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    })
], AppGateway);
//# sourceMappingURL=app.gateway.js.map