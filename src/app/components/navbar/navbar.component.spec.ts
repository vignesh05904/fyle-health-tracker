import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });
  
  afterEach(()=> {
    component.ngOnDestroy();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should toggle isMenuOpen', () => {
    component.toggleMenu();
    expect(component.isMenuOpen).toBeTrue();

    component.toggleMenu();
    expect(component.isMenuOpen).toBeFalse();
  });

  it('Should Update Current TimeStamp on NgOnInit', fakeAsync(() => {
    spyOn(component, 'updateClock');
    
    component.ngOnInit();

    expect(component.updateClock).toHaveBeenCalledTimes(1); // Initial call

    tick(1000); // Simulating 1 second
    expect(component.updateClock).toHaveBeenCalledTimes(2);

    tick(2000); // Simulating 2 more seconds
    expect(component.updateClock).toHaveBeenCalledTimes(4);
    flush();
  }));

});
