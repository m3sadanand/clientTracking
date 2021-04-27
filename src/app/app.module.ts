import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, RoutesRecognized } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { routes } from "./app-routing.module";
import { OpenTripsComponent } from './components/open-trips/open-trips.component';
import { MatTableModule } from '@angular/material'  
import { MatPaginatorModule } from '@angular/material';
import { AgmCoreModule } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatDialogModule} from '@angular/material/dialog';
import { HeaderComponent } from './components/header/header.component';
import { LogoutComponent } from './logout/logout.component';
import { AgmDirectionModule } from 'agm-direction';
import { HashLocationStrategy, LocationStrategy  } from '@angular/common';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    MatTableModule,
    MatPaginatorModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA1Mf8fmcI-E_WR2231oEJvXtnYfmSbjXU'
    }),
    NgbModule,
    MatDialogModule,
    AgmDirectionModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    OpenTripsComponent,
    HeaderComponent,
    LogoutComponent
  ],
  providers: [{provide : LocationStrategy , useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
