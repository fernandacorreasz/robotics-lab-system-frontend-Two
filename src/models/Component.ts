export interface Component {
    id: string;
    componentId: string;
    name: string;
    serialNumber: string;
    description: string;
    quantity: number;
    subCategoryId: string;
    subCategoryName: string;
    categoryId: string;
    categoryName: string;
    tutorialLink?: string;
    projectIdeas?: string; 
    librarySuggestions?: string;
    defectiveQuantity?: number;
    discardedQuantity?: number;
    status?: string;
  }
  