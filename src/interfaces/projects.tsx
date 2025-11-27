export interface IProject {
  id: number;
  title: string;
  description: Array<string | { text: string; className?: string }>;
  backgroundUrl: string;
}
