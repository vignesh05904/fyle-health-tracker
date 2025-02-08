import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartViewComponent } from './chart-view.component';
import { WorkoutApiService } from '../../services/workout-api.service';
import { of } from 'rxjs';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';

describe('ChartViewComponent', () => {
  let component: ChartViewComponent;
  let fixture: ComponentFixture<ChartViewComponent>;
  let mockWorkoutApiService: jasmine.SpyObj<WorkoutApiService>;

  const mockUserData = [
    { id: 1, name: 'Alice', workouts: [{ type: 'Running', minutes: 30 }] },
    { id: 2, name: 'Bob', workouts: [{ type: 'Cycling', minutes: 45 }] }
  ];

  beforeEach(async () => {
    mockWorkoutApiService = jasmine.createSpyObj('WorkoutApiService', ['userData$']);
    mockWorkoutApiService.userData$ = of(mockUserData); // Mock observable data

    await TestBed.configureTestingModule({
      declarations: [ChartViewComponent],
      imports: [NgxChartsModule],  // ✅ Import NgxChartsModule for chart support
      providers: [
        { provide: WorkoutApiService, useValue: mockWorkoutApiService },
        provideNoopAnimations()  // ✅ Disable animations in tests to fix NG05105 error
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ChartViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize user data and select the first user', () => {
    expect(component.userData.length).toBe(2);
    expect(component.selectedUser).toBeDefined();
  });

  it('should update the chart when selecting a user', () => {
    component.onSelectUser(2);
    fixture.detectChanges();
    expect(component.selectedUser.id).toBe(2);
    expect(component.chartData.length).toBe(1);
  });

  it('should clean up on destroy', () => {
    const unsubscribeSpy = spyOn(component['unsubscribe$'], 'next');
    const completeSpy = spyOn(component['unsubscribe$'], 'complete');

    component.ngOnDestroy();

    expect(unsubscribeSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });


  it('Should call chartResposive on window resize', () => {
    spyOn(component, 'chartResposive');

    // Simulating an window resize event.
    const fakeEvent = { target: { innerWidth: 1024 } };
    component.onResize(fakeEvent);

    expect(component.chartResposive).toHaveBeenCalledOnceWith(1024);
  });


  it('Should set chartWdith to 340 to set showLegend to fasle when width is <=600', () => {
   component.chartResposive(500) // Simulating an screen width of 500
   expect(component.chartWidth).toBe(340);
   expect(component.showLegend).toBeFalse();
  });

});
