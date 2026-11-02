import { useState } from "react";
import Menu from "./ui/Menu";
import Game from "./game/Game";
import MovementController from "./input/MovementController";
import { Analytics } from "@vercel/analytics/react";

export default function App() {
  const [room, setRoom] = useState(null);

  return room ? (
    <main>
      <Game room={room} />
      <Analytics />
    </main>
  ) : (
    <main>
      <Menu onStart={setRoom} />
      <Analytics />
    </main>
  );
}
