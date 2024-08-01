import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { PreloadAllModules, provideRouter, withInMemoryScrolling, withPreloading } from '@angular/router';
import { provideStore } from '@ngxs/store';
import { routes } from './app.routes';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthState } from './auth/auth.state';
import { AirplaneState } from './domains/airplanes/airplane.state';
import { DestinationState } from './domains/destinations/destination.state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
      withPreloading(PreloadAllModules),
    ),
    provideHttpClient(
      withFetch(), 
      withInterceptors([AuthInterceptor]),
    ),
    provideStore([
      AuthState, 
      AirplaneState,
      DestinationState,
    ]),
  ],
};
