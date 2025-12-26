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

// linear feedback shift register generator
export function* lfsr(seed: number, taps = 0xb400): Generator<number> {
  let state = seed >>> 0;
  if (state === 0) state = 1;
  while (true) {
    let bit = 0;
    let temp = state & taps;
    while (temp) {
      bit ^= temp & 1;
      temp >>>= 1;
    }
    state = (state >>> 1) | (bit << 15);
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

// Park-Miller generator (minimal standard)
export function* parkMiller(seed: number): Generator<number> {
  let state = seed >>> 0;
  if (state === 0) state = 1;
  while (true) {
    state = (16807 * state) % 2147483647;
    yield state;
  }
}

// Well512 generator (simplified version)
export function* well512(seed: number): Generator<number> {
  const state = new Array(16);
  let index = 0;
  for (let i = 0; i < 16; i++) {
    state[i] = (seed + i * 1812433253) >>> 0;
  }

  while (true) {
    const a = state[index];
    const c = state[(index + 13) & 15];
    const b = a ^ c ^ (a << 16) ^ (c << 15);
    const d = state[(index + 9) & 15] ^ (b >>> 11);
    state[index] = d;
    index = (index + 15) & 15;
    yield d;
  }
}

// Simple Xoshiro128+ generator
export function* xoshiro128(
  seed1: number = 1,
  seed2: number = 2,
  seed3: number = 3,
  seed4: number = 4
): Generator<number> {
  let s0 = seed1 >>> 0;
  let s1 = seed2 >>> 0;
  let s2 = seed3 >>> 0;
  let s3 = seed4 >>> 0;

  const rotl = (x: number, k: number) => ((x << k) | (x >>> (32 - k))) >>> 0;

  while (true) {
    const result = (s0 + s3) >>> 0;
    const t = (s1 << 9) >>> 0;
    s2 ^= s0;
    s3 ^= s1;
    s1 ^= s2;
    s0 ^= s3;
    s2 ^= t;
    s3 = rotl(s3, 11);
    yield result;
  }
}
