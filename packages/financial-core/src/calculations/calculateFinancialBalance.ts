export type FinancialMovement = {
  type: "INCOME" | "EXPENSE" | "TRANSFER";
  amount: number;
};

export function calculateFinancialBalance(
  movements: FinancialMovement[],
): number {
  let balance = 0;

  for (const movement of movements) {
  if (movement.type === "INCOME") {
    balance += movement.amount;
  } else if (movement.type === "EXPENSE") {
    balance -= movement.amount;
  } else if (movement.type === "TRANSFER") {
    // Las transferencias entre cuentas propias son neutrales.
  } else {
    throw new Error("Tipo de movimiento inválido");
  }
}

  return balance;
}