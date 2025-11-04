import { readFileSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

/**
 * Reads and parses the package.json file to extract the version
 * @returns {string} The application version or 'unknown' if not found
 */
const getAppVersion = () => {
    /** @type {string} */
    let appVersion = 'unknown';

    try {
        const packageJsonPath = join(process.cwd(), 'package.json');
        const packageJsonContent = readFileSync(packageJsonPath, 'utf8');
        /** @type {any} */
        const packageJson = JSON.parse(packageJsonContent);

        if (typeof packageJson.version === 'string') {
            appVersion = packageJson.version;
        }
    } catch (error) {
        console.error('Could not read package.json:', error);
    }

    return appVersion;
};

/**
 * Gets the git commit hash
 * @returns {string} The commit hash or 'unknown' if not found
 */
const getCommitHash = () => {
    /** @type {string} */
    let commitHash = 'unknown';

    try {
        const output = execSync('git rev-parse --short HEAD', { encoding: 'utf8' });
        commitHash = output.toString().trim();
    } catch (error) {
        console.error('Could not get git commit hash:', error);
    }

    return commitHash;
};

/**
 * Gets the git branch name following the priority:
 * 1. CF environment variable (CF_DEPLOY_GIT_BRANCH)
 * 2. Local git branch
 * 3. Fallback to 'unknown'
 * @returns {string} The git branch name or 'unknown' if not found
 */
const getGitBranch = () => {
    /** @type {string} */
    let gitBranch = 'unknown';

    try {
        // 1. Try to fetch from CF env
        const cfBranch = process.env.CF_DEPLOY_GIT_BRANCH;
        if (cfBranch && typeof cfBranch === 'string') {
            gitBranch = cfBranch;
        } else {
            // 2. If step 1 fails, try to fetch local git branch name
            const output = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' });
            gitBranch = output.toString().trim();

            // Ensure branch name is not empty
            if (!gitBranch || gitBranch === '') {
                gitBranch = 'unknown';
            }
        }
    } catch (error) {
        console.error('Could not get git branch name:', error);
        // 3. Fallback to 'unknown' (already set as default)
    }

    return gitBranch;
};

/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_APP_VERSION: getAppVersion(),
        NEXT_PUBLIC_COMMIT_HASH: getCommitHash(),
        NEXT_PUBLIC_GIT_BRANCH: getGitBranch(),
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        unoptimized: true,
    },
}

export default nextConfig
