import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, map, Observable, ReplaySubject, Subject, Subscription, takeUntil } from 'rxjs';

function withDestroy() {
	return class implements OnDestroy {
		destroy$ = new Subject<void>();

		ngOnDestroy(): void {
			this.destroy$.next();
			this.destroy$.complete();
		}
	};
}


@Component({
	imports: [],
	templateUrl: './rxjs.page.html',
})
export class RxjsPage extends withDestroy() implements OnInit {
	sub1!: Subscription;
	sub2!: Subscription;
	// Observables
	// - dingen die je kunt bekijken
	// - soort van async benaderen op een manier
	// - wordt o.a. gebruikt door Angular's HttpClient
	// - herkenbaar aan .subscribe(), vergelijkbaar met Promises die te herkennen aan .then()

	// func() - direct, synchrone met 1 result
	// Promise - asynchrone met 1 result - ideaal voor HTTP
	// Observable - asynchrone met meerdere results - ideaal voor WebSockets
	// - read-only
	ngOnInit() {
		let source$ = new BehaviorSubject<number>(765); // writable observable
		this.sub1 = source$
			.asObservable()
			.pipe(takeUntil(this.destroy$))
			.pipe(map(x => x * 10))
			.subscribe(value => console.log('value:', value));

		source$.next(4);
		source$.next(8);
		source$.next(15);

		this.sub2 = source$
			.asObservable()
			.subscribe(value => console.log('subscribe 2:', value));

		// Subjects:
		// - Subject<T>
		// - ReplaySubject<T> - volledige geschiedenis / hoeveel jij er wil onthouden
		// - BehaviorSubject<T> - onthoud specifiek 1 - de laatste - ReplaySubject(1)
	}
}
