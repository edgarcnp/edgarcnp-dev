import { readFileSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

// Read version from package.json
let appVersion = 'unknown';
try {
    const packageJson = JSON.parse(
        readFileSync(join(process.cwd(), 'package.json'), 'utf8')
    );
    appVersion = packageJson.version || 'unknown';
} catch (error) {
    console.error('Could not read package.json:', error);
}

// Get git commit hash
let commitHash = 'unknown';
try {
    commitHash = execSync('git rev-parse --short HEAD').toString().trim();
} catch (error) {
    console.error('Could not get git commit hash:', error);
}

// Get git branch name
let gitBranch = 'unknown';
try {
    gitBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
} catch (error) {
    console.error('Could not get git branch name:', error);
}

/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_APP_VERSION: appVersion,
        NEXT_PUBLIC_COMMIT_HASH: commitHash,
        NEXT_PUBLIC_GIT_BRANCH: gitBranch,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        unoptimized: true,
    },
}

export default nextConfig
