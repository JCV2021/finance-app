export type TransferInput = {
  amount: number;
  sourceAccountId: string;
  destinationAccountId: string;
};

export type TransferEntry = {
  accountId: string;
  direction: "IN" | "OUT";
  amount: number;
};

export type Transfer = {
  type: "TRANSFER";
  amount: number;
  entries: TransferEntry[];
};

export function createTransfer(input: TransferInput): Transfer {
  if (input.amount <= 0) {
    throw new Error(
      "El importe de la transferencia debe ser mayor que cero",
    );
  }

  return {
    type: "TRANSFER",
    amount: input.amount,
    entries: [
      {
        accountId: input.sourceAccountId,
        direction: "OUT",
        amount: input.amount,
      },
      {
        accountId: input.destinationAccountId,
        direction: "IN",
        amount: input.amount,
      },
    ],
  };
}