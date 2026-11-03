import { useState } from "react";
import Menu from "./ui/Menu";
import Game from "./game/Game";
import MovementController from "./input/MovementController";
import { Analytics } from "@vercel/analytics/react";

export default function App() {
  const [room, setRoom] = useState(null);

  if (typeof window !== "undefined" && window.matchMedia("(max-width: 1023px)").matches) {
    return (
      <main className="laptop-required">
        <p>Hey you gotta check this out on laptop! 😉</p>
      </main>
    );
  }

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
