import GamePlayer from "@/components/games/GamePlayer";

export default async function GamePage({ params }: { params: Promise<{ gameId: string }> }) {
  const { gameId } = await params;
  return <GamePlayer gameId={gameId} />;
}
