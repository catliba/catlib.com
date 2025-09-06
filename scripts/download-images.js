/**
 * Script to download images from Strapi backend
 * This will fetch all images used in the AboutMe component and save them locally
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Update this URL to point to your Strapi backend
const STRAPI_URL = 'https://catlieb-df347bf0623e.herokuapp.com';

// GraphQL query to fetch homepage data with images
const GRAPHQL_QUERY = `
query getData {
    homepage {
      data {
        attributes {
          introduction
          hobbies {
            data {
              attributes {
                url,
                caption
              }
            }
          }
          caleb {
            data {
              attributes {
                url,
                caption
              }
            }
          }
          contact {
            data {
              attributes {
                url
              }
            }
          }
          cat {
            data {
                attributes {
                    url
                }
            }
          }
        }
      }
    }
  }
`;

// Function to download an image
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https:') ? https : http;
    
    protocol.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(filepath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`✅ Downloaded: ${path.basename(filepath)}`);
        resolve(filepath);
      });

      fileStream.on('error', (err) => {
        fs.unlink(filepath, () => {}); // Delete the file if there was an error
        reject(err);
      });
    }).on('error', reject);
  });
}

// Function to fetch data from Strapi
async function fetchFromStrapi() {
  try {
    const response = await fetch(`${STRAPI_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: GRAPHQL_QUERY
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.data.homepage.data.attributes;
  } catch (error) {
    console.error('Error fetching from Strapi:', error);
    throw error;
  }
}

// Function to get filename from URL
function getFilenameFromUrl(url) {
  const urlParts = url.split('/');
  return urlParts[urlParts.length - 1];
}

// Main function to download all images
async function downloadAllImages() {
  try {
    console.log('🚀 Starting image download from Strapi...');
    
    // Fetch data from Strapi
    const data = await fetchFromStrapi();
    
    // Create images directory if it doesn't exist
    const imagesDir = path.join(__dirname, '..', 'src', 'pngs');
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }

    const downloads = [];

    // Download cat image
    if (data.cat?.data?.attributes?.url) {
      const catUrl = data.cat.data.attributes.url;
      const catFilename = getFilenameFromUrl(catUrl);
      const catFilepath = path.join(imagesDir, catFilename);
      downloads.push(downloadImage(catUrl, catFilepath));
    }

    // Download caleb (profile) images
    if (data.caleb?.data) {
      data.caleb.data.forEach((item, index) => {
        if (item.attributes?.url) {
          const url = item.attributes.url;
          const filename = getFilenameFromUrl(url);
          const filepath = path.join(imagesDir, filename);
          downloads.push(downloadImage(url, filepath));
        }
      });
    }

    // Download hobby images
    if (data.hobbies?.data) {
      data.hobbies.data.forEach((item, index) => {
        if (item.attributes?.url) {
          const url = item.attributes.url;
          const filename = getFilenameFromUrl(url);
          const filepath = path.join(imagesDir, filename);
          downloads.push(downloadImage(url, filepath));
        }
      });
    }

    // Download contact images
    if (data.contact?.data) {
      data.contact.data.forEach((item, index) => {
        if (item.attributes?.url) {
          const url = item.attributes.url;
          const filename = getFilenameFromUrl(url);
          const filepath = path.join(imagesDir, filename);
          downloads.push(downloadImage(url, filepath));
        }
      });
    }

    // Wait for all downloads to complete
    await Promise.all(downloads);
    
    console.log('🎉 All images downloaded successfully!');
    console.log('📝 Update src/config/images.ts with the correct filenames');
    
    // Log the data structure for reference
    console.log('\n📊 Data structure from Strapi:');
    console.log(JSON.stringify(data, null, 2));
    
  } catch (error) {
    console.error('❌ Error downloading images:', error);
  }
}

// Run the script
downloadAllImages();
