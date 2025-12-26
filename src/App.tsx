import { StrictMode, useState, useCallback } from "react";
import { createRoot } from "react-dom/client";
import Grid from "./ui/Grid";
import SidePanel from "./ui/SidePanel";
import {
  lcg,
  xorshift,
  middleSquare,
  additiveCongruential,
  combinedLCG,
  multiplicativeCongruential,
  laggedFibonacci,
} from "./logic/generators";

function App() {
  const [size, setSize] = useState(1000);
  const [selectedGenerator, setSelectedGenerator] = useState("lcg");

  const getGenerator = (generatorType: string, seed: number) => {
    switch (generatorType) {
      case "lcg":
        return lcg(seed);
      case "xorshift":
        return xorshift(seed);
      case "middleSquare":
        return middleSquare(seed);
      case "additiveCongruential":
        return additiveCongruential(seed, seed + 1);
      case "combinedLCG":
        return combinedLCG(seed, seed + 1);
      case "multiplicativeCongruential":
        return multiplicativeCongruential(seed);
      case "laggedFibonacci":
        const seeds = Array.from({ length: 55 }, (_, i) => seed + i);
        return laggedFibonacci(seeds);
      default:
        return lcg(seed);
    }
  };

  const generateWeights = useCallback(() => {
    const gen = getGenerator(
      selectedGenerator,
      Math.floor(Math.random() * 100000)
    );
    return Array.from({ length: size * size }, () => gen.next().value);
  }, [size, selectedGenerator]);

  const [weights, setWeights] = useState(() => generateWeights());

  const handleRerender = useCallback(() => {
    const newWeights = generateWeights();
    setWeights(newWeights);
  }, [generateWeights]);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <SidePanel
        onRerender={handleRerender}
        gridSize={size}
        onGridSizeChange={setSize}
        selectedGenerator={selectedGenerator}
        onGeneratorChange={setSelectedGenerator}
      />
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid size={size} weights={weights} />
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
