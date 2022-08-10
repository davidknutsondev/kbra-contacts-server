import { Contact } from "./types";

const checkForSubstring = (substring: string, string: string): boolean => {
  return string.indexOf(substring) !== -1;
};

const filterContacts = (
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

const asdfContacts: Contact[] = [
  {
    id: "0",
    firstName: "Liza",
    lastName: "Fadel",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/961.jpg",
    address: "692 Corwin Glen",
    email: "Myrtie_Hagenes@hotmail.com",
    phone: "908-910-775",
  },
  {
    id: "1",
    firstName: "Angus",
    lastName: "O'Reilly",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/767.jpg",
    address: "43541 Cassin Station",
    email: "Yadira.Goldner71@hotmail.com",
    phone: "908-905-401",
  },
];

const userSearchInput = "Bays";

console.log("filterContacts", filterContacts(asdfContacts, userSearchInput));
