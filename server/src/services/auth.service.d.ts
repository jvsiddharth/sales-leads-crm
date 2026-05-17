interface RegisterPayload {
    name: string;
    email: string;
    password: string;
}
interface LoginPayload {
    email: string;
    password: string;
}
export declare function registerUser(payload: RegisterPayload): Promise<{
    token: string;
    user: {
        id: import("mongoose").Types.ObjectId;
        name: string;
        email: string;
        role: import("../models/user.model.js").UserRole;
    };
}>;
export declare function loginUser(payload: LoginPayload): Promise<{
    token: string;
    user: {
        id: import("mongoose").Types.ObjectId;
        name: string;
        email: string;
        role: import("../models/user.model.js").UserRole;
    };
}>;
export {};
//# sourceMappingURL=auth.service.d.ts.map