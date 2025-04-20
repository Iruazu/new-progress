export interface Project {
  id: number;
  name: string;
  description: string;
  progress: number;
  image: string;
  color: string;
}

export interface TodoItem {
  text: string;
  completed: boolean;
}

export interface Note {
  title: string;
  date: string;
}

export interface File {
  name: string;
  size: string;
  type: string;
}