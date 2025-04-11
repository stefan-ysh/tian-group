'use server';

import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';
import { DetailNewsItem } from '../types/content';

// Directory for publications
const PUBLICATIONS_DIR = join(process.cwd(), 'src/content/publications');

// In the future, this can be replaced with actual news content files for other types
// Similar to how publications, activities, and members are handled

// Mock news data for other news types
const mockNewsData = [
  {
    id: 'award-national-science-foundation',
    title: 'Professor Tian Receives National Science Foundation Grant',
    date: '2024-07-25',
    summary: 'Professor Tian Tian has been awarded a prestigious grant from the National Science Foundation to support the ongoing research on lead-free perovskite solar cells.',
    type: 'award',
    imageUrl: 'https://i.imgur.com/pKXmffK.jpg', // Award image
    tags: ['Award', 'Grant', 'Lead-Free Perovskite']
  },
  {
    id: 'conference-hybrid-photovoltaics',
    title: 'International Conference on Hybrid Photovoltaics',
    date: '2024-07-15',
    summary: 'Our research group will participate in the International Conference on Hybrid Photovoltaics in Shanghai next month. Professor Tian will deliver a keynote speech on recent advances in printable perovskite devices.',
    type: 'event',
    imageUrl: 'https://i.imgur.com/fMFqBPS.jpg', // Event image
    tags: ['Conference', 'Photovoltaics', 'Keynote Speech']
  },
  {
    id: 'media-coverage-renewable-energy',
    title: 'Research Featured in Renewable Energy Magazine',
    date: '2024-06-30',
    summary: 'Our research on carbon electrode technology for printable perovskite solar cells has been featured in the latest issue of Renewable Energy Magazine, highlighting its potential for low-cost, large-scale photovoltaic applications.',
    type: 'media',
    imageUrl: 'https://i.imgur.com/kNVlY0J.jpg', // Media image
    tags: ['Media Coverage', 'Carbon Electrode', 'Renewable Energy'],
    link: 'https://example.com/renewable-energy-magazine'
  },
  {
    id: 'new-collaboration-industry-partner',
    title: 'New Collaboration with Industry Partner',
    date: '2024-06-20',
    summary: 'We are excited to announce a new collaboration with XYZ Solar Tech Co., Ltd. to accelerate the commercialization of our printable perovskite solar cell technology. This partnership aims to bridge the gap between laboratory research and industrial production.',
    type: 'announcement',
    imageUrl: 'https://i.imgur.com/aCTnQjV.jpg', // Announcement image
    tags: ['Collaboration', 'Industry Partnership', 'Technology Transfer']
  },
  {
    id: 'workshop-nanophotonic-materials',
    title: 'Workshop on Nanophotonic Materials',
    date: '2024-05-25',
    summary: 'Our research group successfully hosted a workshop on nanophotonic materials, attended by over 50 researchers from various universities and institutes. The workshop focused on recent advances in material design, characterization techniques, and device applications.',
    type: 'event',
    imageUrl: 'https://i.imgur.com/dLM9MQc.jpg', // Event image
    tags: ['Workshop', 'Nanophotonic Materials', 'Scientific Exchange']
  },
  {
    id: 'doctoral-student-award',
    title: 'Doctoral Student Receives Best Paper Award',
    date: '2024-05-10',
    summary: 'Congratulations to our doctoral student Li Ming for receiving the Best Paper Award at the Young Researchers Symposium on Optoelectronic Materials. His paper on heat-resistant organic nonlinear optical membranes was recognized for its innovative approach and potential impact.',
    type: 'award',
    imageUrl: 'https://i.imgur.com/8O5Xq6F.jpg', // Award image
    tags: ['Student Award', 'Nonlinear Optics', 'Young Researcher']
  },
  {
    id: 'new-equipment-acquisition',
    title: 'New Equipment Acquisition: Advanced Spectroscopy System',
    date: '2024-04-30',
    summary: 'Our laboratory has acquired a state-of-the-art spectroscopy system that will enhance our capabilities for in-depth characterization of optoelectronic materials. This equipment enables high-resolution transient absorption measurements and advanced photoluminescence spectroscopy.',
    type: 'announcement',
    imageUrl: 'https://i.imgur.com/wVKSLdm.jpg', // Announcement image
    tags: ['Laboratory Equipment', 'Spectroscopy', 'Material Characterization']
  },
  {
    id: 'student-exchange-program',
    title: 'International Student Exchange Program Launched',
    date: '2024-04-15',
    summary: 'We are pleased to announce the launch of an international student exchange program in collaboration with University of California, Berkeley. This program will provide opportunities for graduate students to gain international research experience and foster cross-cultural scientific collaboration.',
    type: 'announcement',
    imageUrl: 'https://i.imgur.com/Eg3xrwX.jpg', // Announcement image
    tags: ['International Exchange', 'Education', 'Collaboration']
  },
  {
    id: 'media-interview-science-daily',
    title: 'Professor Tian Interviewed by Science Daily',
    date: '2024-03-10',
    summary: 'Professor Tian Tian was interviewed by Science Daily about the future prospects of perovskite photovoltaics in addressing global energy challenges. The interview highlights recent advancements in the field and discusses pathways to commercial deployment.',
    type: 'media',
    imageUrl: 'https://i.imgur.com/jBszjL4.jpg', // Media image
    tags: ['Media Interview', 'Energy Future', 'Perovskite Commercialization'],
    link: 'https://example.com/science-daily-interview'
  }
];

