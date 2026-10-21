import "dotenv/config";
import { createServer } from "node:http";
import { healthRoute } from "./routes/health.js";
import { getAccountById } from "./routes/accounts.js";
import { AccountsController } from "./controllers/accountsController.js";
import { PostgresAccountsRepository } from "./repositories/postgresAccountsRepository.js";

const accountsRepository = new PostgresAccountsRepository();
const accountsController = new AccountsController(accountsRepository);

const server = createServer((req, res) => {
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