import { Component, inject, input } from '@angular/core';
import { ConnectorDal } from '../../dal/connector.dal';
import { Connector } from '../../types/connector';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LifeComponent } from '../../components/life/life.component';
import { AutocompleterComponent } from '../../components/autocompleter/autocompleter.component';
import { ActivatedRoute } from '@angular/router';

@Component({
	imports: [CommonModule, FormsModule, LifeComponent, AutocompleterComponent],
	templateUrl: './zooi.page.html',
})
export class ZooiPage {
	newConnector = { reversable: false } as Connector;
	showLife = false;
	connectors?: Connector[];
	connectorDal = inject(ConnectorDal);
	route = inject(ActivatedRoute);

	id = input.required<string>();

	constructor() {
		console.log('constructor zooi');
	}

	ngOnInit() {
		console.log('oninit zooi', this.id());

		// this.route.params.subscribe(p => {
		// 	console.log('params:', p);
		// })

		this.connectorDal.getAll().subscribe(connectors => {
			this.connectors = connectors;
		});
	}

	handleAutocompleterSelect(connector: Connector) {
		console.log('yay! werkt!', connector);
	}
}
