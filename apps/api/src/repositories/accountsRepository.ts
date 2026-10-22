import type { CreateAccountInput } from "../controllers/createAccountInput.js";
import type { AccountEntry } from "./accountEntriesRepository.js";

export type Account = {
  id: string;
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
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export interface AccountsRepository {
  findById(id: string): Promise<Account | null>;
  findByUserId(userId: string): Promise<Account[]>;
  findEntriesByAccountId(accountId: string): Promise<AccountEntry[]>;
  create(input: CreateAccountInput): Promise<Account>;
}
