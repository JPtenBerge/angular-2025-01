import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Connector } from '../types/connector';

@Injectable({ providedIn: 'root' })
export class ConnectorDal {
	http = inject(HttpClient);

	getAll() {
		return this.http.get<Connector[]>('http://localhost:3000/connectors');
	}

	add(newConnector: Connector) {
		return this.http.post<Connector>('http://localhost:3000/connectors', newConnector);
	}
}
