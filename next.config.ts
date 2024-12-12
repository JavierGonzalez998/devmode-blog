import path from 'path';
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@emoji-datasource-facebook': path.resolve(
        __dirname,
        'node_modules/emoji-datasource-facebook/img/facebook/64/'
      ),
      
    };
    return config;
  },
};

export default nextConfig;