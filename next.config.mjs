/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // важно! экспортируем статику
  images: {
    unoptimized: true, // чтобы работало на GH Pages
  },
  basePath: "/kcc-company", // вместо REPO_NAME — имя репозитория
  assetPrefix: "/kcc-company/",
};

export default nextConfig;
