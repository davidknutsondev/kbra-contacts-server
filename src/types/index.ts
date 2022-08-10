export class Contact {
  constructor(
    public id?: string,
    public firstName?: string,
    public lastName?: string,
    public address?: string,
    public email?: string,
    public phone?: string,
    public avatar?: string
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.email = email;
    this.phone = phone;
    this.avatar = avatar;
  }
}

export interface ContactInput {
  firstName?: string;
  lastName?: string;
  address?: string;
  email?: string;
  phone?: string;
  avatar?: string;
}
