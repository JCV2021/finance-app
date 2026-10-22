import type { CreateAccountInput } from "./createAccountInput.js";
import { ValidationError } from "./validationError.js";

export function validateCreateAccountInput(
  input: CreateAccountInput,
): void {
  if (!input.userId) {
    throw new ValidationError("El usuario es obligatorio");
  }

  if (!input.name || input.name.trim().length === 0) {
    throw new ValidationError("El nombre de la cuenta es obligatorio");
  }

  if (input.accountClass === "ASSET" && input.initialBalance < 0) {
    throw new ValidationError(
      "El saldo inicial de una cuenta de activo no puede ser negativo",
    );
  }

  if (!Number.isFinite(input.initialBalance)) {
    throw new ValidationError("El saldo inicial debe ser un número válido");
  }

  if (!input.currency || input.currency.length !== 3) {
    throw new ValidationError("La moneda debe tener 3 caracteres");
  }

  if (!input.initialBalanceDate) {
    throw new ValidationError("La fecha de saldo inicial es obligatoria");
  }
}