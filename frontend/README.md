This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Game stream player

The game library's hold-to-play action opens a player at `/{gameId}/game`. To connect the game through the SDP/WebRTC control panel, add its WebSocket URL to `.env.local`:

```env
NEXT_PUBLIC_CONTROL_WS_URL=ws://your-control-host:8080
```

The player creates a session by sending `POST /sessions` with an `Idempotency-Key` header and the selected game's name, then connects to `/ws/sessions/{id}` using the returned session ID and exchanges an SDP offer and ICE candidates. The session request is proxied through the Next.js app; the WebSocket connection goes directly to the configured control-panel host. When `NEXT_PUBLIC_CONTROL_WS_URL` is unset, the player falls back to a browser-playable video URL:

```env
NEXT_PUBLIC_RDR2_STREAM_URL=https://your-stream-host/rdr2.mp4
NEXT_PUBLIC_SPIDERMAN_STREAM_URL=https://your-stream-host/spiderman.mp4
NEXT_PUBLIC_GTA5_STREAM_URL=https://your-stream-host/gta5.mp4
```

Only set the variables for games with an available stream. The player uses the browser's native video element and controls, so the stream server must allow browser access and provide a media format supported by the browser. Restart the dev server after changing `.env.local`.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
