import rdr2_icon from "../public/rdr2_icon.avif"
import marvel_spiderman_icon from "../public/Marvel's_Spider-Man_icon.webp"
import gta_v_icon from "../public/gta5_icon.jpg"
import gta5_background from "../public/gta5_background.jpg"
import rdr2_background from "../public/RDR2_background.jpg"
import marvel_spiderman_background from "../public/spiderman_background.avif"
const games = [
    {
        name: "RDR 2",
        className: "game-art--neon",
        icon: rdr2_icon,
        background: rdr2_background,
        type: "Adventure",
        description: "Explore a vast frontier in an epic western adventure.",
    },
    {
        name: "Marvel's Spider-Man",
        className: "game-art--blue",
        icon: marvel_spiderman_icon,
        background: marvel_spiderman_background,
        type: "Action",
        description: "Swing through the city and take on its toughest foes.",
    },
    {
        name: "GTA V",
        className: "game-art--red",
        icon: gta_v_icon,
        type: "Action",
        background: gta5_background,
        description: "Dive into a sprawling crime story across Los Santos.",
    },
];

export default games;