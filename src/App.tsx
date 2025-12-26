import { StrictMode, useState, useCallback } from "react";
import { createRoot } from "react-dom/client";
import Grid from "./ui/Grid";
import SidePanel from "./ui/SidePanel";
import {
  lcg,
  xorshift,
  lfsr,
  additiveCongruential,
  combinedLCG,
  multiplicativeCongruential,
  laggedFibonacci,
  parkMiller,
  well512,
  xoshiro128,
} from "./logic/generators";

function App() {
  const [size, setSize] = useState(315);
  const [selectedGenerator, setSelectedGenerator] = useState("lcg");

  const [generatorParams, setGeneratorParams] = useState({
    lcg: { seed: 12345, a: 1664525, c: 1013904223, m: 2 ** 32 },
    xorshift: { seed: 12345 },
    lfsr: { seed: 12345, taps: 0xb400 },
    additiveCongruential: { seed1: 12345, seed2: 67890, m: 2 ** 32 },
    combinedLCG: {
      seed1: 12345,
      seed2: 67890,
      a1: 1664525,
      c1: 1013904223,
      a2: 22695477,
      c2: 1,
      m: 2 ** 32,
    },
    multiplicativeCongruential: { seed: 12345, a: 48271, m: 2 ** 31 - 1 },
    laggedFibonacci: {
      seeds: Array.from({ length: 55 }, (_, i) => 12345 + i),
      j: 24,
      k: 55,
      m: 2 ** 32,
    },
    parkMiller: { seed: 12345 },
    well512: { seed: 12345 },
    xoshiro128: { seed1: 1, seed2: 2, seed3: 3, seed4: 4 },
  });

  const getGenerator = (generatorType: string, params: any) => {
    switch (generatorType) {
      case "lcg":
        return lcg(params.seed, params.a, params.c, params.m);
      case "xorshift":
        return xorshift(params.seed);
      case "lfsr":
        return lfsr(params.seed, params.taps);
      case "additiveCongruential":
        return additiveCongruential(params.seed1, params.seed2, params.m);
      case "combinedLCG":
        return combinedLCG(
          params.seed1,
          params.seed2,
          params.a1,
          params.c1,
          params.a2,
          params.c2,
          params.m
        );
      case "multiplicativeCongruential":
        return multiplicativeCongruential(params.seed, params.a, params.m);
      case "laggedFibonacci":
        return laggedFibonacci(params.seeds, params.j, params.k, params.m);
      case "parkMiller":
        return parkMiller(params.seed);
      case "well512":
        return well512(params.seed);
      case "xoshiro128":
        return xoshiro128(
          params.seed1,
          params.seed2,
          params.seed3,
          params.seed4
        );
      default:
        return lcg(params.seed, params.a, params.c, params.m);
    }
  };

  const generateWeights = useCallback(() => {
    const params =
      generatorParams[selectedGenerator as keyof typeof generatorParams];
    const gen = getGenerator(selectedGenerator, params);
    return Array.from({ length: size * size }, () => gen.next().value);
  }, [size, selectedGenerator, generatorParams]);

  const handleParameterChange = (
    generatorType: string,
    paramName: string,
    value: number | number[]
  ) => {
    setGeneratorParams((prev) => ({
      ...prev,
      [generatorType]: {
        ...prev[generatorType as keyof typeof prev],
        [paramName]: value,
      },
    }));
  };

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
        generatorParams={generatorParams}
        onParameterChange={handleParameterChange}
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