// Load publications as news items
const loadPublicationsAsNews = () => {
  try {
    const files = fs.readdirSync(PUBLICATIONS_DIR);
    
    const publicationNews = files
      .filter((filename) => filename.endsWith('.md'))
      .map((filename) => {
        try {
          const filePath = join(PUBLICATIONS_DIR, filename);
          const fileContent = fs.readFileSync(filePath, 'utf-8');
          const { data: frontmatter } = matter(fileContent);
          
          // Format the date - convert from 'May 2022' to ISO string format
          const publishDate = frontmatter.publishDate;
          let isoDate;
          
          if (publishDate) {
            // Parse date like "May 2022" or similar formats
            const dateRegex = /(\w+)\s+(\d{4})/;
            const match = publishDate.match(dateRegex);
            
            if (match) {
              const month = match[1];
              const year = match[2];
              const monthMap = {
                'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
                'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
              };
              
              if (monthMap[month] !== undefined) {
                const date = new Date(parseInt(year), monthMap[month], 15);
                isoDate = date.toISOString().split('T')[0]; // YYYY-MM-DD format
              }
            }
          }
          
          // If couldn't parse the date, use a default
          if (!isoDate) {
            isoDate = new Date().toISOString().split('T')[0];
          }
          
          // Extract author names from the frontmatter
          const authorString = frontmatter.author ? 
            (Array.isArray(frontmatter.author) ? frontmatter.author.join(', ') : frontmatter.author) : '';
          
          // Extract author names - assuming format like "Tian Tian, Other Authors"
          const authors = authorString.split(',')
            .map(author => author.trim())
            .filter(author => author) // Filter out empty strings
            .map(author => {
              // Remove any asterisks or other markers from author names
              const cleanName = author.replace(/[*]/g, '').trim();
              // Generate an ID from the name
              const id = cleanName.toLowerCase().replace(/\s+/g, '-');
              return { id, name: cleanName };
            });
          
          // Extract the ID from the filename
          const id = filename.replace('.md', '').toLowerCase()
            .replace(/[^\w\s-]/g, '') // Remove special characters
            .replace(/\s+/g, '-'); // Replace spaces with hyphens
          
          // Create a news item for this publication
          return {
            id: `publication-${id}`,
            title: frontmatter.title || 'Untitled Publication',
            date: isoDate,
            summary: frontmatter.description || '',
            type: 'publication',
            imageUrl: frontmatter.image || 'https://i.imgur.com/FRQ93Lm.jpg',
            tags: frontmatter.tags || ['Research', 'Publication'],
            authors,
            publication: {
              journal: frontmatter.journal || 'Unknown Journal',
              volume: frontmatter.volume || '',
              issue: frontmatter.issue || '',
              doi: frontmatter.link ? frontmatter.link.replace('http://dx.doi.org/', '') : ''
            },
            link: frontmatter.link || ''
          };
        } catch (error) {
          console.error(`Error processing publication file ${filename}:`, error);
          return null;
        }
      })
      .filter(Boolean); // Filter out any nulls from error cases
    
    return publicationNews;
  } catch (error) {
    console.error('Error loading publications:', error);
    return [];
  }
};

/**
 * Fetch news data combining real publications and mock data for other news types
 */
export async function fetchNews() {
  try {
    // Load real publication data
    const publicationNews = loadPublicationsAsNews();
    
    // Combine with mock data for other news types
    const allNews = [...publicationNews, ...mockNewsData];
    
    return allNews;
  } catch (error) {
    console.error('Error fetching news:', error);
    // Fall back to mock data if there's an error
    return mockNewsData;
  }
}

/**
 * Find the latest news items
 * @param {Object} options - Options for finding news
 * @param {number} [options.count] - Number of items to return
 * @param {number} [options.page] - Page number (1-based)
 * @param {number} [options.limit] - Items per page
 * @returns {Promise<Array>} - Array of news items
 */
export async function findLatestNews({ count, page, limit } = {}) {
  // First get all news
  const news = await fetchNews();
  
  // Sort by date (newest first)
  const sortedNews = [...news].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  // If page is defined, use pagination
  if (page !== undefined && limit !== undefined) {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return sortedNews.slice(startIndex, endIndex);
  }
  
  // Otherwise use simple count (for backward compatibility)
  const _count = count || 12;
  return sortedNews.slice(0, _count);
}

/**
 * Find a news item by ID
 * @param {string} id - The ID of the news item to find
 * @returns {Promise<import('../types/content').DetailNewsItem|null>} - The found news item or null
 */
export async function findNewsById(id) {
  if (!id) return null;
  
  const news = await fetchNews();
  return news.find(item => item.id === id) || null;
}

/**
 * Find news by type
 */
export async function findNewsByType(type) {
  if (!type) return [];
  
  const news = await fetchNews();
  return news.filter(item => item.type === type);
}

/**
 * Get counts of news by type
 * @returns {Promise<Object>} - Object with counts by type
 */
export async function getNewsCounts() {
  const news = await fetchNews();
  const counts = { all: 0 };
  
  news.filter(item => item !== null).forEach(item => {
    // Increment total count
    counts.all++;
    
    // Increment type count
    if (!counts[item.type]) {
      counts[item.type] = 0;
    }
    counts[item.type]++;
  });
  
  return counts;
} 