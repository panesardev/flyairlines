import { isDevMode } from "@angular/core";

export const BRAND = 'FlyAirlines';

export const API_URL = isDevMode() ? 'http://localhost:3000' : 'https://flyairlines-api.vercel.app';
