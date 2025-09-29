/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // можно оставить
  },
  // убираем basePath и assetPrefix для Vercel
};

export default nextConfig;
