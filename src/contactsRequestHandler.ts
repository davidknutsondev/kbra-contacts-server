import { generateFakeDatabase } from "./generate";
import { Contact, ContactInput } from "./types";
import { v4 as uuidv4 } from "uuid";
import { alphabetizeContacts, searchContacts } from "./utils";

export class RequestHandler {
  private contacts: Contact[];

  constructor() {
    this.contacts = generateFakeDatabase();
  }

  loadContacts = (searchTerm?: string): Contact[] => {
    if (!searchTerm) {
      return alphabetizeContacts(this.contacts);
    } else {
      const asdf = searchContacts(this.contacts, searchTerm);
      return alphabetizeContacts(asdf);
    }
  };

  createContact = (input: ContactInput): Contact => {
    const newContact = { id: uuidv4, ...input };
    this.contacts.push(newContact);
    return newContact;
  };
}
