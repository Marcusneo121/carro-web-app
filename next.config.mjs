/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
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
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/v0/b/p2p-car-sharing.appspot.com/o/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "p2p-makerlab.s3.amazonaws.com",
        port: "",
      },
    ],
    domains: ["p2p-makerlab.s3.amazonaws.com"],
    path: "/_next/image",
    loader: "default",
    // domains: ["storage.googleapis.com", "firebasestorage.googleapis.com"],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
};

export default nextConfig;
