import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// GitHub repos for each app
const repos = [
  { name: 'Personal Portfolio', repo: 'amerkovacevic/personal-portfolio' },
  { name: 'Secret Santa', repo: 'amerkovacevic/secret-santa' },
  { name: 'FM Team Draw', repo: 'amerkovacevic/fm-team-draw' },
  { name: 'Pickup Soccer', repo: 'amerkovacevic/pickup-soccer' },
  { name: 'Amer Gauntlet', repo: 'amerkovacevic/amer-gauntlet' },
  { name: 'Color Crafter', repo: 'amerkovacevic/color-crafter' },
  { name: 'Encryption Suite', repo: 'amerkovacevic/encryption' },
  { name: 'Time Bro', repo: 'amerkovacevic/time-buddy' },
  { name: 'Flick Feed', repo: 'amerkovacevic/flickfeed' },
  { name: 'Diff Bro', repo: 'amerkovacevic/diff-bro' },
];

async function fetchLatestCommit(repo, token) {
  try {
    const url = `https://api.github.com/repos/${repo}/commits?per_page=1`;
    const headers = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'AK-Dashboard-Bot'
    };
    
    if (token) {
      headers['Authorization'] = `token ${token}`;
    }
    
    const response = await fetch(url, { headers });
    
    if (!response.ok) {
      console.error(`Failed to fetch ${repo}: ${response.status}`);
      return null;
    }
    
    const commits = await response.json();
    
    if (commits.length === 0) {
      console.log(`No commits found for ${repo}`);
      return null;
    }
    
    const latestCommit = commits[0];
    const commitDate = latestCommit.commit.author.date;
    
    console.log(`✓ ${repo}: ${commitDate}`);
    
    return {
      date: commitDate,
      sha: latestCommit.sha.substring(0, 7),
      message: latestCommit.commit.message.split('\n')[0], // First line only
    };
  } catch (error) {
    console.error(`Error fetching ${repo}:`, error.message);
    return null;
  }
}

async function main() {
  const token = process.env.GH_PAT;
  
  if (!token) {
    console.warn('⚠️  No GH_PAT token found. API rate limits may apply.');
  } else {
    console.log('✓ Using GitHub token for authentication');
  }
  
  console.log('\n🔍 Fetching latest commits from GitHub...\n');
  
  const results = {};
  
  for (const { name, repo } of repos) {
    const commit = await fetchLatestCommit(repo, token);
    if (commit) {
      results[name] = commit;
    } else {
      // Keep existing date or use fallback
      results[name] = {
        date: new Date().toISOString(),
        sha: 'unknown',
        message: 'No commit data available'
      };
    }
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  // Write results to JSON file
  const outputDir = path.join(__dirname, '../src/data');
  const outputFile = path.join(outputDir, 'lastUpdated.json');
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const output = {
    lastFetch: new Date().toISOString(),
    commits: results
  };
  
  fs.writeFileSync(outputFile, JSON.stringify(output, null, 2));
  
  console.log('\n✅ Successfully updated commit dates!');
  console.log(`📁 Saved to: ${outputFile}`);
  console.log(`📊 Total apps updated: ${Object.keys(results).length}`);
  console.log(`⏰ Last fetch: ${output.lastFetch}\n`);
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

