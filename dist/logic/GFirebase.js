"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GFirebase = require('firebase');
var config = {
    apiKey: "AIzaSyALYLK_YXxPfLnIx5E6XyjbRoGZrHMKn-M",
    authDomain: "gaia-c72ee.firebaseapp.com",
    databaseURL: "https://gaia-c72ee.firebaseio.com",
    projectId: "gaia-c72ee",
    storageBucket: "",
    messagingSenderId: "321489594488"
};
GFirebase.initializeApp(config);
exports.default = GFirebase;
