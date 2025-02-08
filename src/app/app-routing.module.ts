import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddWorkoutComponent } from './components/add-workout/add-workout.component';
import { TableViewComponent } from './components/table-view/table-view.component';
import { ChartViewComponent } from './components/chart-view/chart-view.component';

const routes: Routes = [
  {path: '', redirectTo: '/table-view', pathMatch: 'full' },

  {path: 'table-view', component: TableViewComponent},
  {path: 'chart-view', component: ChartViewComponent},

  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
