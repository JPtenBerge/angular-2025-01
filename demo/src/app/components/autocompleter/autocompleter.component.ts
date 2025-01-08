import { JsonPipe } from '@angular/common';
import { Component, inject, input, OnInit, output } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { NavigateService } from '../../services/navigate.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';

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
		this.query.valueChanges
			.pipe(
				debounceTime(300),
				distinctUntilChanged()
			)
			.subscribe(x => this.autocomplete());
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
