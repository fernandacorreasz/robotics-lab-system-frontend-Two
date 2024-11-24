
export interface Loan {
    id: string;
    loanId: string;
    borrowerId: string;
    borrowerEmail: string;
    authorizerId: string | null;
    authorizerEmail: string | null;
    componentId: string;
    componentName: string;
    loanDate: string;
    expectedReturnDate: string;
    actualReturnDate: string | null;
    status: string;
    quantity: number;
  }
  
  export interface LoanChartData {
    month: string;
    count: number;
  }
  
  export interface ActivityMetrics {
    total: number;
    completed: number;
    inProgress: number;
    notStarted: number;
    canceled: number;
  }
  