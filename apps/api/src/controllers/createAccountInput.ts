export type CreateAccountInput = {
  userId: string;
  name: string;
  accountClass: "ASSET" | "LIABILITY";
  accountType:
    | "CASH"
    | "BANK"
    | "YAPE"
    | "SAVINGS"
    | "INVESTMENT"
    | "RECEIVABLE"
    | "CREDIT_CARD"
    | "LOAN"
    | "OTHER";
  currency: string;
  initialBalance: number;
  initialBalanceDate: string;
};