/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  redirects: async () => {
    return [
      {
        source: "/register",
        destination: "/register/menu",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
