// SHOULD BE ABLE TO DELETE THIS FILE

import { createServer, IncomingMessage, ServerResponse } from "http";
import url from "url";
import { generateFakeDatabase } from "./generate";
import { Contact, ContactInput } from "./types";
import { v4 as uuidv4 } from "uuid";
import { RequestHandler } from "./contactsRequestHandler";

const host = "localhost";
const port = 8000;

const requestListener = function (req: IncomingMessage, res: ServerResponse) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, POST, GET");
  res.setHeader("Access-Control-Max-Age", "2592000");
  switch (req.url) {
    case "/loadContacts":
      res.setHeader("Content-Type", "application/json");
      const contacts = requestHandler.loadContacts();
      res.writeHead(200);
      res.end(JSON.stringify(contacts));
      break;
    case "/createContact":
      res.setHeader("Content-Type", "application/json");
      // localhost:8000/createContact?name=mike&street=main ave&....
      const queryObject = url.parse(req.url, true).query;
      console.log("queryObject", queryObject);
      // mike's code
      // const newContact: Contact = new Contact(
      //   queryObject.id?.toString(),
      //   queryObject.firstName?.toString(),
      //   queryObject.lastName?.toString(),
      //   queryObject.address?.toString(),
      //   queryObject.email?.toString(),
      //   queryObject.phone?.toString(),
      //   queryObject.avatar?.toString()
      // );
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        const {
          address,
          avatar,
          email,
          phone,
          firstName,
          lastName,
        }: ContactInput = JSON.parse(body);
        const contactInput = {
          firstName: firstName,
          lastName: lastName,
          avatar:
            "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/767.jpg",
          address: address,
          email: email,
          phone: phone,
        };
        const newContact = requestHandler.createContact(contactInput);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(newContact));
      });
      break;
    default:
      res.writeHead(404);
      res.end(JSON.stringify({ error: "Resource not found" }));
  }
};

const server = createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});

// maybe I'm misunderstanding the use of types / classes here

// class RequestHandler {
//   private contacts: Contact[];

//   constructor() {
//     this.contacts = generateFakeDatabase();
//   }

//   loadContacts = (): Contact[] => {
//     return this.contacts;
//   };

//   createContact = (contact: Contact): void => {
//     const newContact = { id: uuidv4, ...contact };
//     this.contacts.push(newContact);
//   };
//   // this is what mike had, I think it was a typo and supposed to be this.contacts.push instead of this.createContact.push
//   // createContact = (contact: Contact): void => {
//   //   this.createContact.push(contact);
//   // };

//   // searchContacts = (searchTerm: String): Contact[] => {
//   //     ...
//   // }

//   // filter, etc...
// }

const requestHandler = new RequestHandler();
