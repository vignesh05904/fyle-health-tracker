export interface Workout {
  type: string;
  minutes: number;
}

export interface Log {
  description: string;
  state: string;
}

export interface User {
  id: number;
  name: string;
  workouts: Workout[];
}

export interface User {
  id: number;
  name: string;
  workouts: Workout[];
}
