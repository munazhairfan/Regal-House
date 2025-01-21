export default {
  name: "checkout",
  title: "Checkout",
  type: "document",
  fields: [
    { name: "fullName", title: "Full Name", type: "string" },
    { name: "email", title: "Email", type: "string" },
    { name: "shippingAddress", title: "Shipping Address", type: "string" },
    { name: "city", title: "City", type: "string" },
    { name: "zipcode", title: "Postal Code", type: "string" },
    { name: "country", title: "Country", type: "string" },
    { name: "cardholderName", title: "Cardholder Name", type: "string" },
    { name: "cardNumber", title: "Card Number", type: "string" },
    { name: "expirationDate", title: "Expiration Date", type: "string" },
    { name: "cvv", title: "CVV", type: "string" },
  ],
};
