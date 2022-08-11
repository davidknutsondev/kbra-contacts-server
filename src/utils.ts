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
  const lowerCaseString = string.toLowerCase();
  const lowerCaseSubstring = substring.toLowerCase();
  return lowerCaseString.indexOf(lowerCaseSubstring) !== -1;
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
        checkForSubstring(userSearchInput, contact.lastName!)
    );
    return searchContactsResult;
  }
};

export const alphabetizeContacts = (contacts: Contact[]): Contact[] => {
  return contacts.sort((a, b) => a.lastName!.localeCompare(b.lastName!));
};
