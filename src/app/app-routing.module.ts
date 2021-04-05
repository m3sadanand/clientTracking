import { NgModule} from '@angular/core';
import { Routes , RouterModule } from '@angular/router';
import { OpenTripsComponent } from './components/open-trips/open-trips.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './_guards/auth.guards'

export const routes: Routes = [
    { path: '',   redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent},
    { path: 'opentrips', component: OpenTripsComponent, canActivate: [AuthGuard]},
    { path: 'logout', component: LogoutComponent},
    { path: '**', component: PageNotFoundComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }