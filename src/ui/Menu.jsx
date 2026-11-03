import { useState } from "react";
import MenuOverlay from "./MenuOverlay";
import { colyseus } from "../net/colyseusClient";
import { ROOM_NAME } from "../config/network";

export default function Menu({ onStart }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [name, setName] = useState(() => window.localStorage.getItem("snowman-name") || "");

  const play = async () => {
    try {
      setLoading(true);
      setError(null);

      const playerName = name.trim().slice(0, 20) || "Snowman";
      window.localStorage.setItem("snowman-name", playerName);
      const room = await colyseus.joinOrCreate(ROOM_NAME, { name: playerName });
      setLoading(false); // Ensure loading is set to false after successful join
      onStart(room);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to connect");
      setLoading(false); // Ensure loading is set to false on error
    }
  };

  return <MenuOverlay
    onPlay={play}
    loading={loading}
    error={error}
    name={name}
    onNameChange={setName}
  />;
}
