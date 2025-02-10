import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddWorkoutComponent } from './components/add-workout/add-workout.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TableViewComponent } from './components/table-view/table-view.component';
import { ChartViewComponent } from './components/chart-view/chart-view.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [AppComponent, NavbarComponent, AddWorkoutComponent, TableViewComponent, ChartViewComponent],
      imports: [FormsModule,RouterTestingModule,NgxChartsModule], 
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;


    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

