import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, inject, input, OnInit } from '@angular/core';
import { Car } from '../../types/car';

@Component({
  selector: 'app-car-viewer',
  imports: [],
  templateUrl: './car-viewer.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarViewerComponent implements OnInit, DoCheck {
  cars = input.required<Car[]>();
  cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    this.cars()[0].make += 'q';
  }

  ngDoCheck() {
    console.log('carviewer docheck');

    if (this.cars().length % 5 === 0) {
      console.log('length:', this.cars().length);
      this.cdr.markForCheck();
    }
  }

  getDisplayValue(car: Car) {
    // car.make += 'w';
    return `${car.make} ${car.model}`;
  }
}
