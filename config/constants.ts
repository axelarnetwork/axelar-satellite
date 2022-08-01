import { Environment } from "../utils/enums";

export const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT as Environment;
export const SOCKET_API = process.env.NEXT_PUBLIC_SOCKET_API as string;

export const AXELARSCAN_URL = process.env.NEXT_PUBLIC_AXELARSCAN_URL as string;
