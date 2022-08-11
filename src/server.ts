import { createServer, IncomingMessage, ServerResponse } from "http";
import {
  createContact,
  getContacts,
  isUnique,
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

    // const { email, phone }: ContactInput = JSON.parse(body);
    const { address, email, phone, firstName, lastName, avatar }: ContactInput =
      JSON.parse(body);

    const emailPhoneUnique = isUnique(phone, email) === true;
    const emailExists = isUnique(phone, email) === "emailExists";
    const phoneExists = isUnique(phone, email) === "phoneExists";

    // refactor to switch statement

    // console.log("emailPhoneUnique", emailPhoneUnique);

    if (emailPhoneUnique) {
      // res.writeHead(200);
      // console.log("Made it in the If");
      createContact(
        { address, email, phone, firstName, lastName, avatar },
        res
      );
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
