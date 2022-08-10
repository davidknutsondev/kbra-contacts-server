// SHOULD BE ABLE TO DELETE THIS FILE

import { generateFakeDatabase } from "../generate";
import { v4 as uuidv4 } from "uuid";

export function findAll() {
  return new Promise((resolve, reject) => {
    resolve(generateFakeDatabase());
  });
}

export function create(contactInput) {
  return new Promise((resolve, reject) => {
    const newContact = { id: uuidv4, ...contactInput };
    // contacts.push(newContact) not sure what to do for this
  });
}
