/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
  experimental: {
    serverActions: true,
  },
  experimental: {
    // don't bundle the package
    serverComponentsExternalPackages: ['@google-cloud/datastore'],
    // enable alpha server actions
    serverActions: true,
  },  
}

module.exports = nextConfig
