/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: "cdn.bio.link",
            }, {
                protocol: "https",
                hostname: "res.cloudinary.com",
            }
        ]
    }
}

module.exports = nextConfig
