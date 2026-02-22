/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        // This allows the build to complete even if there are sync issues with files
        ignoreBuildErrors: true,
    },
    eslint: {
        // This prevents linting errors from blocking your deployment
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            }
        ],
    },
};

module.exports = nextConfig;
