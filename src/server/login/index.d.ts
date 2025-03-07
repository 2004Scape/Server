interface LoginResponse {
    type: string;
    username: string;
    socket: string;
    reply: number;
    lowMemory: boolean;
    reconnecting: boolean;
    staffmodlevel?: number;
    muted_until?: any | null;
    save: Uint8Array | null;
    account_id: number;
    members: boolean;
    messageCount?: number;
}

interface LogoutResponse {
    type: string;
    username: string;
    success: boolean;
}

export type GenericLoginThreadResponse = LoginResponse | LogoutResponse;

export function isPlayerLoginResponse(response: LoginResponse | LogoutResponse): response is LoginResponse {
    return response.type === 'player_login';
}

export function isPlayerLogoutResponse(response: LoginResponse | LogoutResponse): response is LogoutResponse {
    return response.type === 'player_logout';
}
