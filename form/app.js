const CONFIG = {
  first_name: {
    min: 3,
    max: 25,
  },
  last_name: {
    min: 3,
    max: 25,
  }
};
const firstN = document.getElementById("first-name");
const lastN = document.getElementById("last-name");
const label = document.querySelectorAll("label");

//root

const upperCase = (text) => {
  text.value = text.value.charAt(0).toUpperCase() + text.value.slice(1);
};
const spaces = (text) => {
  text.value = text.value.split(" ").join("");
};

const addError = (input, min, max, arr, nameError) => {
  if (
    (input.value.length < min || input.value.length > max) &&
    !label[arr].querySelector("p")
  ) {
    const err = document.createElement("p");
    err.innerHTML = nameError;
    label[arr].append(err);
    label[arr].children[0].style.borderBottom = "4px solid red";
    return;
  }
};
const deleteError = (input, min, max, arr) => {
  if (
    input.value.length >= min &&
    input.value.length <= max &&
    label[arr].querySelector("p")
  ) {
    label[arr].lastElementChild.remove();
    label[arr].children[0].style.borderBottom = "4px solid #668d39";
    return;
  }
};

//first Name

const ruleName = () => {
  addError(
    firstN,
    CONFIG.first_name.min,
    CONFIG.first_name.max,
    0,
    "Імя повино складатися з 3 до 25 символів"
  );
  deleteError(firstN, CONFIG.first_name.min, CONFIG.first_name.max, 0);
};

const onChangeName = () => {
  upperCase(firstN);
  spaces(firstN);
  ruleName();
};

//last Name
const ruleLastName = () => {
    addError(
      lastN,
      CONFIG.last_name.min,
      CONFIG.last_name.max,
      1,
      "Прізвище повино складатися з 3 до 25 символів"
    );
    deleteError(lastN, CONFIG.last_name.min, CONFIG.last_name.max, 1);
  };

const onChangeLastName = () => {
    upperCase(lastN);
    spaces(lastN);
    ruleLastName();
  };

firstN.addEventListener("change", onChangeName);
lastN.addEventListener("change", onChangeLastName);

