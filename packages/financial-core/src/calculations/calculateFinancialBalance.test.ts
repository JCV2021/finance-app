import { describe, expect, it } from "vitest";
import {
  calculateFinancialBalance,
  type FinancialMovement,
} from "./calculateFinancialBalance";

describe("calculateFinancialBalance", () => {
  it("calcula ingresos menos gastos", () => {
    const movements: FinancialMovement[] = [
      { type: "INCOME", amount: 100 },
      { type: "INCOME", amount: 50 },
      { type: "EXPENSE", amount: 20 },
      { type: "EXPENSE", amount: 10 },
    ];

    const balance = calculateFinancialBalance(movements);

    expect(balance).toBe(120);
  });

  it("ignora las transferencias entre cuentas propias", () => {
    const movements: FinancialMovement[] = [
      { type: "INCOME", amount: 100 },
      { type: "EXPENSE", amount: 20 },
      { type: "TRANSFER", amount: 50 },
      { type: "INCOME", amount: 30 },
    ];

    const balance = calculateFinancialBalance(movements);

    expect(balance).toBe(110);
  });

  it("lanza un error cuando el tipo de movimiento es inválido", () => {
    const movements = [
      { type: "INVALID", amount: 50 },
    ] as unknown as FinancialMovement[];

    expect(() =>
      calculateFinancialBalance(movements),
    ).toThrow("Tipo de movimiento inválido");
  });

  it("devuelve cero cuando no hay movimientos", () => {
    const movements: FinancialMovement[] = [];

    const balance = calculateFinancialBalance(movements);

    expect(balance).toBe(0);
  });
});