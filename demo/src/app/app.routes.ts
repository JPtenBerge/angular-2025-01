import { Routes } from '@angular/router';
import { ConnectorsPage } from './pages/connectors/connectors.page';
import { ZooiPage } from './pages/zooi/zooi.page';

export const routes: Routes = [
	{ path: 'connectors', component: ConnectorsPage },
	{ path: 'zooi/:id', component: ZooiPage },
	{ path: '', redirectTo: '/connectors', pathMatch: 'full' },
];
