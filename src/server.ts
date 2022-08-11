import { createServer, IncomingMessage, ServerResponse } from "http";
import {
  createContact,
  getContacts,
  isContactUnique,
} from "./controllers/contactController";
import { ContactInput } from "./types";
import { getPostData } from "./utils";

const host = "localhost";
const port = 8000;

const requestListener = async function (
  req: IncomingMessage,
  res: ServerResponse
) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, POST, GET");
  res.setHeader("Access-Control-Max-Age", "2592000");
  res.setHeader("Access-Control-Allow-Headers", "*");

  if (req.url?.includes("/api/contacts") && req.method === "GET") {
    getContacts(req, res);
  } else if (req.url === "/api/contacts" && req.method === "POST") {
    const body: any = await getPostData(req);

    const { address, email, phone, firstName, lastName, avatar }: ContactInput =
      JSON.parse(body);

    const contactInput = { address, email, phone, firstName, lastName, avatar };

    const emailPhoneUnique = isContactUnique(phone, email) === true;
    const emailExists = isContactUnique(phone, email) === "emailExists";
    const phoneExists = isContactUnique(phone, email) === "phoneExists";

    if (emailPhoneUnique) {
      createContact(contactInput, res);
    } else if (emailExists) {
      res.writeHead(403, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Email already taken",
        })
      );
    } else if (phoneExists) {
      res.writeHead(403, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Phone number already taken",
        })
      );
    }
  } else if (req.url === "/api/contacts" && req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
};

const server = createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
