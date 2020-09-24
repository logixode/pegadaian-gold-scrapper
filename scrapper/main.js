const puppeteer = require('puppeteer');
const firebase = require("firebase/app");

require("firebase/database");

var firebaseConfig = {
  apiKey: "AIzaSyBzZSrf29VVKBe3ubuBhYS566nI5JIy338",
  authDomain: "pegadaian-gold-data.firebaseapp.com",
  databaseURL: "https://pegadaian-gold-data.firebaseio.com",
  projectId: "pegadaian-gold-data",
  storageBucket: "pegadaian-gold-data.appspot.com",
  messagingSenderId: "1015216585945",
  appId: "1:1015216585945:web:97f402c10647c8c829d2c8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const runProgram = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://www.pegadaian.co.id/harga', {
    waitUntil: 'load',
    // Remove the timeout
    timeout: 0
  });

  await page.waitForSelector(".table");

  const result = await page.evaluate(() => {
    const items = document
      .querySelectorAll("table")[0]
      .tBodies[0]
      .querySelectorAll("tr");

    const data = Array.from(items)
      .map(row => {
        if (row.cells[0]) {
          return {
            satuan: row.cells[0].innerText,
            hargaAntam: row.cells[1].innerText,
            hargaAntamRetro: row.cells[2].innerText,
            hargaAntamBatik: row.cells[3].innerText,
            hargaUBS: row.cells[4].innerText
          };
        } else return {};
      });

    return data;
  });

  db.ref("goldData")
    .set(result)
    .then(
      console.log("Data diupdate")
    );

  await browser.close();
};

let checkRefresh = () => {
  let refresh = false;
  db.ref("refresh")
    .on("child_changed", data => {
      // console.log(data.val());
      // refresh = data.val().refresh;
      if (data.val()) {
        runProgram();
        db.ref("refresh")
          .set({ refresh: false });
      }
    });
};

console.log(
  "===========================\nProgram berhasil dijalankan\n==========================="
);
runProgram();

checkRefresh();