import { pool } from "../database.js";
import type { CreateAccountInput } from "../controllers/createAccountInput.js";
import type {
  Account,
  AccountsRepository,
} from "./accountsRepository.js";

export class PostgresAccountsRepository implements AccountsRepository {
  async findById(id: string): Promise<Account | null> {
    const result = await pool.query(
      `
        SELECT
          id,
          user_id,
          name,
          account_class,
          account_type,
          currency,
          initial_balance,
          initial_balance_date,
          active,
          created_at,
          updated_at
        FROM accounts
        WHERE id = $1
      `,
      [id],
    );

    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];

    return {
      id: row.id,
      userId: row.user_id,
      name: row.name,
      accountClass: row.account_class,
      accountType: row.account_type,
      currency: row.currency.trim(),
      initialBalance: Number(row.initial_balance),
      initialBalanceDate: row.initial_balance_date,
      active: row.active,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  async findByUserId(userId: string): Promise<Account[]> {
    const result = await pool.query(
      `
        SELECT
          id,
          user_id,
          name,
          account_class,
          account_type,
          currency,
          initial_balance,
          initial_balance_date,
          active,
          created_at,
          updated_at
        FROM accounts
        WHERE user_id = $1
        ORDER BY name ASC
      `,
      [userId],
    );

    return result.rows.map((row) => ({
      id: row.id,
      userId: row.user_id,
      name: row.name,
      accountClass: row.account_class,
      accountType: row.account_type,
      currency: row.currency.trim(),
      initialBalance: Number(row.initial_balance),
      initialBalanceDate: row.initial_balance_date,
      active: row.active,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));
  }

  async create(input: CreateAccountInput): Promise<Account> {
    const result = await pool.query(
      `
        INSERT INTO accounts (
          user_id,
          name,
          account_class,
          account_type,
          currency,
          initial_balance,
          initial_balance_date
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING
          id,
          user_id,
          name,
          account_class,
          account_type,
          currency,
          initial_balance,
          initial_balance_date,
          active,
          created_at,
          updated_at
      `,
      [
        input.userId,
        input.name,
        input.accountClass,
        input.accountType,
        input.currency,
        input.initialBalance,
        input.initialBalanceDate,
      ],
    );

    const row = result.rows[0];

    return {
      id: row.id,
      userId: row.user_id,
      name: row.name,
      accountClass: row.account_class,
      accountType: row.account_type,
      currency: row.currency.trim(),
      initialBalance: Number(row.initial_balance),
      initialBalanceDate: row.initial_balance_date,
      active: row.active,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }
}