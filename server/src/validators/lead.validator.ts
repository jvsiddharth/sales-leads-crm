import { z } from "zod";

export const createLeadSchema =
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