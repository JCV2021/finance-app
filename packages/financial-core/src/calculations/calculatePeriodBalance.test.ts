import { describe, expect, it } from "vitest";
import {
  calculatePeriodBalance,
  type PeriodMovement,
} from "./calculatePeriodBalance";

describe("calculatePeriodBalance", () => {
  it("calcula el balance financiero de un período", () => {
    const movements: PeriodMovement[] = [
      { type: "INCOME", amount: 100 },
      { type: "EXPENSE", amount: 20 },
      { type: "TRANSFER", amount: 50 },
      { type: "INCOME", amount: 30 },
    ];

    const balance = calculatePeriodBalance(movements);

    expect(balance).toBe(110);
  });

  it("devuelve cero cuando no existen movimientos", () => {
    const movements: PeriodMovement[] = [];

    const balance = calculatePeriodBalance(movements);

    expect(balance).toBe(0);
  });
});
