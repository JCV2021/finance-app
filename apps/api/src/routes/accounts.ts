import type { AccountsController } from "../controllers/accountsController.js";

export async function getAccountById(
  controller: AccountsController,
  id: string,
) {
  return controller.getById(id);
}
export async function getAccountsByUserId(
  controller: AccountsController,
  userId: string,
) {
  return controller.getByUserId(userId);
}