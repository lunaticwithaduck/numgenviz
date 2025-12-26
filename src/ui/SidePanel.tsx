interface SidePanelProps {
  onRerender: () => void;
  gridSize: number;
  onGridSizeChange: (size: number) => void;
  selectedGenerator: string;
  onGeneratorChange: (generator: string) => void;
  generatorParams: any;
  onParameterChange: (
    generatorType: string,
    paramName: string,
    value: number | number[]
  ) => void;
}

export default function SidePanel({
  onRerender,
  gridSize,
  onGridSizeChange,
  selectedGenerator,
  onGeneratorChange,
  generatorParams,
  onParameterChange,
}: SidePanelProps) {
  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = "#005a99";
    e.currentTarget.style.transform = "translateY(-1px)";
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = "#007acc";
    e.currentTarget.style.transform = "translateY(0px)";
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      onGridSizeChange(value);
    }
  };

  const handleGeneratorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onGeneratorChange(e.target.value);
  };

  const renderParameterInputs = () => {
    const params = generatorParams[selectedGenerator];
    if (!params) return null;

    return Object.entries(params).map(([key, value]) => {
      if (Array.isArray(value)) {
        // Handle array parameters (like seeds for laggedFibonacci)
        return (
          <div key={key} style={sidePanelStyles.section}>
            <label style={sidePanelStyles.label}>
              {key}: [{value.slice(0, 3).join(", ")}...] ({value.length} items)
            </label>
            <input
              type="number"
              value={value[0]}
              onChange={(e) => {
                const newValue = parseInt(e.target.value) || 0;
                const newArray = Array.from(
                  { length: value.length },
                  (_, i) => newValue + i
                );
                onParameterChange(selectedGenerator, key, newArray);
              }}
              style={sidePanelStyles.input}
              placeholder={`First ${key} value`}
            />
          </div>
        );
      } else {
        // Handle number parameters
        return (
          <div key={key} style={sidePanelStyles.section}>
            <label style={sidePanelStyles.label}>
              {key}: {String(value)}
            </label>
            <input
              type="number"
              value={value as number}
              onChange={(e) => {
                const newValue = parseInt(e.target.value) || 0;
                onParameterChange(selectedGenerator, key, newValue);
              }}
              style={sidePanelStyles.input}
            />
          </div>
        );
      }
    });
  };

  const generatorOptions = [
    { value: "lcg", label: "Linear Congruential Generator (LCG)" },
    { value: "xorshift", label: "XORShift" },
    { value: "lfsr", label: "Linear Feedback Shift Register (LFSR)" },
    { value: "additiveCongruential", label: "Additive Congruential" },
    { value: "combinedLCG", label: "Combined LCG" },
    {
      value: "multiplicativeCongruential",
      label: "Multiplicative Congruential",
    },
    { value: "laggedFibonacci", label: "Lagged Fibonacci" },
    { value: "parkMiller", label: "Park-Miller Generator" },
    { value: "well512", label: "Well512 Generator" },
    { value: "xoshiro128", label: "Xoshiro128+ Generator" },
  ];

  return (
    <div style={sidePanelStyles.container}>
      <h3 style={sidePanelStyles.title}>Controls</h3>
      <div style={sidePanelStyles.section}>
        <label style={sidePanelStyles.label}>
          Grid Size: {gridSize}x{gridSize}
        </label>
        <input
          value={gridSize}
          onChange={handleSizeChange}
          style={sidePanelStyles.input}
        />
      </div>

      <div style={sidePanelStyles.section}>
        <label style={sidePanelStyles.label}>Generator:</label>
        <select
          value={selectedGenerator}
          onChange={handleGeneratorChange}
          style={sidePanelStyles.select}
        >
          {generatorOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Parameter inputs for the selected generator */}
      <div style={sidePanelStyles.section}>
        <h4 style={sidePanelStyles.label}>Parameters:</h4>
        {renderParameterInputs()}
      </div>

      <div style={sidePanelStyles.section}>
        <button
          onClick={onRerender}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={sidePanelStyles.button}
        >
          Rerender Grid
        </button>
      </div>
    </div>
  );
}

const sidePanelStyles = {
  container: {
    width: "250px",
    minHeight: "100vh",
    height: "100%",
    backgroundColor: "#f5f5f5",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column" as const,
    gap: "20px",
  },
  title: {
    margin: "0 0 10px 0",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
    borderBottom: "2px solid #007acc",
    paddingBottom: "5px",
  },
  section: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "10px",
  },
  button: {
    padding: "12px 16px",
    backgroundColor: "#007acc",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    transition: "all 0.2s ease",
  },
  label: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "8px",
  },
  input: {
    padding: "8px",
    border: "1px solid #ddd",
    borderRadius: "4px",
  },
  select: {
    padding: "8px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    backgroundColor: "white",
    fontSize: "14px",
  },
} as const;
