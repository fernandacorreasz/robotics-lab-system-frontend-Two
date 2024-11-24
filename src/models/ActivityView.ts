export interface Comment {
  id: string;
  text: string;
  createdDate: string;
}

export interface Component {
  id: string;
  name: string;
}

export interface ActivityView {
  id: string;
  activityTitle: string; 
  activityDescription: string;
  activityStatus: string; 
  timeSpent: number | null; 
  startDate: string;
  endDate: string | null; 
  userId: string; 
  userEmail: string;
  comments: Comment[];
  componentsUsed: Component[];
}
