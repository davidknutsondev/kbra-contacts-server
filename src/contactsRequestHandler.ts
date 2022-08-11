import { generateFakeDatabase } from "./generate";
import { Contact, ContactInput } from "./types";
import { v4 as uuidv4 } from "uuid";
import { alphabetizeContacts, searchContacts } from "./utils";

export class RequestHandler {
  private contacts: Contact[];

  constructor() {
    this.contacts = generateFakeDatabase(1);
  }

  loadContacts = (searchTerm?: string): Contact[] => {
    if (!searchTerm) {
      return alphabetizeContacts(this.contacts);
    } else {
      const searchContactsResult = searchContacts(this.contacts, searchTerm);
      return alphabetizeContacts(searchContactsResult);
    }
  };

  createContact = (input: ContactInput): Contact => {
    console.log("in Request handler");
    const newContact = { id: uuidv4, ...input };
    this.contacts.push(newContact);
    return newContact;
  };
}
