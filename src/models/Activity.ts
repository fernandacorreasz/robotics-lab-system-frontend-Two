export interface Activity {
  id: string;
  activityTitle: string;
  activityDescription: string;
  activityStatus: 'IN_PROGRESS' | 'COMPLETED' | 'NOT_STARTED' | string;
  timeSpent: number;
  startDate: string;
  endDate: string;
  userId: string;
  userEmail: string;
}
