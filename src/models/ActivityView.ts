// src/models/ActivityView.ts
export interface Comment {
    id: string;
    text: string;
    createdDate: string;
  }
  
  export interface ActivityView {
    id: string;
    activityTitle: string;
    activityDescription: string;
    activityStatus: string;
    timeSpent: number;
    startDate: string;
    endDate: string;
    userId: string;
    userEmail: string;
    comments: Comment[];
  }
  