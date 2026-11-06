import { notFound } from "next/navigation";
import games from "../../games";
import GamePlayer from "./game-player";

type GamePageProps = {
  params: Promise<{ id: string }>;
};

export default async function GamePage({ params }: GamePageProps) {
  const { id } = await params;
  const game = games.find((item) => item.id === id);

  if (!game) {
    notFound();
  }

  return (
    <GamePlayer
      game={game}
      controlWsUrl={process.env.NEXT_PUBLIC_CONTROL_WS_URL}
    />
  );
}
