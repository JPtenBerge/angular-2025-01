import { NavigateService } from './navigate.service';

describe('Service: Navigate', () => {
	let sut: NavigateService;
	let data: { x: string }[];

	beforeEach(() => {
		data = [{ x: 'hoi' }, { x: 'heuj' }, { x: 'hallo' }];
		sut = new NavigateService();
	});

	it('nexts to the first suggestion when nothing is highlighted', () => {
		let result = sut.next(data, null);
		expect(result).toBe(0);
	});

	it('nexts to the second suggestion when the first suggestion is highlighted', () => {
		let result = sut.next(data, 0);
		expect(result).toBe(1);
	});

	it('nexts to the first suggestion when the last suggestion is highlighted', () => {
		let result = sut.next(data, data.length - 1);
		expect(result).toBe(0);
	});
});
