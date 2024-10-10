export default class LoginResponse {
    static readonly SUCCESSFUL: Uint8Array = Uint8Array.from([2]);
    static readonly INVALID_USER_OR_PASS: Uint8Array = Uint8Array.from([3]); // Invalid username or password.
    static readonly ACCOUNT_DISABLED: Uint8Array = Uint8Array.from([4]); // Your account has been disabled.
    static readonly LOGGED_IN: Uint8Array = Uint8Array.from([5]); // Your account is already logged in.
    static readonly SERVER_UPDATED: Uint8Array = Uint8Array.from([6]); // RuneScape has been updated!
    static readonly WORLD_FULL: Uint8Array = Uint8Array.from([7]); // This world is full.
    static readonly LOGIN_SERVER_OFFLINE: Uint8Array = Uint8Array.from([8]); // Unable to connect.
    static readonly LOGIN_LIMIT_EXCEEDED: Uint8Array = Uint8Array.from([9]); // Login limit exceeded.
    static readonly UNABLE_TO_CONNECT: Uint8Array = Uint8Array.from([10]); // Unable to connect.
    static readonly LOGIN_REJECTED: Uint8Array = Uint8Array.from([11]); // Login server rejected session.
    static readonly NEED_MEMBERS_ACCOUNT: Uint8Array = Uint8Array.from([12]); // You need a members account to login to this world.
    static readonly COULD_NOT_COMPLETE: Uint8Array = Uint8Array.from([13]); // Could not complete login.
    static readonly SERVER_UPDATING: Uint8Array = Uint8Array.from([14]); // The server is being updated.
    static readonly RECONNECTING: Uint8Array = Uint8Array.from([15]);
    static readonly LOGIN_ATTEMPTS_EXCEEDED: Uint8Array = Uint8Array.from([16]); // Login attempts exceeded.
    static readonly STANDING_IN_MEMBERS: Uint8Array = Uint8Array.from([17]); // You are standing in a members-only area.
    static readonly STAFF_MOD_LEVEL: Uint8Array = Uint8Array.from([18]);
}
