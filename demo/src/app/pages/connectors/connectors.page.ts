import { Component, Inject, inject } from '@angular/core';
import { ConnectorDal } from '../../dal/connector.dal';
import { Connector } from '../../types/connector';
import { CommonModule } from '@angular/common';
import {
	AbstractControl,
	FormBuilder,
	FormControl,
	FormGroup,
	FormsModule,
	NonNullableFormBuilder,
	ReactiveFormsModule,
	UntypedFormGroup,
	Validators,
} from '@angular/forms';


function customValidator(c: AbstractControl) {
	return { message: '...' };
	return null;
}


@Component({
	imports: [CommonModule, FormsModule, ReactiveFormsModule],
	templateUrl: './connectors.page.html',
})
export class ConnectorsPage {
	newConnector = { reversable: false } as Connector;
	showLife = false;
	connectors?: Connector[];
	connectorDal = inject(ConnectorDal);

	fb = inject(NonNullableFormBuilder);

	addConnectorForm = this.fb.group({
		name: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9-]+$')]],
		type: ['', Validators.required],
		reversable: [false],
		photoUrl: ['', Validators.required],
	});

	get f() {
		return this.addConnectorForm.controls;
	}

	// addConnectorForm = new FormGroup({
	// 	name: new FormControl<string>('', {
	// 		nonNullable: true,
	// 		validators: [Validators.required, Validators.pattern('^[a-zA-Z0-9-]+$')],
	// 	}),
	// 	type: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
	// 	reversable: new FormControl<boolean>(false, { nonNullable: true }),
	// 	photoUrl: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
	// });

	ngOnInit() {
		this.connectorDal.getAll().subscribe(connectors => {
			this.connectors = connectors;
		});
	}

	addConnector() {
		this.connectorDal.add(this.newConnector).subscribe(updatedConnector => {
			this.connectors?.push(updatedConnector);
		});
		this.newConnector = { reversable: false } as Connector;
	}

	addConnectorReactive() {
		// this.addConnectorForm.reset(); // reset validators  NULL

		this.connectorDal.add(this.addConnectorForm.getRawValue()).subscribe(updatedConnector => {
			this.connectors?.push(updatedConnector);
		});
		this.newConnector = { reversable: false } as Connector;
	}
}
