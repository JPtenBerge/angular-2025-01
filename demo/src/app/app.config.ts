import { ApplicationConfig, NgZone, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter, RouterModule, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { provideTanStackQuery, QueryClient } from '@tanstack/angular-query-experimental';
// import { NavigateService } from './services/navigate.service';

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes, withComponentInputBinding()),
		provideHttpClient(),
		provideExperimentalZonelessChangeDetection(),
		provideTanStackQuery(new QueryClient())
		// hip nieuw Angular werkt met provide...()
		// HttpClientModule,
		// RouterModule

		// { provide: NavigateService, useClass: NavigateService },
		// NavigateService,
	],
	// DI  globale instellingen  errorhandler locale interceptors
};
