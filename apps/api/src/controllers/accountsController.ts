import type { AccountsRepository } from "../repositories/accountsRepository.js";

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
}