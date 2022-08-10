import { createServer } from "http";
import url from "url";

const host = "localhost";
const port = 8000;

const books = JSON.stringify([
  { title: "The Alchemist", author: "Paulo Coelho", year: 1988 },
  { title: "The Prophet", author: "Kahlil Gibran", year: 1923 },
]);

const authors = JSON.stringify([
  { name: "Paulo Coelho", countryOfBirth: "Brazil", yearOfBirth: 1947 },
  { name: "Kahlil Gibran", countryOfBirth: "Lebanon", yearOfBirth: 1883 },
]);

const requestHandler = new RequestHandler();

const requestListener = function (req, res) {
  //   res.setHeader("Content-Type", "application/json");
  switch (req.url) {
    case "/books":
      res.setHeader("Content-Type", "application/json");
      RequestHandler.handleBooks();
      res.writeHead(200);
      res.end(books);
      break;
    case "/authors":
      res.writeHead(200);
      res.end(authors);
      break;
    // case "/loadAddresses":
    //     res.setHeader("Content-Type", "application/json");
    //     const addresses = requestHandler.loadAddresses();
    //     res.writeHead(200);
    //     res.end(JSON.stringify(addresses));
    //     break;
    // case "/addAddress":
    //     res.setHeader("Content-Type", "application/text");
    //     // localhost:8000/addAddress?name=mike&street=main ave&....
    //     const queryObject = url.parse(req.url, true).query;
    //     const newAaddress = new Address(queryObject.name, queryObject.street, queryObject...);
    //     requestHandler.addAddress(newAaddress);
    //     res.writeHead(200);
    //     break;
    default:
      res.writeHead(404);
      res.end(JSON.stringify({ error: "Resource not found" }));
  }
};

const server = createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});

class RequestHandler {
    private const addresses: Address[];

    constructor() {
        this.addresses =  faker.generate();
    }

    loadAddresses = (): Address[] => {
        return this.addresses
    }

    addAddress = (address: Address): void => {
        this.addAddress.push(address);
    }

    searchAddresses = (searchTerm: String): Address[] => {
        ...
    }

    filter, etc...
}
