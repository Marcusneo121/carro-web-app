/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        port: "",
        pathname: "/download/storage/v1/b/carro-backend-storage/o/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      },
    ],
    // domains: ["storage.googleapis.com", "firebasestorage.googleapis.com"],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
};

export default nextConfig;
