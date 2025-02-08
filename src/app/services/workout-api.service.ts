import { Injectable } from '@angular/core';
import { User } from './../models/interfaces';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class WorkoutApiService {
  userData: User[] = []

  constructor() { }

  loadUserData() {
    const storedData = localStorage.getItem('workoutData');
    if (storedData) {
      this.userData = JSON.parse(storedData);
    } else {
      this.userData = [
        {
          id: 1,
          name: 'John Doe',
          workouts: [
            { type: 'Running', minutes: 60 },
            { type: 'Cycling', minutes: 30 },
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
            { type: 'Yoga', minutes: 50 },
            { type: 'Cycling', minutes: 80 },
          ],
        },
      ];
      this.saveWorkoutInfo(this.userData,false);
    }
    return;
  }

  getWorkoutInfo(){
    const storedData = localStorage.getItem('workoutData') as string;
    this.userData = JSON.parse(storedData);

    return this.userData;
  };

  saveWorkoutInfo(workoutData: User[],alert: boolean = true){
    localStorage.setItem("workoutData", JSON.stringify(workoutData));
    if(alert){
    Swal.fire({
      icon: 'success',
      title: 'Great job!',
      text: 'Your workout has been added successfully. Keep pushing forward!',
      background: '#2D1B4A',
      color: '#E1CFF8',
      iconColor: '#8A2BE2',
      confirmButtonColor: '#8A2BE2',
      confirmButtonText: 'Awesome!',
      timer: 6000,
      showConfirmButton: true
    }); 
   }
  }

}
