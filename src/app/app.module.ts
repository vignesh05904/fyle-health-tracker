import { ApplicationConfig, NgModule } from '@angular/core';
import { BrowserModule, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AddWorkoutComponent } from './components/add-workout/add-workout.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TableViewComponent } from './components/table-view/table-view.component';
import { ChartViewComponent } from './components/chart-view/chart-view.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    AddWorkoutComponent,
    TableViewComponent,
    ChartViewComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxChartsModule
  ],
  providers: [
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
