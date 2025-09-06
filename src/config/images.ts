// Import all images as modules for proper Vite bundling
import catImage from '../pngs/Untitled_Artwork_769fcb7b9d.jpg';
import caleb1 from '../pngs/IMG_9107_fe24a0e19d.jpg';
import caleb2 from '../pngs/IMG_1143_c706c4403a.jpg';
import caleb3 from '../pngs/IMG_5622_036de2924c.jpg';
import hobby1 from '../pngs/looking_at_screen_part_2_3ec148b2bd.jpg';
import hobby2 from '../pngs/ILOVEREADING_416390ebee.jpg';
import hobby3 from '../pngs/IMG_7212_0e462ebcaa.jpg';
import emailIcon from '../pngs/icons8_email_100_0f9583bc28.png';
import linkedinIcon from '../pngs/icons8_linkedin_100_cf099daa56.png';
import instagramIcon from '../pngs/icons8_instagram_160_547d468f9b.png';
import snapchatIcon from '../pngs/icons8_snapchat_100_86847988dc.png';
import spotifyIcon from '../pngs/icons8_spotify_96_6cc95d36e9.png';
import chessIcon from '../pngs/icons8_chess_com_96_1e87c88e3f.png';
import githubIcon from '../pngs/githubicon_b9671a2611.png';

export interface ImageData {
  url: string;
  caption?: string;
}

export interface HomepageImages {
  cat: string;
  caleb: ImageData[];
  hobbies: ImageData[];
  contact: {
    email: string;
    linkedin: string;
    instagram: string;
    snapchat: string;
    spotify: string;
    chess: string;
    github: string;
  };
  introduction: string;
}

export const homepageImages: HomepageImages = {
  // Cat image
  cat: catImage,
  
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
      url: hobby1,
      caption: "looking at screen."
    },
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
    chess: chessIcon,
    github: githubIcon
  },
  
  // Introduction text
  introduction: "Hi, my name is Caleb but some of my friends call me catlib. This is a personal blog where I share my thoughts and life on."
};
