import "dotenv/config";
import { createServer, type IncomingMessage } from "node:http";
import { healthRoute } from "./routes/health.js";
import { getAccountById } from "./routes/accounts.js";
import { AccountsController } from "./controllers/accountsController.js";
import { PostgresAccountsRepository } from "./repositories/postgresAccountsRepository.js";
import type { CreateAccountInput } from "./controllers/createAccountInput.js";
import { ValidationError } from "./controllers/validationError.js";

const accountsRepository = new PostgresAccountsRepository();
const accountsController = new AccountsController(accountsRepository);

function readJsonBody(req: IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error("JSON inválido"));
      }
    });

    req.on("error", reject);
  });
}

const server = createServer(async (req, res) => {
  if (req.method === "GET" && req.url === "/api/v1/health") {
    const data = healthRoute();

    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.end(JSON.stringify({
      success: true,
      data,
      error: null,
      meta: {},
    }));

    return;
  }

  if (req.method === "POST" && req.url === "/api/v1/accounts") {
  try {
    const body = await readJsonBody(req);
    const input = body as CreateAccountInput;

    const account = await accountsController.create(input);

    res.writeHead(201, {
      "Content-Type": "application/json",
    });

    res.end(
      JSON.stringify({
        success: true,
        data: account,
        error: null,
        meta: {},
      }),
    );

    return;
  }catch (error) {
  console.error("Error creating account:", error);

  if (error instanceof ValidationError) {
    res.writeHead(422, {
      "Content-Type": "application/json",
    });

    res.end(
      JSON.stringify({
        success: false,
        data: null,
        error: {
          code: "VALIDATION_ERROR",
          message: error.message,
        },
        meta: {},
      }),
    );

    return;
  }

  res.writeHead(500, {
    "Content-Type": "application/json",
  });

  res.end(
    JSON.stringify({
      success: false,
      data: null,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Error interno del servidor",
      },
      meta: {},
    }),
  );

  return;
}
}
  const accountMatch = req.url?.match(
    /^\/api\/v1\/accounts\/([^/]+)$/,
  );

  if (req.method === "GET" && accountMatch) {
    const accountId = accountMatch[1];

    getAccountById(accountsController, accountId)
      .then((account) => {
        if (!account) {
          res.writeHead(404, {
            "Content-Type": "application/json",
          });

          res.end(JSON.stringify({
            success: false,
            data: null,
            error: {
              code: "ACCOUNT_NOT_FOUND",
              message: "Cuenta no encontrada",
            },
            meta: {},
          }));

          return;
        }

        res.writeHead(200, {
          "Content-Type": "application/json",
        });

        res.end(JSON.stringify({
          success: true,
          data: account,
          error: null,
          meta: {},
        }));
      })
      .catch((error: unknown) => {
        console.error("Error obteniendo cuenta:", error);

        res.writeHead(500, {
          "Content-Type": "application/json",
        });

        res.end(JSON.stringify({
          success: false,
          data: null,
          error: {
            code: "INTERNAL_SERVER_ERROR",
            message: "Error interno del servidor",
          },
          meta: {},
        }));
      });

    return;
  }

  res.writeHead(404, {
    "Content-Type": "application/json",
  });

  res.end(JSON.stringify({
    success: false,
    data: null,
    error: {
      code: "NOT_FOUND",
      message: "Ruta no encontrada",
    },
    meta: {},
  }));
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Finance API running on http://localhost:${PORT}`);
});