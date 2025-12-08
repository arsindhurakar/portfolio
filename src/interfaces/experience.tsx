export interface IExperience {
  id: number;
  designation: string;
  address: string;
  description: Array<string | { text: string; className?: string }>;
  year: number;
}
