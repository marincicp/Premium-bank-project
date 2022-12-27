"use strict";

// USER DATA
const account1 = {
  owner: "Pero Perić",
  birthDate: "01.01.1991.",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  pin: 1111,
  movementsDates: [
    "2021-11-01T13:15:33.035Z",
    "2021-11-30T09:48:16.867Z",
    "2021-12-25T06:04:23.907Z",
    "2022-02-02T14:18:46.235Z",
    "2022-02-05T16:33:06.386Z",
    "2022-04-10T14:43:26.374Z",
    "2022-06-25T18:49:59.371Z",
    "2022-07-26T12:01:20.894Z",
  ],
  cardNumber: 234543534234,
};

const account2 = {
  owner: "Ivana Ivić",
  birthDate: "29.03.2000.",
  movements: [400, -350, 400, 300, -250, -130, 70, 300],
  pin: 2222,
  movementsDates: [
    "2021-11-01T13:15:33.035Z",
    "2021-11-30T09:48:16.867Z",
    "2021-12-25T06:04:23.907Z",
    "2022-02-02T14:18:46.235Z",
    "2022-02-05T16:33:06.386Z",
    "2022-04-10T14:43:26.374Z",
    "2022-06-25T18:49:59.371Z",
    "2022-07-26T12:01:20.894Z",
  ],
  cardNumber: 56686756857,
};

const account3 = {
  owner: "Josip Marko Hula",
  birthDate: "22.09.1990.",
  movements: [800, 250, -400, 100, -650, -130, 70, -200],
  pin: 3333,
  movementsDates: [
    "2021-11-01T13:15:33.035Z",
    "2021-11-30T09:48:16.867Z",
    "2021-12-25T06:04:23.907Z",
    "2022-02-02T14:18:46.235Z",
    "2022-02-05T16:33:06.386Z",
    "2022-04-10T14:43:26.374Z",
    "2022-06-25T18:49:59.371Z",
    "2022-07-26T12:01:20.894Z",
  ],
  cardNumber: 2324245435,
};

const account4 = {
  owner: "Mirko Mihić",
  birthDate: "10.02.1978.",
  movements: [600, 450, -400, 2000, -650, -130, 70, -300],
  pin: 4444,
  movementsDates: [
    "2021-11-01T13:15:33.035Z",
    "2021-11-30T09:48:16.867Z",
    "2021-12-25T06:04:23.907Z",
    "2022-02-02T14:18:46.235Z",
    "2022-02-05T16:33:06.386Z",
    "2022-04-10T14:43:26.374Z",
    "2022-06-25T18:49:59.371Z",
    "2022-07-26T12:01:20.894Z",
  ],
  cardNumber: 75675675677,
};

const accounts = [account1, account2, account3, account4];

// Elements
const logoutBox = document.querySelector(".logout-box");

const LabelWelcomeLogout = document.querySelector(".welcome");
const labelWelcomeMessage = document.querySelector(".welcome-username");
const userInformationName = document.querySelector(
  ".user-information-name span"
);
const userInformationBirtdate = document.querySelector(
  ".user-information-birth span"
);
const userInformationCard = document.querySelector(
  ".user-information-card span"
);

const userInformationBalance = document.querySelector(
  ".user-information-balance span"
);

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");
const loginBox = document.querySelector(".nav-block");
const wrongLoginPopup = document.querySelector(".login-wrong");
const transferPopup = document.querySelector(".action-transfer");
const actionClose = document.querySelector(".action-close");
const actionMessage = document.querySelector(".action-text");
const userCheat = document.querySelector(".user-cheat");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".operation-btn-transfer");
const btnLoanTransfer = document.querySelector(".operation-btn-loan");
const btnCloseAcc = document.querySelector(".operation-btn-close");
const btnLogout = document.querySelector(".logout__btn");
const btnSort = document.querySelector(".btn-sort");
const cheatBtn = document.querySelector(".cheat-btn");

