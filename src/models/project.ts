export class Project {
  icon: string;
  title: string;
  type: string;
  startDate: string;
  endDate: string;
  skills: string[];
  imgPath: string;
  descriptions: string[];
  githubUrl: string;
  youtubeUrl?: string;
}

export const exampleProjects: Project[] = [
  {
    icon: 'language',
    title: 'Website Development (ComputerGuys)',
    type: 'Practicum',
    startDate: 'Apr 2021',
    endDate: 'May 2021',
    skills: [
      'Angular',
      'TypeScript',
      'NodeJS',
      'MongoDB',
      'AWS Elastic Beanstalk',
    ],
    imgPath: 'computer_guys.png',
    descriptions: [
      '• Designed, developed and deployed a website that helps people find IT professionals.',
      '• Worked closely with the client, incorporating their needs as much as possible.',
      '• Delivered a functioning website, documentations, and admin page where client could make changes.',
    ],
    githubUrl: 'https://github.com/HaejoonChoi/ComputerGuy',
  },
  {
    icon: 'psychology',
    title: 'Abalone AI',
    type: 'Student Project',
    startDate: 'Mar 2021',
    endDate: 'Apr 2021',
    skills: ['Python', 'pygame', 'Artificial Intelligence', 'Game Development'],
    imgPath: 'abalone_project.jpeg',
    descriptions: [
      'Developed a fully-functioning Abalone game using PyGame library with AI agents utilizing Heuristic evaluation function, Alpha-beta pruning, and quiescence search.',
    ],
    githubUrl: 'https://github.com/HaejoonChoi/AI_Abalone_Project',
  },
  {
    icon: 'language',
    title: 'Responsive Web App (ReStyle)',
    type: 'Student Project',
    startDate: 'Apr 2019',
    endDate: 'Jul 2019',
    skills: ['Angular', 'NodeJS', 'PostgreSQL', 'Azure Web Service'],
    imgPath: 'abalone_project.jpeg',
    descriptions: [
      '• In a team of 5 made an interactive web application called ReStyle using agile methodology.',
      '• The app is aiming to promote people to swap and reuse their clothes and reduce wasted material and energy.',
      '• Our team received great attention from the ECOCITY world summit officials; we are selected to develop the app further for ECOCITY world summit in October 2019.',
    ],
    githubUrl: 'https://github.com/ZedTT/ReStyle',
    youtubeUrl: 'https://www.youtube.com/channel/UCuaeNXNrKmyEba-GPuhNQPw',
  },
];
