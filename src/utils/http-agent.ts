import { Agent } from "undici";

export const insecureAgent = new Agent({
    connect: {
        rejectUnauthorized: false,
    },
});
