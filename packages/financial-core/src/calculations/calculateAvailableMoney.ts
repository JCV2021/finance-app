export type AvailableAccount = {
  accountClass: "ASSET" | "LIABILITY";
  balance: number;
};

export function calculateAvailableMoney(
  accounts: AvailableAccount[],
): number {
  let availableMoney = 0;

  for (const account of accounts) {
    if (account.accountClass === "ASSET") {
      availableMoney += account.balance;
    }
  }

  return availableMoney;
}