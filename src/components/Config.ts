const A = 1;
const B = 2;
const B_N = 3;
const B_E = 4;
const B_S = 5;
const B_W = 6;
const C = 7;
const C_N = 8;
const C_E = 9;
const C_S = 10;
const C_W = 11;

const TILE_A = 0;
const TILE_B = 1;
const TILE_B_N = 2;
const TILE_B_E = 3;
const TILE_B_S = 4;
const TILE_B_W = 5;
const TILE_B_NE = 6;
const TILE_B_SE = 7;
const TILE_B_SW = 8;
const TILE_B_NW = 9;
const TILE_C = 10;
const TILE_C_N = 11;
const TILE_C_E = 12;
const TILE_C_S = 13;
const TILE_C_W = 14;
const TILE_C_NE = 15;
const TILE_C_SE = 16;
const TILE_C_SW = 17;
const TILE_C_NW = 18;

export const TILE_RULES: Record<number, [number, number, number, number]> = {
  [TILE_A]: [A, A, A, A],
  [TILE_B]: [B, B, B, B],
  [TILE_B_N]: [A, B_N, B, B_N],
  [TILE_B_E]: [B_E, A, B_E, B],
  [TILE_B_S]: [B, B_S, A, B_S],
  [TILE_B_W]: [B_W, B, B_W, A],
  [TILE_B_NE]: [A, A, B_E, B_N],
  [TILE_B_SE]: [B_E, A, A, B_S],
  [TILE_B_SW]: [B_W, B_S, A, A],
  [TILE_B_NW]: [A, B_N, B_W, A],
  [TILE_C]: [C, C, C, C],
  [TILE_C_N]: [A, C_N, C, C_N],
  [TILE_C_E]: [C_E, A, C_E, C],
  [TILE_C_S]: [C, C_S, A, C_S],
  [TILE_C_W]: [C_W, C, C_W, A],
  [TILE_C_NE]: [A, A, C_E, C_N],
  [TILE_C_SE]: [C_E, A, A, C_S],
  [TILE_C_SW]: [C_W, C_S, A, A],
  [TILE_C_NW]: [A, C_N, C_W, A],
};

export const TILE_WEIGHTS: Record<number, number> = {
  [TILE_A]: 128,
  [TILE_B]: 16,
  [TILE_B_N]: 4,
  [TILE_B_E]: 4,
  [TILE_B_S]: 4,
  [TILE_B_W]: 4,
  [TILE_B_NE]: 2,
  [TILE_B_SE]: 2,
  [TILE_B_SW]: 2,
  [TILE_B_NW]: 2,
  [TILE_C]: 16,
  [TILE_C_N]: 4,
  [TILE_C_E]: 4,
  [TILE_C_S]: 4,
  [TILE_C_W]: 4,
  [TILE_C_NE]: 2,
  [TILE_C_SE]: 2,
  [TILE_C_SW]: 2,
  [TILE_C_NW]: 2,
};
