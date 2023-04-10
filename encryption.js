const express = require("express");
const app = express();
const CryptoJS = require("crypto-js");

// Encryption key and initialization vector
const secretKey = "6420598941afe18a42e83256";

app.use(express.json());
app.get("/api/encrypt", (req, res) => {
  const responseData = {
    message: "Hello, world!",
  };

  const jsonObject = {
    "firstName": "John",
    "lastName": "Doe",
    "age": 30,
    "email": "johndoe@example.com",
    "address": {
      "street": "123 Main St",
      "city": "Anytown",
      "state": "CA",
      "zip": "12345"
    },
    "phoneNumbers": [
      {
        "type": "home",
        "number": "555-555-1234"
      },
      {
        "type": "work",
        "number": "555-555-5678"
      }
    ],
    "orders": [
      {
        "id": "123",
        "items": [
          {
            "id": "456",
            "name": "Item 1",
            "price": 10.99,
            "quantity": 2
          },
          {
            "id": "789",
            "name": "Item 2",
            "price": 5.99,
            "quantity": 1
          }
        ],
        "total": 27.97
      },
      {
        "id": "456",
        "items": [
          {
            "id": "123",
            "name": "Item 3",
            "price": 7.99,
            "quantity": 1
          },
          {
            "id": "789",
            "name": "Item 4",
            "price": 12.99,
            "quantity": 3
          }
        ],
        "total": 48.96
      }
    ]
  }
  ;
  // Encrypt the response data
  const jsonString = JSON.stringify(jsonObject);
  const encrypted = CryptoJS.AES.encrypt(jsonString, secretKey).toString();
  res.send(encrypted);
});

app.post("/api/decrypt", (req, res) => {
  const decrypted = CryptoJS.AES.decrypt(req.body.data, secretKey).toString(
    CryptoJS.enc.Utf8
  );
  const jsonObject = JSON.parse(decrypted);

  res.send(jsonObject);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
