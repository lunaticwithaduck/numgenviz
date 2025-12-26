### _Pseudo-Random Number Generator Visualizer_

> A real-time interactive visualization tool for exploring the visual patterns and statistical properties of different PRNG algorithms.

![NumGenViz Screenshot](screenshot.png)

## Features

- **Real-time Visualization** - See randomness patterns as grayscale grids
- **Full Parameter Control** - Customize every algorithm parameter
- **Interactive Regeneration** - Instantly rerender with new parameters
- **Dynamic Grid Sizing** - Scale visualization from 10x10 to 200x200
- **High Performance** - Built with React, TypeScript, and Canvas rendering

## Supported Algorithms

| Generator                                 | Type              | Key Features                                |
| ----------------------------------------- | ----------------- | ------------------------------------------- |
| **Linear Congruential (LCG)**             | Classic           | Customizable multiplier, increment, modulus |
| **XORShift**                              | Bit-shift         | Fast, simple operations                     |
| **Linear Feedback Shift Register (LFSR)** | Hardware          | Configurable tap polynomials                |
| **Additive Congruential**                 | Fibonacci-like    | Dual seed system                            |
| **Combined LCG**                          | Enhanced LCG      | Better statistical properties               |
| **Multiplicative Congruential**           | Simple LCG        | Minimal parameter set                       |
| **Lagged Fibonacci**                      | Complex state     | Long period, 55-element buffer              |
| **Park-Miller**                           | Industry standard | Minimal standard generator                  |
| **Well512**                               | Modern            | High-quality equidistribution               |
| **Xoshiro128+**                           | State-of-the-art  | Excellent performance and quality           |

## Usage

1. **Select Generator**: Choose any PRNG algorithm from the dropdown
2. **Adjust Parameters**: Fine-tune algorithm-specific parameters in real-time
3. **Set Grid Size**: Control visualization resolution (10-200)
4. **Generate**: Click "Rerender Grid" to visualize the current configuration
5. **Explore**: Compare different algorithms and parameter combinations

## Visualization Details

Each pixel in the grid represents one generated number:

- **Black pixels**: Lower values (approaching 0)
- **White pixels**: Higher values (approaching maximum)
- **Gray scale**: Full spectrum of generated values normalized to 0-255

Patterns reveal the statistical properties and potential biases of each algorithm.

## Technology Stack

- **React 18** - Modern UI framework
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Canvas API** - High-performance rendering
- **CSS-in-JS** - Component-scoped styling
