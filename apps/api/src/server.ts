import { createServer } from "node:http";
import { healthRoute } from "./routes/health.js";

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