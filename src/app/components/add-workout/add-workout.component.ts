import { Component, Inject, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { WorkoutApiService } from '../../services/workout-api.service';
import { faDumbbell, faRunning, faSwimmer, faSpa, faBicycle, faChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-workout',
  standalone: false,
  templateUrl: './add-workout.component.html',
  styleUrl: './add-workout.component.scss'
})

export class AddWorkoutComponent {
  addWorkout: string = 'Running';

  constructor(private service_api: WorkoutApiService){}

  // Font Awesome icons
  faDumbbell = faDumbbell;
  faRunning = faRunning;
  faSwimmer = faSwimmer;
  faSpa = faSpa;
  faBicycle = faBicycle;
  faChevronDown = faChevronDown;

  isDropdownOpen = false;
  selectedOption: string | null = null;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.isDropdownOpen = false;
  }


  add_workout(WorkoutForm: NgForm){
    const data = WorkoutForm.value;
    const UserData = this.service_api.getWorkoutInfo();

    data.WorkoutType = this.selectedOption || data.WorkoutType;

    const username = (data.username || "").trim(); // to remove blank spaces after text, If user input spacebar at last.

    if (!username || !data.WorkoutType || data.workoutMinutes === null) { // If any input is missing it will trigger an alert.
      Swal.fire({
        icon: 'error',
        title: 'Hold on!',
        text: 'Looks like some fields are missing. Complete them to proceed.',
        background: 'rgb(255, 255, 255)',
        color: 'rgb(68, 24, 50)',
        iconColor: 'rgb(206, 72, 150)',
        confirmButtonColor: ' rgb(221, 94, 125)',
        confirmButtonText: 'OK',
        customClass: {
          popup: 'custom-swal-popup',
          title: 'custom-swal-title',
          confirmButton: 'custom-swal-button'
        }
      });      
      return;
    }

    // Validating user input to prevent SQL injection and restrict unknown characters in usernames.
    if (username.length < 3 || !/^[a-zA-Z][a-zA-Z0-9 ]+$/.test(username)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Username!',
        text: 'Username must be at least 3 characters long, start with a letter, and contain only letters, numbers.',
        background: 'rgb(255, 255, 255)',
        color: 'rgb(68, 24, 50)',
        iconColor: 'rgb(206, 72, 150)',
        confirmButtonColor: ' rgb(221, 94, 125)',
        confirmButtonText: 'OK',
      });
      return;
    }

     // Workout Minutes Validation, Without leading Zeros at starting. like example 0023, this will be converted to 23.
    if (data.workoutMinutes <= 0 || /^0\d+/.test(data.workoutMinutes.toString())) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Workout Minutes!',
        text: 'Workout minutes must be a valid number greater than 0, without leading zeros.',
        background: 'rgb(255, 255, 255)',
        color: 'rgb(68, 24, 50)',
        iconColor: 'rgb(206, 72, 150)',
        confirmButtonColor: ' rgb(221, 94, 125)',
       confirmButtonText: 'OK',
      });
      return;
    }

    WorkoutForm.reset({
      WorkoutType: 'Running'
    });  // to clear all input and set input default to Running.


    // Checking if user aldready exists
    let existingUser = UserData.find(user => user.name.toLowerCase() === username.toLowerCase());

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
        name: username,
        workouts: [
          { type: data.WorkoutType, minutes: data.workoutMinutes }
        ]
      };
      UserData.push(newUser);
    }

    this.service_api.saveWorkoutInfo(UserData);
  }

}
