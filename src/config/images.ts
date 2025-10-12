// Import all images as modules for proper Vite bundling
import catImage from '../pngs/Untitled_Artwork_769fcb7b9d.jpg';
import caleb1 from '../pngs/IMG_9107_fe24a0e19d.jpg';
import caleb2 from '../pngs/IMG_1143_c706c4403a.jpg';
import caleb3 from '../pngs/IMG_5622_036de2924c.jpg';
import hobby2 from '../pngs/ILOVEREADING_416390ebee.jpg';
import hobby3 from '../pngs/IMG_7212_0e462ebcaa.jpg';
import emailIcon from '../pngs/icons8_email_100_0f9583bc28.png';
import linkedinIcon from '../pngs/icons8_linkedin_100_cf099daa56.png';
import instagramIcon from '../pngs/icons8_instagram_160_547d468f9b.png';
import snapchatIcon from '../pngs/icons8_snapchat_100_86847988dc.png';
import spotifyIcon from '../pngs/icons8_spotify_96_6cc95d36e9.png';
import githubIcon from '../pngs/githubicon_b9671a2611.png';

export interface ImageData {
  url: string;
  caption?: string;
}

export interface ProjectData {
  title: string;
  description: string;
  link?: string;
  images: ImageData[];
}

export interface HomepageImages {
  cat: string;
  caleb: ImageData[];
  hobbies: ImageData[];
  projects: ProjectData[];
  contact: {
    email: string;
    linkedin: string;
    instagram: string;
    snapchat: string;
    spotify: string;
    github: string;
  };
  introduction: string;
}

export const homepageImages: HomepageImages = {
  // Cat image
  cat: catImage,

  // Projects with detailed information
  projects: [
    {
      title: "catlieb.com",
      description: "My personal blog / website built with React, TypeScript, and Vite. Features include a blog posts and interactive elements. Designed with a clean, minimalist aesthetic.",
      link: "https://github.com/catliba/catlib.com",
      images: [
      ]
    },
    {
      title: "Poker Tracker",
      description: "A comprehensive poker session tracking application that helps analyze gameplay patterns, track wins/losses, visualize win rates with graphs, and improve decision-making skills. Currently still a work in progress.",
      link: "https://github.com/catliba/poker-tracker",
      images: [
      ]
    },
    {
      title: "Pluribus Analysis",
      description: "Curious about poker AIs, I dove into Pluribus and unpacked how it achieves strong play in multi-player no-limit Hold’em. I studied its core ingredients—counterfactual regret minimization (CFR), self-play to learn a blueprint strategy, limited real-time subgame solving, and abstraction choices—and connected them to poker concepts like ranges, equilibria, and exploitability. Along the way, I built small experiments (Kuhn poker) to visualize regret updates, convergence, and EV under different action abstractions. This work sharpened my understanding of imperfect-information game theory and why CFR-style methods scale in practice. I plan on continuing studying this work in the future.",
      link: "https://www.dropbox.com/scl/fi/mqumiyzc5n753jwm0pgry/A_dive_inside_Poker_Ai.pdf?rlkey=jpthq3l34pcum3the2v5ogyby&st=3jj0ppwy&dl=0",
      images: [
      ]
    },
    {
      title: "TV Show Recommmendations",
      description: "Built a TV show popularity recommender over 200k+ titles, executing the full data science lifecycle—problem framing, data cleaning, EDA, feature engineering, modeling, and evaluation. Combined structured features (genres, ratings, release year, etc.) with BERT embeddings from show synopses to capture semantic signal. Trained and compared gradient-boosted trees and regularized linear models with cross-validation, then calibrated outputs into a popularity score for ranking and recommendations. Shipped a reproducible pipeline with clear metrics tracking and error analysis.",
      link: "https://github.com/DirecTV-Team1A-NextGen-Rec/directv_tvrec",
      images: [
      ]
    },
    {
      title: "Trialize",
      description: "Healthcare app for SHARP that allows patients of the app to match with clinical trials. I worked on the frontend display of the app using React Native.",
      link: "https://github.com/catliba",
      images: [
      ]
    },
    {
      title: "UC Socially Undead",
      description: "An app designed specifically for UCSD students to help them with tutoring. Students can log in and talk to other students and list the classes have have or are currently taking to find study buddies or tutors.",
      link: "http://132.249.242.127/login",
      images: [
      ]
    }
  ],
  
  // Profile photos (caleb)
  caleb: [
    {
      url: caleb1,
      caption: "sleeping"
    },
    {
      url: caleb2, 
      caption: ""
    },
    {
      url: caleb3,
      caption: ""
    }
  ],
  
  // Hobby images
  hobbies: [
    {
      url: hobby2, 
      caption: "READING!"
    },
    {
      url: hobby3,
      caption: "losing money."
    }
  ],
  
  // Contact icons (social media)
  contact: {
    email: emailIcon,
    linkedin: linkedinIcon, 
    instagram: instagramIcon,
    snapchat: snapchatIcon,
    spotify: spotifyIcon,
    github: githubIcon
  },
  
  // Introduction text
  introduction: "Hi, my name is Caleb but some of my friends call me catlib. This is a personal blog where I share my thoughts and life on."
};
