export type DailyMovement = {
  type: "INCOME" | "EXPENSE" | "TRANSFER";
  amount: number;
};

export function calculateDailyBalance(
  movements: DailyMovement[],
): number {
  let balance = 0;

  for (const movement of movements) {
    if (movement.type === "INCOME") {
      balance += movement.amount;
    } else if (movement.type === "EXPENSE") {
      balance -= movement.amount;
    } else if (movement.type === "TRANSFER") {
      // Las transferencias propias son neutrales.
    }
  }

  return balance;
}