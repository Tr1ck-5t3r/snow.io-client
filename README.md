src/
│     ├─ main.jsx
│     ├─ App.jsx
│     │
│     ├─ config/
│     │  ├─ constants.js           # speeds, gravity, tick rates
│     │  └─ network.js             # endpoints, room names
│     │
│     ├─ game/                     # Game orchestration
│     │  ├─ Game.jsx               # Mounts scene + systems
│     │  ├─ GameLoop.js            # Fixed tick & delta handling
│     │  └─ GameContext.js         # Global refs (player, room)
│     │
│     ├─ scene/                    # World layout
│     │  ├─ Scene.jsx
│     │  ├─ Lighting.jsx
│     │  └─ Sky.jsx
│     │
│     ├─ world/                    # Static world geometry
│     │  ├─ Ground.jsx
│     │  ├─ Walls.jsx
│     │  ├─ Obstructions.jsx
│     │  └─ WorldBounds.js
│     │
│     ├─ player/
│     │  ├─ Player.jsx             # Local player entity
│     │  ├─ RemotePlayer.jsx       # Other players
│     │  ├─ FPSCamera.jsx
│     │  └─ PlayerModel.jsx
│     │
│     ├─ input/
│     │  ├─ useKeyboard.js
│     │  ├─ useMouse.js
│     │  └─ useInput.js            # Unified input state
│     │
│     ├─ movement/
│     │  ├─ useMovement.js         # Delta-based movement
│     │  ├─ useGravity.js
│     │  └─ useCollision.js        # AABB / Rapier wrapper
│     │
│     ├─ physics/                  # Optional (Phase 2)
│     │  ├─ PhysicsWorld.jsx
│     │  └─ RapierConfig.js
│     │
│     ├─ net/
│     │  ├─ colyseusClient.js
│     │  ├─ useNetwork.js
│     │  ├─ prediction.js
│     │  └─ interpolation.js
│     │
│     ├─ ui/                       # HTML overlays
│     │  ├─ Menu.jsx
│     │  ├─ HUD.jsx
│     │  ├─ Crosshair.jsx
│     │  └─ LoadingOverlay.jsx
│     │
│     ├─ utils/
│     │  ├─ math.js
│     │  ├─ aabb.js
│     │  ├─ time.js
│     │  └─ ids.js
│     │
│     └─ styles/
│        ├─ game.css
│        └─ ui.css