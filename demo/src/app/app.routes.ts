import { Routes } from '@angular/router';
import { ConnectorsPage } from './pages/connectors/connectors.page';
import { ZooiPage } from './pages/zooi/zooi.page';
import { RxjsPage } from './pages/rxjs/rxjs.page';
import { InternalsPage } from './pages/internals/internals.page';

export const routes: Routes = [
	{ path: 'connectors', component: ConnectorsPage },
	{ path: 'zooi/:id', component: ZooiPage },
	{ path: 'rxjs', component: RxjsPage },
	{ path: 'internals', component: InternalsPage },
	{ path: '', redirectTo: '/connectors', pathMatch: 'full' },
];
