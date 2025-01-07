import { CommonModule, UpperCasePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EuroPipe } from './pipes/euro.pipe';
import { FormsModule } from '@angular/forms';
import { LifeComponent } from './components/life/life.component';
import { AutocompleterComponent } from './components/autocompleter/autocompleter.component';
import { HttpClient } from '@angular/common/http';

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
	http = inject(HttpClient);

	isFetchingConnectors = false;

	ngOnInit() {
		this.http.get<Connector[]>('http://localhost:3000/connectors').subscribe(connectors => {
			this.connectors = connectors;
		});
	}

	addConnector() {
		// this.connectors!.push(structuredClone(this.newConnector));

		this.http
			.post<Connector>('http://localhost:3000/connectors', this.newConnector)
			.subscribe(updatedConnector => {
				this.connectors?.push(updatedConnector);
			});

		this.newConnector = { reversable: false } as Connector;
	}

	handleAutocompleterSelect(connector: Connector) {
		console.log('yay! werkt!', connector);
	}

	// changeName() {
	//   setTimeout(() => {
	//     this.name += ' Youri na timeout';
	//   }, 2000);
	// }
}

interface Connector {
	name: string;
	reversable: boolean;
	type: string;
	photoUrl: string;
}
