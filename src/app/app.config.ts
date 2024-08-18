import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { PreloadAllModules, provideRouter, withInMemoryScrolling, withPreloading } from '@angular/router';
import { withNgxsRouterPlugin } from '@ngxs/router-plugin';
import { provideStore } from '@ngxs/store';
import { routes } from './app.routes';
import { states } from './app.states';
import { AuthInterceptor } from './auth/auth.interceptor';

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
    provideStore(
      states,
      withNgxsRouterPlugin(),
    ),
  ],
};
