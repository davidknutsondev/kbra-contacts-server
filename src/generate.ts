import { faker } from "@faker-js/faker";
import lodash from "lodash";
import { Contact } from "./types";
// const { faker } = require("@faker-js/faker");
// var lodash = require("lodash");

export function generateFakeDatabase(numberOfContacts: number): Contact[] {
  return lodash.times(numberOfContacts, function generateFakeAddressEntries(n) {
    return {
      id: n.toString(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      avatar: faker.internet.avatar(),
      address: faker.address.streetAddress(),
      email: faker.internet.email(),
      phone: faker.phone.number("908-###-###"),
    };
  });
}
