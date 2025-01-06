import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
	selector: 'app-life',
	imports: [],
	templateUrl: './life.component.html',
})
export class LifeComponent implements OnInit, OnDestroy {
	intervalId!: ReturnType<typeof setInterval>;

	constructor() {
		console.log('[life] constructor');
	}

	ngOnInit() {
		console.log('[life] ngOnInit');

		this.intervalId = setInterval(() => {
			console.log('interval!');
		}, 1000);
	}

	ngOnDestroy() {
		console.log('[life] ngOnDestroy met clear');

		clearInterval(this.intervalId);

		// dingen opruimen: alles wat je vanuit JS aanmaakt
		// - caches  / Indexed Database
		// - WebSocket-verbinding
		// - camera API
		// - bluetooth
		// - navigator.geolocation.watchPosition()
		// - Observables  .subscribe()   .unsubscribe() / async / RxJS-operator takeUntil()
		// - timouts/intervals

		
	}
}
