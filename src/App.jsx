import { useState } from "react";
import Menu from "./ui/Menu";
import Game from "./game/Game";

export default function App() {
  const [room, setRoom] = useState(null);

  return room ? (
    <main>
      <Game room={room} />
    </main>
  ) : (
    <main>
      <Menu onStart={setRoom} />
    </main>
  );
}
