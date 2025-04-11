export interface Job {
    company: string;
    position: string;
    salary: string;
    requirements: string[];
    benefits: string[];
    whyInterested: string;
    skillsToLearn: string;
    goals: string;
  }
  
  export interface JobsData {
    jobs: Job[];
  }