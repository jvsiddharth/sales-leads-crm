import { z } from "zod";

export const leadSchema =
  z.object({
    name: z
      .string()
      .min(2),

    email: z.string().email(),

    status: z.enum([
      "new",
      "contacted",
      "qualified",
      "lost",
    ]),

    source: z.enum([
      "website",
      "instagram",
      "referral",
    ]),
  });

export type LeadSchema =
  z.infer<typeof leadSchema>;