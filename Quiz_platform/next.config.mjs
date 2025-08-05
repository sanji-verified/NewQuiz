/** @type {import('next').NextConfig} */
const nextConfig = {
  // This tells Next.js to build your application into static HTML, CSS, and JS files
  // that can be served by any static web server, like GitHub Pages.
  output: 'export',

  // When using `output: 'export'`, Next.js's built-in Image Optimization (which requires a server)
  // is not available. Setting `unoptimized: true` tells Next.js to serve images as-is,
  // without attempting server-side optimization.
  images: {
    unoptimized: true,
  },

  // `ignoreDuringBuilds: true` tells Next.js to skip ESLint checks during the build process.
  // This can speed up builds, but it's generally recommended to run ESLint separately
  // (e.g., as a pre-commit hook or a separate CI step) to catch issues.
  eslint: {
    ignoreDuringBuilds: true,
  },

  // `ignoreBuildErrors: true` tells Next.js to ignore TypeScript errors during the build.
  // Similar to ESLint, this can speed up builds but should be used with caution.
  // It's best practice to fix TypeScript errors rather than ignoring them.
  typescript: {
    ignoreBuildErrors: true,
  },

  // If your GitHub Pages site is hosted at a URL like `yourusername.github.io/your-repo-name/`,
  // then `your-repo-name` is your base path. You need to tell Next.js about this.
  // Uncomment and replace 'your-repo-name' with the actual name of your GitHub repository.
  // If your site is hosted at the root (e.g., `yourusername.github.io`), you can remove this line.
  // basePath: '/your-repo-name',

  // Enables additional checks and warnings for potential problems in a React application.
  // It runs only in development mode and does not affect the production build.
  reactStrictMode: true,
};

export default nextConfig;
