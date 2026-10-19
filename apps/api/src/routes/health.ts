export function healthRoute(): {
  status: "ok";
  service: string;
} {
  return {
    status: "ok",
    service: "finance-api",
  };
}