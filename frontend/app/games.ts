import rdr2_icon from "../public/rdr2_icon.avif"
import marvel_spiderman_icon from "../public/Marvel's_Spider-Man_icon.webp"
import gta_v_icon from "../public/gta5_icon.jpg"

const games = [
    {
        name: "RDR 2",
        className: "game-art--neon",
        shape: "orb",
        icon: rdr2_icon,
        type: "Adventure",
        description: "Explore a vast frontier in an epic western adventure.",
    },
    {
        name: "Marvel's Spider-Man",
        className: "game-art--blue",
        shape: "moon",
        icon: marvel_spiderman_icon,
        type: "Action",
        description: "Swing through the city and take on its toughest foes.",
    },
    {
        name: "GTA V",
        className: "game-art--red",
        shape: "glow",
        icon: gta_v_icon,
        type: "Action",
        description: "Dive into a sprawling crime story across Los Santos.",
    },
];

export default games;