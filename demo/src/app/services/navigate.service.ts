import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NavigateService {
	next<T>(data: T[], highlightedIndex: number | null) {
		console.log('nexting');
		highlightedIndex ??= -1;
		return (highlightedIndex + 1) % data.length;
	}
}
