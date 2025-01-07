import { JsonPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-autocompleter',
	imports: [JsonPipe, FormsModule],
	templateUrl: './autocompleter.component.html',
})
export class AutocompleterComponent<T extends {}> {
	query: string | null = null;
	data = input.required<T[]>();
	selectItem = output<T>();

	suggestions: T[] | null = null;
	highlightedSuggestionIndex: number | null = null;

	autocomplete() {
		if (this.query === null) {
			this.suggestions = null;
			return;
		}

		this.suggestions = [];

		for (let item of this.data()) {
			for (let [prop, value] of Object.entries(item)) {
				if (typeof value === 'string' && value.includes(this.query)) {
					this.suggestions.push(item);
					break;
				}
			}
		}
	}

	next() {
		this.highlightedSuggestionIndex ??= -1;
		this.highlightedSuggestionIndex =
			(this.highlightedSuggestionIndex + 1) % this.suggestions!.length;
	}

	select() {
		if (
			this.highlightedSuggestionIndex === null ||
			this.suggestions === null
		) {
			return;
		}
		let suggestion = this.suggestions[this.highlightedSuggestionIndex];
		this.selectItem.emit(suggestion);
	}
}
