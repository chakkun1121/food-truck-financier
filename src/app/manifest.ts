import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Food Truck Financier",
    start_url: "/",
    display: "fullscreen",
    icons: [
      {
        src: "https://placehold.jp/3d4070/ffffff/512x512.png?text=Food",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
