const fs = require('fs');
const https = require('https');

const bundlePath = 'C:\\Users\\alifa\\.gemini\\antigravity-ide\\brain\\75188933-3055-46c1-b6e3-4020b489930a\\scratch\\bundle.json';
const bundle = JSON.parse(fs.readFileSync(bundlePath, 'utf8'));

const owner = 'alifalarisa-cloud';
const repo = 'vitasync';
const branch = 'main';

// Read token from args
const token = process.argv[2];
if (!token) {
  console.error('Usage: node push_to_github.js <github_token>');
  process.exit(1);
}

function apiRequest(method, apiPath, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const options = {
      hostname: 'api.github.com',
      port: 443,
      path: apiPath,
      method: method,
      headers: {
        'Authorization': `token ${token}`,
        'User-Agent': 'VitaSync-Pusher',
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json',
      }
    };
    if (data) {
      options.headers['Content-Length'] = Buffer.byteLength(data);
    }

    const req = https.request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => responseData += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(responseData) });
        } catch(e) {
          resolve({ status: res.statusCode, body: responseData });
        }
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

async function pushFiles() {
  const files = Object.keys(bundle);
  console.log(`Pushing ${files.length} files to ${owner}/${repo}...`);
  let success = 0, failed = 0;

  for (const filename of files) {
    const content = bundle[filename];
    const encoded = Buffer.from(content).toString('base64');

    // Check if file exists to get SHA
    let sha = undefined;
    try {
      const getRes = await apiRequest('GET', `/repos/${owner}/${repo}/contents/${filename}`);
      if (getRes.status === 200 && getRes.body && getRes.body.sha) {
        sha = getRes.body.sha;
      }
    } catch(e) {}

    const putBody = {
      message: `Add ${filename} - VitaSync initial commit`,
      content: encoded,
      branch: branch
    };
    if (sha) putBody.sha = sha;

    try {
      const putRes = await apiRequest('PUT', `/repos/${owner}/${repo}/contents/${filename}`, putBody);
      if (putRes.status === 200 || putRes.status === 201) {
        console.log(`✓ [${success + 1}/${files.length}] Pushed: ${filename}`);
        success++;
      } else {
        console.error(`✗ Failed: ${filename} - Status: ${putRes.status} - ${JSON.stringify(putRes.body).slice(0, 150)}`);
        failed++;
      }
    } catch(e) {
      console.error(`✗ Error pushing ${filename}:`, e.message);
      failed++;
    }
  }

  console.log(`\n=============================`);
  console.log(`Done! ${success} pushed, ${failed} failed.`);
  console.log(`Repository: https://github.com/${owner}/${repo}`);
}

pushFiles().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
