import { JsonPipe } from '@angular/common';
import { Component, computed, effect, linkedSignal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { injectMutation, injectQuery } from '@tanstack/angular-query-experimental';
import { Subject } from 'rxjs';

@Component({
	imports: [JsonPipe],
	templateUrl: './signaltjes.page.html',
})
export class SignaltjesPage {

	getal = signal(42);

	dinges = linkedSignal(() => this.getal() * 3);

	verdubbelaar = computed(() => {
		let dubbel = this.getal() * 2;
		// this.mijnCustomSignal.set(dubbel * 4);
		return dubbel;
	});

	mijnCustomSignal = signal(10);

	connectorsQuery = injectQuery(() => ({
		queryKey: ['connectors'],
		queryFn: () => fetch('http://localhost:3000/connectors').then(x => x.json())
	}));

	// injectMutation(() => ({
	// 	onsuc
	// }))

	constructor() {

		// this.mijnDal.getIets()()

		toSignal(new Subject<number>())

		effect(() => {
			let getal = this.getal();
			
			this.mijnCustomSignal.set(getal);
		});
	}

	optellinator() {
		this.getal.set(108);
	}

	verhoogDinges() {
		this.dinges.set(45678);

	}
}
