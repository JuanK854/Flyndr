/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      // sql.js needs fs access on server
      config.externals = config.externals || [];
    }
    return config;
  },
  experimental: {
    serverComponentsExternalPackages: ['sql.js'],
  },
};

export default nextConfig;
