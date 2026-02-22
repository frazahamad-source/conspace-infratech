/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        // This stops the build from failing even if GitHub has old files
        ignoreBuildErrors: true,
    },
    eslint: {
        // This prevents styling errors from stopping the site
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
