import { spawn } from 'child_process';

const testUrls = [
  'http://localhost:3000/',
  'http://localhost:3000/services',
  'http://localhost:3000/contact',
];

async function runTests() {
  console.log("Starting Next.js production server for testing...");
  // Use 'npm start' which runs Next.js in production mode
  const server = spawn('npm', ['start'], { stdio: 'pipe' });

  let serverStarted = false;
  
  // Wait for the server to output that it's ready
  server.stdout.on('data', (data) => {
    const output = data.toString();
    if (output.includes('Ready in') || output.includes('started server on') || output.includes('Listening on port') || output.includes('Local:')) {
      serverStarted = true;
    }
  });

  // Wait up to 10 seconds for server to start
  for (let i = 0; i < 10; i++) {
    if (serverStarted) break;
    await new Promise(r => setTimeout(r, 1000));
  }

  if (!serverStarted) {
    console.log("⚠️ Server might not be fully started, attempting tests anyway after 10s wait.");
  }

  let passed = true;

  console.log("\n--- FRONTEND TESTS ---");
  for (const url of testUrls) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        console.log(`✅ GET ${new URL(url).pathname} -> ${res.status} OK`);
      } else {
        console.log(`❌ GET ${new URL(url).pathname} -> ${res.status}`);
        passed = false;
      }
    } catch (e) {
      console.log(`❌ GET ${new URL(url).pathname} -> ERROR: ${e.message}`);
      passed = false;
    }
  }

  console.log("\n--- BACKEND TESTS (/api/contact) ---");
  try {
    const payload = {
      name: 'Integration Test User',
      email: 'test@crownmedia.local',
      serviceOfInterest: 'Test Service',
      message: 'Automated test message.'
    };
    
    const res = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    const data = await res.json();
    if (res.ok && data.success) {
      console.log(`✅ POST /api/contact -> ${res.status} OK`);
      console.log(`   Response Message: "${data.message}"`);
    } else {
      console.log(`❌ POST /api/contact -> ${res.status}`);
      console.log(`   Response Data:`, data);
      passed = false;
    }
  } catch (e) {
    console.log(`❌ POST /api/contact -> ERROR: ${e.message}`);
    passed = false;
  }

  console.log("\nCleaning up...");
  server.kill('SIGTERM');

  if (passed) {
    console.log("\n🚀 ALL TESTS PASSED SUCCESSFULLY! FRONTEND & BACKEND ARE FULLY OPERATIONAL.");
  } else {
    console.log("\n⚠️ SOME TESTS FAILED.");
  }
  
  process.exit(passed ? 0 : 1);
}

runTests();
