//client/src/types.ts

// General utility types
export type Status = 'To Do' | 'In Progress' | 'Completed';
export type Priority = 'Low' | 'Medium' | 'High';

// Task model
export interface Task {
  id: number;
  title: string;
  description?: string;
  status: Status;
  priority: Priority;
  assignee?: string;
  sprintId?: number;
}

// Sprint model
export interface Sprint {
  id: number;
  name: string;
  goal: string;
  startDate?: string;
  endDate?: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
  progress: number;
}

// Milestone model
export interface Milestone {
  id: number;
  title: string;
  description: string;
  status: 'Planned' | 'In Progress' | 'Completed';
  targetDate: string;
}

// User model
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

// Mascot customization model
export interface MascotCustomization {
  color: string;
  clothing: string;
  accessory: string;
  personality: string;
  image: string;
}
