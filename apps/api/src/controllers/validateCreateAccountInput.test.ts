import { describe, expect, it } from "vitest";
import type { CreateAccountInput } from "./createAccountInput.js";
import { ValidationError } from "./validationError.js";
import { validateCreateAccountInput } from "./validateCreateAccountInput.js";

const validInput: CreateAccountInput = {
  userId: "423accd4-55e7-4e0f-8b49-870e9fbe9f3a",
  name: "Banco Test",
  accountClass: "ASSET",
  accountType: "BANK",
  currency: "PEN",
  initialBalance: 100,
  initialBalanceDate: "2026-10-21",
};

describe("validateCreateAccountInput", () => {
  it("acepta una cuenta válida", () => {
    expect(() => validateCreateAccountInput(validInput)).not.toThrow();
  });

  it("rechaza saldo inicial negativo en una cuenta ASSET", () => {
    const input = {
      ...validInput,
      initialBalance: -500,
    };

    expect(() => validateCreateAccountInput(input)).toThrow(ValidationError);
  });

  it("rechaza nombre vacío", () => {
    const input = {
      ...validInput,
      name: "   ",
    };

    expect(() => validateCreateAccountInput(input)).toThrow(ValidationError);
  });

  it("rechaza moneda que no tenga 3 caracteres", () => {
    const input = {
      ...validInput,
      currency: "PE",
    };

    expect(() => validateCreateAccountInput(input)).toThrow(ValidationError);
  });

  it("rechaza saldo inicial no numérico", () => {
    const input = {
      ...validInput,
      initialBalance: Number.NaN,
    };

    expect(() => validateCreateAccountInput(input)).toThrow(ValidationError);
  });
});
