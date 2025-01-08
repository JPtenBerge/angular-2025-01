import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleterComponent } from './autocompleter.component';
import { NavigateService } from '../../services/navigate.service';
import { of } from 'rxjs';

interface ExampleData {
	x?: string | undefined | number;
	y?: string;
}

describe('AutocompleterComponent', () => {
	let fixture: ComponentFixture<AutocompleterComponent<ExampleData>>;
	let sut: AutocompleterComponent<ExampleData>;
	let navigateServiceMock: jasmine.SpyObj<NavigateService>;

	beforeEach(() => {
		navigateServiceMock = jasmine.createSpyObj<NavigateService>('NavigateServiceMock', ['next']);

		TestBed.configureTestingModule({
			providers: [{ provide: NavigateService, useValue: navigateServiceMock }],
			imports: [AutocompleterComponent],
		});

		fixture = TestBed.createComponent(AutocompleterComponent<ExampleData>);
		sut = fixture.componentInstance;
	});

	it('autocompletes a list of suggestions with a basic query', () => {
		sut.query = 'o';
		fixture.componentRef.setInput('data', [{ x: 'hoi' }, { x: 'heuj' }, { x: 'hallo' }]);

		sut.autocomplete();

		expect(sut.suggestions).toEqual([{ x: 'hoi' }, { x: 'hallo' }]);
	});

	it('does not offer/clear suggestions with no query', () => {
		sut.query = null;
		fixture.componentRef.setInput('data', [{ x: 'hoi' }, { x: 'heuj' }, { x: 'hallo' }]);

		sut.autocomplete();

		expect(sut.suggestions).toBeNull();
	});

	it('adds suggestions uniquely', () => {
		sut.query = 'o';
		fixture.componentRef.setInput('data', [
			{ x: 'hoi', y: 'hallo' },
			{ x: 'heuj', y: 'aha' },
			{ x: 'hallo', y: 'whiiii' },
		]);

		sut.autocomplete();

		expect(sut.suggestions).toEqual([
			{ x: 'hoi', y: 'hallo' },
			{ x: 'hallo', y: 'whiiii' },
		]);
	});

	it('adds handles different datatypes gracefully', () => {
		sut.query = 'o';
		fixture.componentRef.setInput('data', [
			{ x: undefined, y: 'hallo' },
			{ x: 42, y: 'aha' },
			{ x: null, y: 'whiiii' },
		]);

		sut.autocomplete();

		expect(sut.suggestions).toEqual([{ x: undefined, y: 'hallo' }]);
	});

	it(`uses ${NavigateService.name} for nexting`, () => {
		navigateServiceMock.next.and.returnValue(42);
		sut.next();
		expect(navigateServiceMock.next).toHaveBeenCalled();
		expect(sut.highlightedSuggestionIndex).toBe(42);
	});

	it('selects suggestions', () => {
		sut.query = 'o';
		fixture.componentRef.setInput('data', [{ x: 'hoi' }, { x: 'heuj' }, { x: 'hallo' }]);
		sut.autocomplete();
		sut.next();
		spyOn(sut.selectItem, 'emit');

		sut.select();

		expect(sut.selectItem.emit).toHaveBeenCalledTimes(1);
	});

	it('does not select if nothing has been highlighted', () => {
		sut.query = 'o';
		fixture.componentRef.setInput('data', [{ x: 'hoi' }, { x: 'heuj' }, { x: 'hallo' }]);
		spyOn(sut.selectItem, 'emit');

		sut.select();

		expect(sut.selectItem.emit).not.toHaveBeenCalled();
	});
});

/*

1. Schrijf een test
2. Run de test en zie dattie faalt
3. Code schrijven
4. Run de test/alle tests en zie dattie slaagt
5. Refactor

RED-GREEN-REFACTOR

Repeat.

*/
