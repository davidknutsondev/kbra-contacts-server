import { IncomingMessage, ServerResponse } from "http";
import { RequestHandler } from "../contactsRequestHandler";
import { Contact, ContactInput } from "../types";
import { getPostData } from "../utils";
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

// export async function createContact(req: IncomingMessage, res: ServerResponse) {
export async function createContact(input: ContactInput, res: ServerResponse) {
  // console.log("in fUNCTION");
  try {
    // console.log("in TRY");
    // const body: any = await getPostData(req);
    // console.log("req", req);
    // console.log("BODY", body);

    // const { address, email, phone, firstName, lastName, avatar }: ContactInput =
    //   JSON.parse(body);
    // console.log("Const", body);

    // const contactInput = {
    //   firstName: firstName,
    //   lastName: lastName,
    //   avatar: avatar,
    //   address: address,
    //   email: email,
    //   phone: phone,
    // };
    // console.log("contactInput", contactInput);

    // const newContact = requestHandler.createContact(contactInput);
    const newContact = requestHandler.createContact(input);

    // console.log("createContact called with", newContact);

    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(newContact));
  } catch (error) {
    // console.log(error);
  }
}

export const isUnique = (
  newContactPhone?: string,
  newContactEmail?: string
): "emailExists" | "phoneExists" | true => {
  const contacts = requestHandler.loadContacts();

  // console.log("newContactPhone", newContactPhone);
  // console.log("newContactEmail", newContactEmail);

  const emailExists =
    contacts.find((existingContact) => {
      return existingContact.email === newContactEmail;
    }) !== undefined;

  // console.log("emailExists", emailExists);

  const phoneExists =
    contacts.find((existingContact) => {
      return existingContact.phone === newContactPhone;
    }) !== undefined;
  // console.log("phoneExists", phoneExists);

  if (emailExists) {
    return "emailExists";
  } else if (phoneExists) {
    return "phoneExists";
  } else {
    return true;
  }
};
