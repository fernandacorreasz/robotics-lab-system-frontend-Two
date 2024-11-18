import { Activity } from "./Activity";

export interface Comment {
    id: string;
    text: string;
    activity: Activity; // Associe à atividade
    createdDate: Date;
  }
  