export interface ProjectType {
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  roadmap: any[];
  goals: { text: string; description: string }[];
  license: any;
  repository: any;
  status: string;
}

export interface Roadmap {
  roadmap: string;
  description: string;
  status: string;
}

export interface Goal {
  text: string;
  description: string;
}

export interface License {
  name: string;
  description: string;
  permission: string[];
  condition: string[];
  limitation: string[];
}
