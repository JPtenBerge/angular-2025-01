import { JsonPipe } from '@angular/common';
import { Component, inject, input, OnInit, output } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { NavigateService } from '../../services/navigate.service';
import {
	asyncScheduler,
	combineLatest,
	debounceTime,
	distinctUntilChanged,
	interval,
	map,
	merge,
	of,
	switchMap,
	throttleTime,
	timer,
} from 'rxjs';

@Component({
	selector: 'app-autocompleter',
	standalone: false,
	templateUrl: './autocompleter.component.html',
})
export class AutocompleterComponent<T extends {}> implements OnInit {
	query = new FormControl<string>('');
	data = input.required<T[]>();
	selectItem = output<T>();

	suggestions: T[] | null = null;
	highlightedSuggestionIndex: number | null = null;

	navigateService = inject(NavigateService);

	ngOnInit() {
		this.query.valueChanges.pipe(
			switchMap(value => 
			  merge(
				// Debounced stream
				of(value).pipe(
				  debounceTime(300),
				  map(v => ({ type: 'debounced', value: v }))
				),
				// Throttled stream
				of(value).pipe(
				  throttleTime(1000, asyncScheduler, { leading: true, trailing: true }),
				  map(v => ({ type: 'throttled', value: v }))
				)
			  )
			),
			switchMap(({ type, value }) => {
			  console.log(`Emitting ${type} value: ${value}`);
			  // Your logic here
			  return of(value);
			})
		  ).subscribe(result => {
			console.log('Final result:', result);
		  });

		// let autocompleter$ = this.query.valueChanges
		// 	.pipe(
		// 		debounceTime(300),
		// 		distinctUntilChanged()
		// 	);
		// 	let timer$ = interval(500);

		// 	autocompleter$.pipe(combineLatest(timer$)).subscribe(x => this.autocomplete());
	}

	autocomplete() {
		console.log('autocompleting!', this.query.value);
		if (this.query === null) {
			this.suggestions = null;
			return;
		}

		this.suggestions = [];

		for (let item of this.data()) {
			for (let [prop, value] of Object.entries(item)) {
				if (typeof value === 'string' && value.includes(this.query.value!)) {
					this.suggestions.push(item);
					break;
				}
			}
		}
	}

	next() {
		this.highlightedSuggestionIndex = this.navigateService.next(
			this.suggestions!,
			this.highlightedSuggestionIndex!,
		);
	}

	select() {
		if (this.highlightedSuggestionIndex === null || this.suggestions === null) {
			return;
		}
		let suggestion = this.suggestions[this.highlightedSuggestionIndex];
		this.selectItem.emit(suggestion);
	}
}
