import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EuroPipe } from './pipes/euro.pipe';
import { LifeComponent } from './components/life/life.component';
import { AutocompleterComponent } from './components/autocompleter/autocompleter.component';
import { ConnectorDal } from './dal/connector.dal';
import { Connector } from './types/connector';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, CommonModule, FormsModule, EuroPipe, LifeComponent, AutocompleterComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
	newConnector = { reversable: false } as Connector;
	showLife = false;
	connectors?: Connector[];
	connectorDal = inject(ConnectorDal);

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

	handleAutocompleterSelect(connector: Connector) {
		console.log('yay! werkt!', connector);
	}
}
