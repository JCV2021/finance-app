CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),

    name VARCHAR(100) NOT NULL,

    account_class VARCHAR(20) NOT NULL
        CHECK (account_class IN ('ASSET', 'LIABILITY')),

    account_type VARCHAR(30) NOT NULL
        CHECK (
            account_type IN (
                'CASH',
                'BANK',
                'YAPE',
                'SAVINGS',
                'INVESTMENT',
                'RECEIVABLE',
                'CREDIT_CARD',
                'LOAN',
                'OTHER'
            )
        ),

    currency CHAR(3) NOT NULL DEFAULT 'PEN',

    initial_balance NUMERIC(18,2) NOT NULL DEFAULT 0,
    initial_balance_date DATE NOT NULL DEFAULT CURRENT_DATE,

    active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL REFERENCES users(id),

    name VARCHAR(100) NOT NULL,

    movement_type VARCHAR(20) NOT NULL
        CHECK (movement_type IN ('INCOME', 'EXPENSE', 'BOTH')),

    active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE (user_id, name, movement_type)
);
CREATE TABLE movements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL REFERENCES users(id),
    category_id UUID REFERENCES categories(id),

    type VARCHAR(30) NOT NULL
        CHECK (
            type IN (
                'INCOME',
                'EXPENSE',
                'TRANSFER',
                'SAVING',
                'INVESTMENT',
                'CARD_PAYMENT',
                'DEBT',
                'REFUND',
                'REIMBURSEMENT',
                'LOAN_GIVEN',
                'LOAN_RECEIVED',
                'INSTALLMENT',
                'INTEREST',
                'DIVIDEND',
                'OTHER'
            )
        ),

    amount NUMERIC(18,2) NOT NULL
        CHECK (amount > 0),

    currency CHAR(3) NOT NULL DEFAULT 'PEN',

    movement_date DATE NOT NULL,
    movement_time TIME NOT NULL DEFAULT CURRENT_TIME,

    description VARCHAR(255),
    note TEXT,

    necessity VARCHAR(20)
        CHECK (
            necessity IS NULL
            OR necessity IN ('NECESSARY', 'OPTIONAL', 'DESIRABLE')
        ),

    context VARCHAR(20)
        CHECK (
            context IS NULL
            OR context IN ('PERSONAL', 'WORK')
        ),

    recurring BOOLEAN NOT NULL DEFAULT FALSE,
    business BOOLEAN NOT NULL DEFAULT FALSE,

    location VARCHAR(255),

    deleted_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE movement_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    movement_id UUID NOT NULL REFERENCES movements(id),
    account_id UUID NOT NULL REFERENCES accounts(id),

    direction VARCHAR(3) NOT NULL
        CHECK (direction IN ('IN', 'OUT')),

    amount NUMERIC(18,2) NOT NULL
        CHECK (amount > 0),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL REFERENCES users(id),

    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID NOT NULL,

    action VARCHAR(30) NOT NULL
        CHECK (
            action IN (
                'CREATE',
                'UPDATE',
                'DELETE',
                'RESTORE'
            )
        ),

    old_data JSONB,
    new_data JSONB,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_accounts_user_id
    ON accounts(user_id);

CREATE INDEX idx_categories_user_id
    ON categories(user_id);

CREATE INDEX idx_movements_user_id
    ON movements(user_id);

CREATE INDEX idx_movements_date
    ON movements(movement_date);

CREATE INDEX idx_movement_entries_movement_id
    ON movement_entries(movement_id);

CREATE INDEX idx_movement_entries_account_id
    ON movement_entries(account_id);

CREATE INDEX idx_audit_logs_user_id
    ON audit_logs(user_id);

CREATE INDEX idx_audit_logs_entity
    ON audit_logs(entity_type, entity_id);