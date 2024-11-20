export interface Tag {
    id: string;
    name: string;
  }
  
  export interface Comment {
    id: string;
    content: string;
    codeSnippet?: string;
    userName: string;
    userId: string;
  }
  
  export interface Forum {
    id: string;
    title: string;
    description: string;
    codeSnippet?: string;
    status: string;
    creationDate: string;
    editDate?: string;
    voteCount: number;
    userName: string;
    userId: string;
    comments: Comment[];
    tags: Tag[];
  }
  