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
  cat: "/src/pngs/Untitled_Artwork_769fcb7b9d.jpg",
  
  // Profile photos (caleb)
  caleb: [
    {
      url: "/src/pngs/IMG_9107_fe24a0e19d.jpg",
      caption: "sleeping"
    },
    {
      url: "/src/pngs/IMG_1143_c706c4403a.jpg", 
      caption: ""
    },
    {
      url: "/src/pngs/IMG_5622_036de2924c.jpg",
      caption: ""
    }
  ],
  
  // Hobby images
  hobbies: [
    {
      url: "/src/pngs/looking_at_screen_part_2_3ec148b2bd.jpg",
      caption: "looking at screen."
    },
    {
      url: "/src/pngs/ILOVEREADING_416390ebee.jpg", 
      caption: "READING!"
    },
    {
      url: "/src/pngs/IMG_7212_0e462ebcaa.jpg",
      caption: "losing money."
    }
  ],
  
  // Contact icons (social media)
  contact: {
    email: "/src/pngs/icons8_email_100_0f9583bc28.png",
    linkedin: "/src/pngs/icons8_linkedin_100_cf099daa56.png", 
    instagram: "/src/pngs/icons8_instagram_160_547d468f9b.png",
    snapchat: "/src/pngs/icons8_snapchat_100_86847988dc.png",
    spotify: "/src/pngs/icons8_spotify_96_6cc95d36e9.png",
    chess: "/src/pngs/icons8_chess_com_96_1e87c88e3f.png",
    github: "/src/pngs/githubicon_b9671a2611.png"
  },
  
  // Introduction text
  introduction: "Hi, my name is Caleb but some of my friends call me catlib. This is a personal blog where I share my thoughts and life on."
};
