import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'euro' })
export class EuroPipe implements PipeTransform {
	transform(value: number | undefined | null) {
		if (value === undefined || value === null) {
			return value;
		}

		if (value.toString().includes('.')) {
			let [wholes, decimals] = value.toString().split('.');
			if (+decimals < 10) {
				return `€ ${wholes},${decimals}0`;
			}

			return `€ ${value.toString().replaceAll('.', ',')}`;
		}

		return `€ ${value.toString()},-`;
	}
}
