// linear congruential generator
export function* lcg(
  seed: number,
  a = 1664525,
  c = 1013904223,
  m = 2 ** 32
): Generator<number> {
  let state = seed >>> 0;
  while (true) {
    state = (a * state + c) % m;
    yield state;
  }
}

// xor shift generator
export function* xorshift(seed: number): Generator<number> {
  let state = seed >>> 0;
  while (true) {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    yield state >>> 0;
  }
}

// middle square method generator
export function* middleSquare(seed: number): Generator<number> {
  let state = Math.abs(seed) % 100000000;
  if (state === 0) state = 12345678;
  while (true) {
    const squared = (state * state).toString().padStart(16, "0");
    const middle = squared.slice(4, 12);
    state = parseInt(middle);
    if (state === 0) {
      state = 12345678;
    }
    yield state;
  }
}

// additive congruential generator
export function* additiveCongruential(
  seed1: number,
  seed2: number,
  m = 2 ** 32
): Generator<number> {
  let state1 = seed1 >>> 0;
  let state2 = seed2 >>> 0;
  while (true) {
    const next = (state1 + state2) % m;
    yield next;
    state1 = state2;
    state2 = next;
  }
}

// combined linear congruential generator
export function* combinedLCG(
  seed1: number,
  seed2: number,
  a1 = 1664525,
  c1 = 1013904223,
  a2 = 22695477,
  c2 = 1,
  m = 2 ** 32
): Generator<number> {
  let state1 = seed1 >>> 0;
  let state2 = seed2 >>> 0;
  while (true) {
    state1 = (a1 * state1 + c1) % m;
    state2 = (a2 * state2 + c2) % m;
    yield (state1 - state2 + m) % m;
  }
}

// multiplicative congruential generator
export function* multiplicativeCongruential(
  seed: number,
  a = 48271,
  m = 2 ** 31 - 1
): Generator<number> {
  let state = seed >>> 0;
  while (true) {
    state = (a * state) % m;
    yield state;
  }
}

// lagged Fibonacci generator
export function* laggedFibonacci(
  seeds: number[],
  j = 24,
  k = 55,
  m = 2 ** 32
): Generator<number> {
  const buffer = seeds.map((s) => s >>> 0);
  let index = 0;
  while (true) {
    const next = (buffer[(index + k - j) % k] + buffer[index % k]) % m;
    buffer[index % k] = next;
    yield next;
    index++;
  }
}