const inputLoginUsername = document.querySelector(".login__input-user");
const inputLoginPin = document.querySelector(".login__input-pin");
const inputTransferTo = document.querySelector(".operation-input-to");
const inputTransferAmount = document.querySelector(".operation-input-amount");
const inputLoanAmount = document.querySelector(".operation-input-loan-amount");
const inputUserCloseAcc = document.querySelector(".operation-input-close-user");
const inputUserClosePin = document.querySelector(".operation-input-close-pin");
const labelDeposit = document.querySelector(".summary-span-in");
const labelWithdrawal = document.querySelector(".summary-span-out");
const labelInterest = document.querySelector(".summary-span-interest");

// ******************** //
// RENDER MOVEMENTS
const renderMovements = function (account, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort
    ? account.movements.slice().sort((a, b) => a - b)
    : account.movements;

  movs.map((mov, index) => {
    const date = new Date(account.movementsDates[index]);
    const day = `${date.getDate()}`.padStart(2, 0);
    const month = `${date.getMonth()}`.padStart(2, 0);
    const year = `${date.getFullYear()}`.padStart(2, 0);
    const displayDate = `${day}.${month}.${year} `;

    const markup = `
  <div class="movements-row">
                  <div class="movements-helper">
                    <div class="movements-type movements-type-${
                      mov > 0 ? "deposit" : "withdrawal"
                    }">
                     ${index + 1} ${mov > 0 ? "Deposit" : "Withdrawal"}
                    </div>
                    <div class="movements-date">${displayDate}</div>
                  </div>
                  <div class="movements-value">${mov} €</div>
                </div>
  `;
    containerMovements.insertAdjacentHTML("afterbegin", markup);
  });
};

const renderUserInfo = function (info) {
  userInformationName.textContent = `${info.owner}`;
  userInformationBirtdate.textContent = `${info.birthDate}`;
  userInformationCard.textContent = `${info.cardNumber}`;
};

const createUsername = function (account) {
  account.forEach((acc) => {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((word) => word[0])
      .join("");
  });
};

const renderCalcSummary = function (account) {
  const deposit = account.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelDeposit.textContent = `${deposit}`;

  const withdrawal = account.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelWithdrawal.textContent = `${withdrawal.toString().slice(1)}`;

  const interest = account.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * 1.2) / 100)
    .filter((mov) => mov >= 1)
    .reduce((acc, mov) => acc + mov, 0);

  labelInterest.textContent = `${interest}`;
};

// ******************** //
// CALC BALANCE
const renderCalcBalace = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  userInformationBalance.textContent = `${acc.balance} €`;
};

const updateUI = function (account) {
  renderCalcSummary(account);
  renderCalcBalace(account);
  renderMovements(account);
  renderUserInfo(account);
};

createUsername(accounts);

// ******************** //
// LOGIN
let currentAccount;
btnLogin.addEventListener("click", (e) => {
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value.trim()
  );
  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display ui
    containerApp.style.opacity = 1;
    labelWelcomeMessage.textContent = `${currentAccount.owner.split(" ")[0]}`;

    loginBox.style.display = "none";
    logoutBox.style.display = "block";

    inputLoginUsername.value = "";
    inputLoginPin.value = "";
    inputLoginPin.blur();

    // Update movements, balance
    updateUI(currentAccount);

    // time
    setInterval(displayTime, 1000);
  } else {
    // Wrong password or username popup
    wrongLoginPopup.classList.add("active");
    inputLoginPin.value = "";
    setTimeout(() => {
      wrongLoginPopup.classList.remove("active");
    }, 2000);
  }
});

btnLogout.addEventListener("click", (e) => {
  e.preventDefault();
  containerApp.style.opacity = 0;
  logoutBox.style.display = "none";
  loginBox.style.display = "block";
});

// // fake login
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

