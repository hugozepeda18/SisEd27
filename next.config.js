/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  env: {
    NEXTAUTH_SECRET:"secret",
  },
}

module.exports = nextConfig
