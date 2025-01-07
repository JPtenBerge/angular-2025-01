import { Component, Input, input, OnDestroy, OnInit, output } from '@angular/core';

@Component({
	selector: 'app-life',
	imports: [],
	templateUrl: './life.component.html',
})
export class LifeComponent implements OnInit, OnDestroy {
	intervalId!: ReturnType<typeof setInterval>;

	@Input() message2?: string;
	message = input<string>(); // Angular 16: SIGNALS

	constructor() {
		console.log('[life] constructor', this.message(), this.message2);
	}

	ngOnInit() {
		console.log('[life] ngOnInit', this.message(), this.message2);

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
