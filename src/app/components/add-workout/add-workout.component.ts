import { Component, Inject, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { WorkoutApiService } from '../../services/workout-api.service';
import { AppComponent } from '../../app.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-workout',
  standalone: false,
  templateUrl: './add-workout.component.html',
  styleUrl: './add-workout.component.scss'
})

export class AddWorkoutComponent {
  addWorkout: string = 'Running';

  constructor(private service_api: WorkoutApiService){}

  add_workout(WorkoutForm: NgForm){
    const data = WorkoutForm.value;
    const UserData = this.service_api.getWorkoutInfo();

    if (!data.username || !data.WorkoutType || data.workoutMinutes === null) {
      Swal.fire({
        icon: 'error',
        title: 'Hold on!',
        text: 'Looks like some fields are missing. Complete them to proceed.',
        background: '#2D1B4A',
        color: '#E1CFF8',
        iconColor: '#D63384',
        confirmButtonColor: '#8A2BE2',
        confirmButtonText: 'OK',
        customClass: {
          popup: 'custom-swal-popup',
          title: 'custom-swal-title',
          confirmButton: 'custom-swal-button'
        }
      });      
      return;
    }

    // Username validation 
    if (data.username.length < 3 || !/^[a-zA-Z0-9 ]+$/.test(data.username)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Username!',
        text: 'Username must be at least 3 characters long and contain only letters and numbers.',
        background: '#2D1B4A',
        color: '#E1CFF8',
        iconColor: '#D63384',
        confirmButtonColor: '#8A2BE2',
        confirmButtonText: 'OK',
      });
      return;
    }

     // Workout Minutes Validation
    if (data.workoutMinutes <= 0 || /^0\d+/.test(data.workoutMinutes.toString())) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Workout Minutes!',
        text: 'Workout minutes must be a valid number greater than 0, without leading zeros.',
        background: '#2D1B4A',
        color: '#E1CFF8',
        iconColor: '#D63384',
        confirmButtonColor: '#8A2BE2',
       confirmButtonText: 'OK',
      });
      return;
    }

    WorkoutForm.reset({
      WorkoutType: 'Running'
    });  // to clear all input and set input default to Running.


    // Checking if user aldready exists
    let existingUser = UserData.find(user => user.name.toLowerCase() === data.username.toLowerCase());

    if (existingUser) {
      // Check if the same workout type exists for this user
      let existingWorkout = existingUser.workouts.find(workout => workout.type === data.WorkoutType);

      if (existingWorkout) {
        // If workout exists, just update the minutes
        existingWorkout.minutes += data.workoutMinutes;
      } else {
        // If workout type doesn't exist, add a new one
        existingUser.workouts.push({
          type: data.WorkoutType,
          minutes: data.workoutMinutes
        });
      }

    } else {
      // If user does not exist, add a new user with their first workout
      const newUser = {
        id: UserData.length + 1,
        name: data.username,
        workouts: [
          { type: data.WorkoutType, minutes: data.workoutMinutes }
        ]
      };
      UserData.push(newUser);
    }

    this.service_api.saveWorkoutInfo(UserData);
  }

}
