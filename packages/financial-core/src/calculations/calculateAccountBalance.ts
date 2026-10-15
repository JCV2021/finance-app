export type AccountEntry = {
  direction: "IN" | "OUT";
  amount: number;
};
export function calculateAccountBalance(
  initialBalance: number,
  entries: AccountEntry[],
): number {
  let balance = initialBalance;

  for (const entry of entries) {
    if (entry.direction === "IN") {
      balance += entry.amount;
    } else if (entry.direction === "OUT") {
      balance -= entry.amount;
    } else {
      throw new Error("Dirección de movimiento inválida");
    }
  }

  return balance;
}