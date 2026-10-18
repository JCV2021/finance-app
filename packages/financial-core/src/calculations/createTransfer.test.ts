import { describe, expect, it } from "vitest";
import {
  createTransfer,
  type TransferInput,
} from "./createTransfer";

describe("createTransfer", () => {
  it("crea una transferencia con una salida y una entrada", () => {
    const input: TransferInput = {
      amount: 30,
      sourceAccountId: "cash",
      destinationAccountId: "bank",
    };

    const transfer = createTransfer(input);

    expect(transfer.type).toBe("TRANSFER");
    expect(transfer.amount).toBe(30);
    expect(transfer.entries).toEqual([
      {
        accountId: "cash",
        direction: "OUT",
        amount: 30,
      },
      {
        accountId: "bank",
        direction: "IN",
        amount: 30,
      },
    ]);
  });
});
