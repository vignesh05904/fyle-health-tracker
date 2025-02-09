import { Injectable } from '@angular/core';
import { User } from './../models/interfaces';
import Swal from 'sweetalert2';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkoutApiService {
  private userDataSubject = new BehaviorSubject<User[]>([]);
  userData$ = this.userDataSubject.asObservable(); // Expose as observable
  
  constructor() {
    this.loadUserData();
  }

  loadUserData() {
    const storedData = localStorage.getItem('workoutData');
    let userData: User[];

    if (storedData) {
      userData = JSON.parse(storedData);
    } else {
      userData = [
        {
          id: 1,
          name: 'John Doe',
          workouts: [
            { type: 'Running', minutes: 30 },
            { type: 'Cycling', minutes: 60 },
            { type: 'Swimming', minutes: 45 },
          ],
        },
        {
          id: 2,
          name: 'Jane Smith',
          workouts: [
            { type: 'Swimming', minutes: 60 },
            { type: 'Running', minutes: 20 },
          ],
        },
        {
          id: 3,
          name: 'Mike Johnson',
          workouts: [
            { type: 'Running', minutes: 50 },
            { type: 'Cycling', minutes: 80 },
          ],
        },
      ];
      this.saveWorkoutInfo(userData, true);
    }

    this.userDataSubject.next(userData);
  }


  getWorkoutInfo(){
    let userData: User[];

    const storedData = localStorage.getItem('workoutData') as string;
    userData = JSON.parse(storedData);

    return userData;
  };


  saveWorkoutInfo(workoutData: User[],alert?: boolean){
    localStorage.setItem("workoutData", JSON.stringify(workoutData));
    if(!alert){
    Swal.fire({
      icon: 'success',
      title: 'Great job!',
      text: 'Your workout has been added successfully. Keep pushing forward!',
      background: 'rgb(67, 27, 77)',
      color: '#E1CFF8',
      iconColor: 'rgb(84, 131, 72)',
      confirmButtonColor: ' #5c3372',
      confirmButtonText: 'Awesome!',
      timer: 6000,
      showConfirmButton: true
    }); 
    }
   this.userDataSubject.next(workoutData);
  }
  
}
