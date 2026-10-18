import { describe, expect, it } from "vitest";
import {
  calculateAccountBalance,
  type AccountEntry,
} from "./calculateAccountBalance";

describe("Invariantes financieros", () => {
  it("una transferencia propia conserva el valor total", () => {
    const efectivoInicial = 100;
    const bancoInicial = 0;

    const transferencia = 40;

    const efectivoEntries: AccountEntry[] = [
      { direction: "OUT", amount: transferencia },
    ];

    const bancoEntries: AccountEntry[] = [
      { direction: "IN", amount: transferencia },
    ];

    const efectivoFinal = calculateAccountBalance(
      efectivoInicial,
      efectivoEntries,
    );

    const bancoFinal = calculateAccountBalance(
      bancoInicial,
      bancoEntries,
    );

    const totalInicial = efectivoInicial + bancoInicial;
    const totalFinal = efectivoFinal + bancoFinal;

    expect(totalFinal).toBe(totalInicial);
  });
});