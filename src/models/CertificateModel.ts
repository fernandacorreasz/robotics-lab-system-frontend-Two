// models/CertificateModel.ts

export interface Certificate {
    id: string;
    userEmail: string;
    userName: string;
    activityTitle: string;
    activityDescription: string;
    timeSpent: number;
    startDate: string;
    endDate: string;
    approvedBy: string;
    status: "APROVADO" | "PENDENTE" | "RECUSADO";
    certificateLink?: string; // Link para download do certificado, se gerado
  }
  