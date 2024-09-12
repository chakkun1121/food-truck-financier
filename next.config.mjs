/** @type {import('next').NextConfig} */
import nextPWA from "next-pwa";
const withPWA = nextPWA();
const nextConfig = {
  reactStrictMode: false,
  redirects: async () => {
    return [
      {
        source: "/register",
        destination: "/register/menu",
        permanent: true
      }
    ];
  }
};

export default withPWA(nextConfig);
