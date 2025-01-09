import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { Car } from '../../types/car';
import { CarViewerComponent } from '../../components/car-viewer/car-viewer.component';

@Component({
	selector: 'app-internals',
	imports: [CarViewerComponent],
	templateUrl: './internals.page.html',
	// changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InternalsPage {
	name = 'JP';
	cdr = inject(ChangeDetectorRef);

	cars: Car[] = [
		{ make: 'Opel', model: 'Astra' },
		{ make: 'Nissan', model: 'Cube' },
		{ make: 'Kia', model: 'Niro' },
	];

	addCar() {
		this.cars.push({ make: 'Honda', model: 'Acty' });
	}

	changeName() {
		console.log(window.setTimeout);
		setTimeout(() => {
			this.name = 'Tijmen';
			this.cdr.markForCheck();
		}, 1000);
	}

	move() {
		console.log('moving!');
	}

	move2() {
		console.log('moving 2!');
	}
}
