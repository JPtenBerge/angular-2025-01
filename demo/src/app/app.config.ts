import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
// import { NavigateService } from './services/navigate.service';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		// { provide: NavigateService, useClass: NavigateService },
		// NavigateService,
	],
	// DI  globale instellingen  errorhandler locale interceptors
};
