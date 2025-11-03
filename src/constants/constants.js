export const LOTTO = {
  PRICE: 1000,
  MIN_NUMBER: 1,
  MAX_NUMBER: 45,
  COUNT: 6,
};

export const WINNING_CRITERIA = [
  { matchCount: 3, isBonus: false, prize: 5_000 },
  { matchCount: 4, isBonus: false, prize: 50_000 },
  { matchCount: 5, isBonus: false, prize: 1_500_000 },
  { matchCount: 5, isBonus: true, prize: 30_000_000 },
  { matchCount: 6, isBonus: false, prize: 2_000_000_000 },
];
