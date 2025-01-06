// jasmine BDD

import { EuroPipe } from './euro.pipe';

describe('Pipe: Euro', () => {
	let sut: EuroPipe;

	beforeEach(() => {
		sut = new EuroPipe();
	});

	it('handles undefined gracefully', () => {
		expect(sut.transform(undefined)).toBe(undefined); // Garbageg In, Garbage Out
	});

	it('handles null gracefully', () => {
		expect(sut.transform(null)).toBe(null); // Garbageg In, Garbage Out
	});

	it('formats whole numbers as euro currencies', () => {
		expect(sut.transform(12)).toBe('€ 12,-');
	});

	it('formats a number with decimals as euro currencies', () => {
		expect(sut.transform(12.34)).toBe('€ 12,34');
	});

	it('formats a number with one decimal as a euro currency', () => {
		expect(sut.transform(12.3)).toBe('€ 12,30');
	});
});

// falsy values:
// 0 null NaN undefined '' false -0 0n

// {} [] 'qdsgf' truthy
