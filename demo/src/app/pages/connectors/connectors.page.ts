import { Component, inject } from '@angular/core';
import { ConnectorDal } from '../../dal/connector.dal';
import { Connector } from '../../types/connector';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
	imports: [CommonModule, FormsModule],
	templateUrl: './connectors.page.html',
})
export class ConnectorsPage {
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
}
