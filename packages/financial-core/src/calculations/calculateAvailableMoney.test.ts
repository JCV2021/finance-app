import { describe, expect, it } from "vitest";
import {
  calculateAvailableMoney,
  type AvailableAccount,
} from "./calculateAvailableMoney";

describe("calculateAvailableMoney", () => {
  it("calcula el dinero disponible correctamente", () => {
    const accounts: AvailableAccount[] = [
      { accountClass: "ASSET", balance: 100 },
      { accountClass: "ASSET", balance: 200 },
      { accountClass: "LIABILITY", balance: 300 },
    ];

    const availableMoney = calculateAvailableMoney(accounts);

    expect(availableMoney).toBe(300);
  });

  it("devuelve cero cuando no existen cuentas", () => {
    const accounts: AvailableAccount[] = [];

    const availableMoney = calculateAvailableMoney(accounts);

    expect(availableMoney).toBe(0);
  });

});
