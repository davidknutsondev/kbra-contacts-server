import { Contact } from "./types";

export function getPostData(req) {
  return new Promise((resolve, reject) => {
    try {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        resolve(body);
      });
    } catch (error) {
      reject(error);
    }
  });
}

const checkForSubstring = (substring: string, string: string): boolean => {
  return string.indexOf(substring) !== -1;
};

export const searchContacts = (
  contacts: Contact[],
  userSearchInput?: string
): Contact[] => {
  if (!userSearchInput) {
    return contacts;
  } else {
    const searchContactsResult = contacts.filter(
      (contact) =>
        checkForSubstring(userSearchInput, contact.firstName!) ||
        checkForSubstring(userSearchInput, contact.firstName!)
    );
    return searchContactsResult;
  }
};

export const alphabetizeContacts = (contacts: Contact[]): Contact[] => {
  return contacts.sort((a, b) => a.lastName!.localeCompare(b.lastName!));
};
