import { ServerResponse } from "http";
import { RequestHandler } from "../contactsRequestHandler";
import { ContactInput } from "../types";
import url from "url";

const requestHandler = new RequestHandler();

// @desc Gets all contacts
// @route GET /api/contacts

export async function getContacts(req: any, res: ServerResponse) {
  try {
    const queryObject = url.parse(req.url, true).query;
    const searchInput = queryObject.searchInput as string;
    const contacts = requestHandler.loadContacts(searchInput);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(JSON.stringify(contacts));
  } catch (error) {
    console.log(error);
  }
}

// @desc Create a contact
// @route POST /api/contacts

export async function createContact(input: ContactInput, res: ServerResponse) {
  try {
    const newContact = requestHandler.createContact(input);

    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(newContact));
  } catch (error) {
    console.log(error);
  }
}

export const isContactUnique = (
  newContactPhone?: string,
  newContactEmail?: string
): "emailExists" | "phoneExists" | true => {
  const contacts = requestHandler.loadContacts();

  const emailExists =
    contacts.find((existingContact) => {
      return existingContact.email === newContactEmail;
    }) !== undefined;

  const phoneExists =
    contacts.find((existingContact) => {
      return (
        existingContact.phone?.replace(/\D/g, "") ===
        newContactPhone?.replace(/\D/g, "")
      );
    }) !== undefined;

  if (emailExists) {
    return "emailExists";
  } else if (phoneExists) {
    return "phoneExists";
  } else {
    return true;
  }
};
