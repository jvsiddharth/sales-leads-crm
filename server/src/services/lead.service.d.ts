interface GetLeadsQuery {
    page?: string;
    status?: string;
    source?: string;
    search?: string;
    sort?: string;
}
export declare function getLeads(query: GetLeadsQuery): Promise<{
    leads: (import("mongoose").Document<unknown, {}, import("../models/lead.model.js").ILead, {}, import("mongoose").DefaultSchemaOptions> & import("../models/lead.model.js").ILead & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[];
    pagination: {
        total: number;
        page: number;
        pages: number;
        limit: number;
    };
}>;
interface CreateLeadPayload {
    name: string;
    email: string;
    status: "new" | "contacted" | "qualified" | "lost";
    source: "website" | "instagram" | "referral";
}
export declare function createLead(payload: CreateLeadPayload, userId: string): Promise<import("mongoose").Document<unknown, {}, import("../models/lead.model.js").ILead, {}, import("mongoose").DefaultSchemaOptions> & import("../models/lead.model.js").ILead & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>;
export declare function getLeadById(leadId: string): Promise<import("mongoose").Document<unknown, {}, import("../models/lead.model.js").ILead, {}, import("mongoose").DefaultSchemaOptions> & import("../models/lead.model.js").ILead & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>;
export declare function updateLead(leadId: string, payload: CreateLeadPayload): Promise<import("mongoose").Document<unknown, {}, import("../models/lead.model.js").ILead, {}, import("mongoose").DefaultSchemaOptions> & import("../models/lead.model.js").ILead & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>;
export declare function deleteLead(leadId: string): Promise<import("mongoose").Document<unknown, {}, import("../models/lead.model.js").ILead, {}, import("mongoose").DefaultSchemaOptions> & import("../models/lead.model.js").ILead & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>;
export {};
//# sourceMappingURL=lead.service.d.ts.map