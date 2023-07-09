const CONFIG = {
  first_name: {
    min: 3,
    max: 25,
    length: 0,
    err: "Імя повино складатися з 3 до 25 символів",
    errNum: "В імені знаходитись цифри",
  },
  last_name: {
    min: 3,
    max: 25,
    length: 1,
    err: "Прізвище повино складатися з 3 до 25 символів",
    errNum: "В прізвищі знаходитись цифри",
  },
  email: {
    length: 2,
    err: "Введіть правильний Email",
  },
  phone: {
    USA: {
      min: 12,
      max: 12,
      err: "Телефон повинен складатися з 12 символів",
    },
    UA: {
      min: 13,
      max: 13,
      err: "Телефон повинен складатися з 13 символів",
    },
    length: 3,
    errNum: "Номер телефону повинен складатися лише з цифер",
  },
  DATE: {
    min_date: 568036800000, //18 y.o in ms
    max_date: 2051244000000, //65 y.o in ms
    length: 4,
    err18: "Вам ще не виповнилось 18 років",
    err65: "Вам вже виповнилось 65 років",
    err_past: "Ви ще не народилися",
  },
  password: {
    length: 5,
    err: "Пароль повинен бути від 6 до 25 символів одна велика буква один символ",
    errDubl: "Пароль не повинен містити Імя чи Прізвище",
  },
  confirm_password: {
    length: 6,
    err: "Паролі мають збігатися",
  },
};

const firstN = document.getElementById("first-name");
const lastN = document.getElementById("last-name");
const label = document.querySelectorAll("label");
const email = document.getElementById("email");
const select = document.querySelector("select");
const phone = document.getElementById("phone");
const password = document.getElementById("password");
const confirm_password = document.getElementById("confirm-password");
const btnSub = document.getElementById("register_form");
const btnRes = document.getElementById("res");

let date = document.getElementById("date");

const regexEmail = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
const regexStr = new RegExp("[a-zA-Z]");
const regexPassword = new RegExp(
  "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,20}$"
);

//root

const upperCase = (text) => {
  text.value = text.value.toLowerCase();
  text.value = text.value.charAt(0).toUpperCase() + text.value.slice(1);
};
const spaces = (text) => {
  text.value = text.value.split(" ").join("");
};
const includeNumber = (myString) => {
  if (/\d/.test(myString)) {
    return true;
  }
};

const createErr = (num, text) => {
  const err = document.createElement("p");
  err.innerHTML = text;
  label[num].append(err);
  label[num].children[0].style.borderBottom = "4px solid red";
};
const min_max = (input, min, max, arr, textError) => {
  if (input.value.length < min || input.value.length > max) {
    addError(arr, textError);
  }
};
const addError = (arr, textError) => {
  if (!label[arr].querySelector("p")) {
    createErr(arr, textError);
  }
};
const deleteError = (arr) => {
  if (label[arr].querySelector("p")) {
    label[arr].lastElementChild.remove();
    label[arr].children[0].style.borderBottom = "4px solid #668d39";
    return;
  }
};

//first Name

const ruleName = () => {
  confirm = true;
  min_max(
    firstN,
    CONFIG.first_name.min,
    CONFIG.first_name.max,
    CONFIG.first_name.length,
    CONFIG.first_name.err
  );
};

const onChangeName = () => {
  upperCase(firstN);
  spaces(firstN);
  deleteError(CONFIG.first_name.length);
  ruleName();
  if (includeNumber(firstN.value)) {
    addError(CONFIG.first_name.length, CONFIG.first_name.errNum);
  }
};

//last Name
const ruleLastName = () => {
  min_max(
    lastN,
    CONFIG.last_name.min,
    CONFIG.last_name.max,
    CONFIG.last_name.length,
    CONFIG.last_name.err
  );
};

const onChangeLastName = () => {
  upperCase(lastN);
  spaces(lastN);
  deleteError(CONFIG.last_name.length);
  ruleLastName();
  if (onlyNumber(lastN.value)) {
    addError(CONFIG.last_name.length, CONFIG.last_name.errNum);
  }
};
//Email
const checkEmail = (text, arr, textError) => {
  if (!regexEmail.test(text.value)) {
    addError(arr, textError);
  }
};
const onChangeEmail = () => {
  deleteError(CONFIG.email.length);
  checkEmail(email, CONFIG.email.length, CONFIG.email.err);
};

