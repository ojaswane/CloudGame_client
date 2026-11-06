import rdr2_icon from "../public/rdr2_icon.avif"
import marvel_spiderman_icon from "../public/Marvel's_Spider-Man_icon.webp"
import gta_v_icon from "../public/gta5_icon.jpg"
import gta5_background from "../public/gta5_background.jpg"
import rdr2_background from "../public/RDR2_background.jpg"
import marvel_spiderman_background from "../public/spiderman_background.avif"
const games = [
    {
        id: "rdr2",
        sessionId: process.env.NEXT_PUBLIC_RDR2_SESSION_ID || "rdr2",
        name: "RDR 2",
        icon: rdr2_icon,
        background: rdr2_background,
        streamUrl: process.env.NEXT_PUBLIC_RDR2_STREAM_URL,
        type: "Adventure",
        description: "Explore a vast frontier in an epic western adventure.",
    },
    {
        id: "spiderman",
        sessionId: process.env.NEXT_PUBLIC_SPIDERMAN_SESSION_ID || "spiderman",
        name: "Marvel's Spider-Man",
        icon: marvel_spiderman_icon,
        background: marvel_spiderman_background,
        streamUrl: process.env.NEXT_PUBLIC_SPIDERMAN_STREAM_URL,
        type: "Action",
        description: "Swing through the city and take on its toughest foes.",
    },
    {
        id: "gta5",
        sessionId: process.env.NEXT_PUBLIC_GTA5_SESSION_ID || "gta5",
        name: "GTA V",
        icon: gta_v_icon,
        type: "Action",
        background: gta5_background,
        streamUrl: process.env.NEXT_PUBLIC_GTA5_STREAM_URL,
        description: "Dive into a sprawling crime story across Los Santos.",
    },
];

export type Game = (typeof games)[number];

export default games;