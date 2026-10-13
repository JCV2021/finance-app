import { describe, expect, it } from "vitest";
import { calculateAccountBalance } from "./calculateAccountBalance";

describe("calculateAccountBalance", () => {
  it("calcula el saldo inicial más entradas menos salidas", () => {
    const initialBalance = 100;

    const entries = [
      { direction: "IN", amount: 50 },
      { direction: "IN", amount: 30 },
      { direction: "OUT", amount: 20 },
      { direction: "OUT", amount: 10 },
    ];

    const balance = calculateAccountBalance(initialBalance, entries);

    expect(balance).toBe(150);
  });
});
it("mantiene el saldo inicial cuando no hay movimientos", () => {
  const initialBalance = 500;
  const entries = [];

  const balance = calculateAccountBalance(initialBalance, entries);

  expect(balance).toBe(500);
});
it("lanza un error cuando la dirección del movimiento es inválida", () => {
  const initialBalance = 100;

  const entries = [
    { direction: "INVALID", amount: 50 },
  ];

  expect(() =>
    calculateAccountBalance(initialBalance, entries),
  ).toThrow("Dirección de movimiento inválida");
});