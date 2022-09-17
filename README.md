This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Dependencies

    "typescript": "^4.7.4",
    "react-router-dom": "^6.3.0",
    "react-bootstrap": "^2.4.0",
    "redux": "^4.2.0",
    "@reduxjs/toolkit": "^1.8.5",
    "jwt-decode": "^1.1.6",
    "stripe": "^9.10.0",

## Introduction

This App is built to sell the API key for a screenshot service. You can paste an html and css string in the textarea input field and download a jpeg file with the rendered code, or use the key to make your request.

API documentation: https://github.com/f-marinelli/BE-screen

## Stripe

Stripe is in test mode. You can use a test credit card to complete the transaction

- Card Number: 4242 4242 4242 4242
- Data: 12/34
- CVC: 123

## Description

At the moment the App has four pages: Profile, Homepage, Diagram and Recover Password.

- In the `Profile` page there are your data and a button that send you an email with a link to `Recover` page.
- In the `Homepage` there are a button for buy the API key and a form for send your code and download the screenshot.
- In the `Diagram` page there is a form for create and download a bargraph diagram.
- The `Recover` page is accessible only by the link received by email and there is a form to update your password.

Redux stores the user and the error message from the server

The custom hook `useModal` handles three modals: sign in form, sign up form and recover passwword form. These modals are open by clicking each button that requires to be logged in: `ButtonsNav` in the `Navbar`; `BtnKey` and `FormScreen` in the`Homepage`.
