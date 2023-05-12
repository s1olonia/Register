// export { User }

class User {
  constructor(firstName, lastName, date, email, password, confirmPassword) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.date = date;
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
  }

  register() {
    const errors = this.validate();
    const previousValues = {
      firstName: this.firstName,
      lastName: this.lastName,
      date: this.date,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
    };

    if (errors.length > 0) {
      errors.forEach((error) => {
        console.log(error);

        const inputElement = error.inputElement;
        const errorMessage = error.message;
        inputElement.value = errorMessage;
        inputElement.classList.add("input-error");

        // Додавання попереднього значення до введених даних
        inputElement.addEventListener("mouseover", () => {
          inputElement.value = previousValues[inputElement.id];
          inputElement.style.background = "white";
          inputElement.style.color = "black";
        });
      });
      return;
    }

    localStorage.setItem(this.email, JSON.stringify(this));
    alert("Успішна реєстрація");
     window.location.href = "./profile.html";
  }

  validate() {
    //розрахунок дати -10 років
    const errors = [];
    function subtractYears(date, years) {
      date.setFullYear(date.getFullYear() - years);
      return date;
    }
    let currentDate = new Date();
    let tenYears = subtractYears(currentDate, 10);
    console.log(tenYears);

    if (new Date(document.getElementById("date").value) >= tenYears ) {
      errors.push({
        inputElement: document.getElementById("date"),
        a: (document.getElementById("date").type = "text"),
        message: "введіть коректну дату",
      });
    } 

    if (this.firstName.trim().length < 1) {
      errors.push({
        inputElement: document.getElementById("firstName"),
        message: "Ім'я повинно містити хоча б один символ",
      });
    }

    if (this.lastName.trim().length === 0) {
      errors.push({
        inputElement: document.getElementById("lastName"),
        message: "Прізвище є обов'язковим полем",
      });
    }

    if (!this.validateEmail()) {
      errors.push({
        inputElement: document.getElementById("email"),
        message: "Невірний формат електронної пошти",
      });
    }

    if (this.password.length < 8) {
      errors.push({
        inputElement: document.getElementById("password"),
        b: (document.getElementById("password").type = "text"),
        message: "не коректний пароль",
      });
    }

    if (this.password !== this.confirmPassword) {
      errors.push({
        inputElement: document.getElementById("confirmPassword"),
        c: (document.getElementById("confirmPassword").type = "text"),
        message: "паролі не співпадають",
      });
    } 
    return errors;
  }

  validateEmail() {
    const re = /\S+@\S+.\S+/;
    return re.test(this.email);
  }
}

const form = document.querySelector(".wrapper");
const loginForm = document.querySelector(".wrapperForm");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const date = document.getElementById("date").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  const user = new User(
    firstName,
    lastName,
    date,
    email,
    password,
    confirmPassword
  );
  user.register();
});


// SingIn
const formSingIn = document.querySelector(".formSingIn");
const registerBtnItem = document.getElementById("registerBtn");
const singInBtn = document.getElementById("singInBtn");

registerBtnItem.addEventListener("click", singIn);
function singIn(register) {
  form.classList.add("wrapperBlock");
  formSingIn.style.display = "none";
}

singInBtn.addEventListener("click", checkPassword);
function checkPassword() {
  const email = document.getElementById("emailSingIn").value;
  const password = document.getElementById("passwordSingIn").value;

  if (localStorage.getItem(email)) {
    const user = JSON.parse(localStorage.getItem(email));

    if (password === user.password) {
      window.location.href = "./profile.html";

      localStorage.setItem(email, 'email')
    } else {
      alert("Incorrect email or password");
    }
  } else {
    alert("Користувача з такою електронною поштою не знайдено");
  }
}

