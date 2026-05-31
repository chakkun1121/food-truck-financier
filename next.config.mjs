/** @type {import('next').NextConfig} */
import nextPWA from "next-pwa";
const withPWA = nextPWA();
const nextConfig = {
  reactStrictMode: true,
  turbopack: {},
  redirects: async () => {
    return [
      {
        source: "/register",
        destination: "/register/menu",
        permanent: true
      }
    ];
  },
  allowedDevOrigins: ["192.168.*.*"]
};

export default withPWA(nextConfig);
