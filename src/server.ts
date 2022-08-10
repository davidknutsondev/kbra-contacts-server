import { createServer, IncomingMessage, ServerResponse } from "http";
import { createContact, getContacts } from "./controllers/contactController";

const host = "localhost";
const port = 8000;

const requestListener = function (req: IncomingMessage, res: ServerResponse) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, POST, GET");
  res.setHeader("Access-Control-Max-Age", "2592000");
  res.setHeader("Access-Control-Allow-Headers", "*");

  if (req.url?.includes("/api/contacts") && req.method === "GET") {
    getContacts(req, res);
  } else if (req.url === "/api/contacts" && req.method === "POST") {
    createContact(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
};

const server = createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Contacts Server is running on http://${host}:${port}`);
});
