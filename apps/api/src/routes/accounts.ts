import type { AccountsController } from "../controllers/accountsController.js";

export async function getAccountById(
  controller: AccountsController,
  id: string,
) {
  return controller.getById(id);
}