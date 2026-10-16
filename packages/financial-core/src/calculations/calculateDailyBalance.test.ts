import { describe, expect, it } from "vitest";
import {
  calculateDailyBalance,
  type DailyMovement,
} from "./calculateDailyBalance";

describe("calculateDailyBalance", () => {
  it("calcula el balance financiero de un día", () => {
    const movements: DailyMovement[] = [
      { type: "INCOME", amount: 100 },
      { type: "INCOME", amount: 50 },
      { type: "EXPENSE", amount: 30 },
      { type: "EXPENSE", amount: 20 },
      { type: "TRANSFER", amount: 100 },
    ];

    const balance = calculateDailyBalance(movements);

    expect(balance).toBe(100);
  });

  it("devuelve cero cuando no existen movimientos", () => {
    const movements: DailyMovement[] = [];

    const balance = calculateDailyBalance(movements);

    expect(balance).toBe(0);
  });
});
