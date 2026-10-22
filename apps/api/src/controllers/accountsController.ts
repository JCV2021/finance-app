import type { CreateAccountInput } from "./createAccountInput.js";
import type { AccountsRepository } from "../repositories/accountsRepository.js";
import { validateCreateAccountInput } from "./validateCreateAccountInput.js";

export class AccountsController {
  constructor(
    private readonly accountsRepository: AccountsRepository,
  ) {}

  async getById(id: string) {
    const account = await this.accountsRepository.findById(id);

    if (!account) {
      return null;
    }

    return account;
  }

  async create(input: CreateAccountInput) {
  validateCreateAccountInput(input);

  return this.accountsRepository.create(input);
}
}