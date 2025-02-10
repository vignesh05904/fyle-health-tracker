import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: false,
  
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  isMenuOpen = false;
  DateTimeStamp: string = '';
  intervalId: ReturnType<typeof setInterval> | null = null;

  updateClock() {
    const currentDate = new Date();
    this.DateTimeStamp = currentDate.toLocaleString();
  }
  
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  ngOnInit(){
    this.updateClock();
    this.intervalId = setInterval(() => {
    this.updateClock();
    }, 1000);
  }

  ngOnDestroy() {
    if (this.intervalId !== null) {
    clearInterval(this.intervalId);
    }
  }

}
