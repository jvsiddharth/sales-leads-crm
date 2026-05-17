import { z } from "zod";
export declare const createLeadSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    status: z.ZodEnum<{
        new: "new";
        contacted: "contacted";
        qualified: "qualified";
        lost: "lost";
    }>;
    source: z.ZodEnum<{
        website: "website";
        instagram: "instagram";
        referral: "referral";
    }>;
}, z.core.$strip>;
//# sourceMappingURL=lead.validator.d.ts.map