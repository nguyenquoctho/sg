const BASE_URL = process.env.GATSBY_API_URL;
export { BASE_URL };
const API_URL = process.env.GATSBY_API + "/api/apiKey/company";
export { API_URL };
const API_PUBLIC = process.env.GATSBY_API + "/api/public";
export { API_PUBLIC };
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55Q29kZSI6InNhaWdvbnJlYWx0eSIsImlhdCI6MTU2NTY2MjUzNX0.QMvioUN-znRfKsJZHPMcPp65sJgFOkRXfMAR0Xb82Oc"; // saigonrealty
// const API_KEY =
  // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55Q29kZSI6InRoaW5rdG9kbyIsImlhdCI6MTU2NTY3OTE2Mn0.3Xi9MtAzmUgVVadaFiIy3Ff2ov9bfRigGXLL-8eTwig"; // thinktodo
export { API_KEY };

const MAP_API_KEY = "AIzaSyDV37oPBN1RmpDtJzzGpmtStkUSBfn9I1c";
export { MAP_API_KEY };

var COMPANY_CODE = "";
export { COMPANY_CODE };
export const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
export const FACEBOOK_PAGE_ID = process.env.FACEBOOK_PAGE_ID;
const houseTypes = [
  { id: "apartment", value: "Apartment" },
  { id: "apartmentStudio", value: "Apartment, Studio" },
  { id: "office", value: "Office" },
  { id: "officetel", value: "Officetel" },
  { id: "shophouse", value: "Shophouse" },
  { id: "penthouse", value: "Penthouse" },
  { id: "duplex", value: "Duplex" },
  { id: "villa", value: "Villa" },
];
export { houseTypes };

const houseFurnitures = [
  { id: "semiFurnished", value: "Semi-Furnished" },
  { id: "basicFunished", value: "Basic Funished" },
  { id: "office", value: "Office" },
];

export { houseFurnitures };
const limitPerRequest = 15;
export { limitPerRequest };
