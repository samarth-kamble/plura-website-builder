import { Agency } from "@prisma/client";

interface AgencyDetails {
  data?: Partial<Agency>;
}

interface FileUpload {
  apiEndpoint: "agencyLogo" | "avatar" | "subaccountLogo";
  onChange: (url?: string) => void;
  value?: string;
}
