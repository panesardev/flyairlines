import { isDevMode } from "@angular/core";

export const BRAND = 'FlyAirlines';

export const API_URL = isDevMode() ? 'http://localhost:3000' : 'https://iota-airlines-api.vercel.app';
