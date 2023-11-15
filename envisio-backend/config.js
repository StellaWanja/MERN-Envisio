import crypto from "crypto";

export const RANDOM_TOKEN = crypto.randomBytes(32).toString('hex');