//Phone
const checkPhone = () => {
  deleteError(CONFIG.phone.length);
  if (regexStr.test(phone.value)) {
    addError(CONFIG.phone.length, CONFIG.phone.errNum);
    return;
  }
  if (select.value === "USA") {
    min_max(
      phone,
      CONFIG.phone.USA.min,
      CONFIG.phone.USA.max,
      CONFIG.phone.length,
      CONFIG.phone.USA.err
    );
  } else
    min_max(
      phone,
      CONFIG.phone.UA.min,
      CONFIG.phone.UA.max,
      CONFIG.phone.length,
      CONFIG.phone.UA.err
    );
};
const changeOption = (e) => {
  if (e.target.value === "USA") {
    select.className = "usa";
    phone.value = "+1";
    deleteError(CONFIG.phone.length);
  } else if (e.target.value === "UA") {
    select.className = "ua";
    phone.value = "+380";
    deleteError(CONFIG.phone.length);
  }
};
// date of birth
const checkDate = (min, max) => {
  let today = new Date();
  let selectDate = new Date(date.value);
  if (Math.sign(today.getTime() - selectDate.getTime()) === -1) {
    addError(CONFIG.DATE.length, CONFIG.DATE.err_past);
  }
  if (today.getTime() - selectDate.getTime() < min) {
    addError(CONFIG.DATE.length, CONFIG.DATE.err18);
  }
  if (today.getTime() - selectDate.getTime() > max) {
    addError(CONFIG.DATE.length, CONFIG.DATE.err65);
  }
};
const onChangeDate = () => {
  deleteError(CONFIG.DATE.length);
  checkDate(CONFIG.DATE.min_date, CONFIG.DATE.max_date);
};

//password

const checkPaswword = (text, arr, textError) => {
  if (!regexPassword.test(text.value)) {
    addError(arr, textError);
  }
  if (password.value === firstN.value || password.value === lastN.value) {
    addError(arr, CONFIG.password.errDubl);
  }
};
const onChangePassword = () => {
  deleteError(CONFIG.password.length);
  checkPaswword(password, CONFIG.password.length, CONFIG.password.err);
};

//confirm_password

const checkDuplicatePassword = () => {
  deleteError(CONFIG.confirm_password.length);
  if (password.value !== confirm_password.value) {
    addError(CONFIG.confirm_password.length, CONFIG.confirm_password.err);
  }
};

//user Data
const USER_DATA = {
  user_name: firstN.value,
  user_last_name: lastN.value,
  email: email.value,
  phone: phone.value,
  password: password.value,
  confirm_password: confirm_password.value,
};

//check on error
const deleteAllError = () => {
  label.forEach((element, i) => {
    if (element.querySelector("p")) {
      element.lastElementChild.remove();
      label[i].firstElementChild.style.borderBottom = "4px solid #668d39";
    }
  });
};
const errorAndEmpty = () => {
  label.forEach((element) => {
    if (element.lastElementChild.value === "") {
      addError(6, "Заповніть корректно всі поля");
    }
  });
  if (btnSub.querySelector("p")) {
    addError(6, "Заповніть корректно всі поля");
    return;
  }
  console.log(USER_DATA);
  cleanValue();
  done()
};

const cleanValue = () => {
  label.forEach((element) => {
    element.lastElementChild.value = "";
  });
};

// button reset
const reset = (e) => {
  deleteAllError();
  cleanValue();
  e.preventDefault();
};

//button submit
const submitHeandler = (e) => {
  e.preventDefault();
  deleteError(CONFIG.confirm_password.length);
  errorAndEmpty();
};

//add img done
const done = () => {
  const background = document.getElementById('background')
  const img = document.createElement('img')
  img.src = "./img/done.png"
  img.alt = 'done'
  background.append(img)
}

firstN.addEventListener("change", onChangeName);
lastN.addEventListener("change", onChangeLastName);
email.addEventListener("change", onChangeEmail);
select.addEventListener("change", changeOption);
phone.addEventListener("change", checkPhone);
date.addEventListener("change", onChangeDate);
password.addEventListener("change", onChangePassword);
confirm_password.addEventListener("change", checkDuplicatePassword);
btnRes.addEventListener("click", reset);
btnSub.addEventListener("submit", submitHeandler);
