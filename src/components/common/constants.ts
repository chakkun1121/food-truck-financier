import { TbBottle, TbBurger } from "react-icons/tb";
import { FaCocktail } from "react-icons/fa";

const colors = {
    pastel: {
        green: "#CFDDDB",
        blue: "#C2DBE9",
        pink: "#E4CDED",
        purple: "#C9CAEF",
        red: "#F1C8D0"
    },
    pastelLight: {
        green: "#90EE90",
        blue: "#ADD8E6",
        pink: "#FFB6C1",
        purple: "#DDA0DD",
        red: "#FA8072"
    }
};

export const CATEGORIES = [
    {
        id: 'pet',
        name: "ペットボトル",
        icon: TbBottle,
        class: {
            bg: "bg-[#ADD8E6]",
            text: "text-[#ADD8E6]",
            border: "border-[#ADD8E6]"
        }
    },
    {
        id: 'food',
        name: 'フード',
        icon: TbBurger,
        class: {
            bg: "bg-[#FA8072]",
            text: "text-[#FA8072]",
            border: "border-[#FA8072]"
        }
    },
    {
        id: 'drink',
        name: 'ドリンク',
        icon: FaCocktail,
        class: {
            bg: "bg-[#90EE90]",
            text: "text-[#90EE90]",
            border: "border-[#90EE90]"
        }
    }
];