// ******************** //
// TRANSFER  MONEY
btnTransfer.addEventListener("click", (e) => {
  e.preventDefault();

  const amount = +inputTransferAmount.value;
  const reciverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );

  if (
    reciverAcc &&
    currentAccount.balance >= amount &&
    reciverAcc.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    reciverAcc.movements.push(amount);

    inputTransferTo.value = inputTransferAmount.value = "";

    // Update transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    reciverAcc.movementsDates.push(new Date().toISOString());
    // Update UI
    updateUI(currentAccount);
    // show popup
    transferPopup.innerHTML = `<p class="action-text">
    <ion-icon class="kvacica" name="checkmark-outline"></ion-icon>
    <span> Transfer succes</span>
  </p>`;

    transferPopup.classList.add("active");
    setTimeout(() => transferPopup.classList.remove("active"), 3000);
  } else {
    transferPopup.innerHTML = ` <p class="action-text">
    <ion-icon class="kvacica" name="close-outline"></ion-icon>
    <span> Invalid Inputs</span>
  </p>`;
    transferPopup.classList.add("active");
    setTimeout(() => transferPopup.classList.remove("active"), 3000);
    inputTransferTo.value = inputTransferAmount.value = "";
  }
});

// ******************** //
// CLOSE ACCOUNT
btnCloseAcc.addEventListener("click", (e) => {
  e.preventDefault();

  if (
    currentAccount.username === inputUserCloseAcc.value &&
    currentAccount.pin === +inputUserClosePin.value
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    accounts.splice(index, 1);
    logoutBox.style.display = "none";
    loginBox.style.display = "block";
    inputUserCloseAcc.value = inputUserClosePin.value = "";
    containerApp.style.opacity = 0;
  } else {
    transferPopup.innerHTML = ` <p class="action-text">
    <ion-icon class="kvacica" name="close-outline"></ion-icon>
    <span> Invalid Inputs</span>
  </p>`;

    actionClose.classList.add("active");
    setTimeout(() => actionClose.classList.remove("active"), 3000);
    inputTransferTo.value = inputTransferAmount.value = "";
  }

  console.log(accounts);
});

// ******************** //
// LOAN MONEY
btnLoanTransfer.addEventListener("click", (e) => {
  e.preventDefault();

  const amount = +inputLoanAmount.value;

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    currentAccount.movements.push(amount);

    btnLoanTransfer.disabled = true;
    inputLoanAmount.disabled = true;
    btnLoanTransfer.style.background = "rgba(255, 255, 255, 0.7)";
    inputLoanAmount.value = "";
    // Update transfer  date
    currentAccount.movementsDates.push(new Date().toISOString());
    updateUI(currentAccount);
  }
});

// ******************** //
// SORT MOVEMENTS
let sorted = false;
btnSort.addEventListener("click", (e) => {
  e.preventDefault();
  renderMovements(currentAccount, !sorted);
  sorted = !sorted;
});

let now = new Date();
console.log(now);

const displayTime = function () {
  const hourBox = document.querySelector(".date-hour");
  const minBox = document.querySelector(".date-min");
  const secBox = document.querySelector(".date-sec");

  let now = new Date();
  let hour = now.getHours();
  let min = now.getMinutes();
  let sec = now.getSeconds();

  console.log(now.getDay());

  hourBox.textContent = hour < 10 ? "0" + hour : hour;
  minBox.textContent = min < 10 ? "0" + min : min;
  secBox.textContent = sec < 10 ? "0" + sec : sec;

  // hour.textContent =
  //   hour > 9 ? `${now.getHours()} : ${now.getHours().padStart(2, "0")}`
  // min.textContent = `${now.getMinutes().padStart(2, "0")}`;
  // sec.textContent = `${now.getSeconds().padStart(2, "0")}`;
};

let noww = new Date();
console.log(noww.getMonth());

cheatBtn.addEventListener("onmouseover", (e) => {
  userCheat.style.display = "flex";
  console.log(2);
});

/// USERS INFO FOR LOGIN

const modal = document.querySelector(".user-cheat");
const modalBtn = document.querySelector(".cheat-btn");
const closeModalBtn = document.querySelector(".closeBtn");

modalBtn.addEventListener("click", (e) => {
  modal.style.display = "block";
  modalBtn.style.display = "none";
});

closeModalBtn.addEventListener("click", (e) => {
  modal.style.display = "none ";
  modalBtn.style.display = "block";
});
