import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Connector } from '../types/connector';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConnectorDal {
	http = inject(HttpClient);
	source = new BehaviorSubject<Connector[]>([]);


	getAll() {
		this.http.get<Connector[]>('http://localhost:3000/connectors').subscribe(connectors => {
			console.log('nexting:', connectors);
			this.source.next(connectors);
		});


		return this.source;
	}

	add(newConnector: Omit<Connector, 'id'>) {
		this.http.post<Connector>('http://localhost:3000/connectors', newConnector).subscribe(updatedConnector => {
			this.source.next([...this.source.value, updatedConnector]);
		});
	}
}
