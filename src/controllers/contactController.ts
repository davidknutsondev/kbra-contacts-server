import { IncomingMessage, ServerResponse } from "http";
import { RequestHandler } from "../contactsRequestHandler";
import { ContactInput } from "../types";
import { getPostData } from "../utils";
import url from "url";

const requestHandler = new RequestHandler();

// const headers = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
//   "Access-Control-Max-Age": 2592000, // 30 days
//   "Access-Control-Allow-Headers": "*",
//   // "Content-Type": "application/json",
//   // "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
//   /** add other headers as per requirement */
// };

// @desc Gets all contacts
// @route GET /api/contacts

export async function getContacts(req: IncomingMessage, res: ServerResponse) {
  try {
    // get url query search term

    // const queryObject = url.parse(req.url, true).query;

    // const parsedUrl = new URL(req.url!);

    // const {search}=parsedUrl.searchParams[0]

    const contacts = requestHandler.loadContacts();

    // res.writeHead(200, headers);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(contacts));
  } catch (error) {
    console.log(error);
  }
}

// @desc Create a contact
// @route POST /api/contacts

export async function createContact(req: IncomingMessage, res: ServerResponse) {
  try {
    const body: any = await getPostData(req);

    const { address, email, phone, firstName, lastName, avatar }: ContactInput =
      JSON.parse(body);

    const contactInput = {
      firstName: firstName,
      lastName: lastName,
      avatar: avatar,
      address: address,
      email: email,
      phone: phone,
    };

    const newContact = requestHandler.createContact(contactInput);

    // res.writeHead(201, headers);
    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(newContact));
  } catch (error) {
    console.log(error);
  }
}
