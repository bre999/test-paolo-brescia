export interface Task {
  id: string;
  userId: string;
  projectId: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
}