import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouterModule, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
// import { NavigateService } from './services/navigate.service';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes, withComponentInputBinding()),
		provideHttpClient(),

		// hip nieuw Angular werkt met provide...()
		// HttpClientModule,
		// RouterModule

		// { provide: NavigateService, useClass: NavigateService },
		// NavigateService,
	],
	// DI  globale instellingen  errorhandler locale interceptors
};
