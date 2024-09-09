import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Food Truck Financier",
    start_url: "/",
    display: "fullscreen",
    icons: [
      {
        src: "https://placehold.jp/fff2e6/000000/512x512.png?text=Food",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    background_color: "#fff2e6",
    theme_color: "#ff9933",
  };
}
