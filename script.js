// kiểm tra sự tồn tại của tài khoản
function checkExistingUser(username) {
  var users = JSON.parse(localStorage.getItem("users"));
  if (users) {
    for (var i = 0; i < users.length; i++) {
      if (users[i].username === username) {
        alert("Tài khoản đã tồn tại!");
        return true;
      }
    }
  }
  return false;
}

// Register
function register() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirmPassword").value;

  // Kiểm tra xác nhận mật khẩu
  if (password !== confirmPassword) {
    alert("Password and Confirm Password must match!");
    return;
  }

  // Kiểm tra xem tài khoản đã tồn tại hay chưa
  if (checkExistingUser(username)) {
    return;
  }

  var user = {
    username: username,
    password: password,
  };

  var users = JSON.parse(localStorage.getItem("users")) || [];
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  alert("Registration successful!");
  goToLogin();
}

// Token
var isLogin = localStorage.getItem("token");

function checkLogin() {
  if (!isLogin) {
    window.location.href = "login.html";
  }
}
function checkLogin1() {
  if (isLogin) {
    window.location.href = "index.html";
  }
}
// Login
function login() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  var users = JSON.parse(localStorage.getItem("users"));

  // Tìm kiếm tài khoản trong danh sách
  var user = users.find(function (u) {
    return u.username === username && u.password === password;
  });

  if (user) {
    alert("Đăng nhập thành công!");
    localStorage.setItem("token", username);
    isLogin = true;
    window.location.href = "index.html";
  } else {
    alert("Sai mật khẩu hoặc tài khoản!");
  }
}

function changePassword() {
  var oldPassword = document.getElementById("oldPassword").value;
  var newPassword = document.getElementById("newPassword").value;
  var confirmNewPassword = document.getElementById("confirmNewPassword").value;
  var username = localStorage.getItem("token");

  var users = JSON.parse(localStorage.getItem("users"));

  var user = users.find(function (u) {
    return u.username === username && u.password === oldPassword;
  });

  if (user) {
    if (newPassword !== confirmNewPassword) {
      alert("New Password and Confirm New Password must match!");
      return;
    }

    user.password = newPassword;

    localStorage.setItem("users", JSON.stringify(users));

    alert("Password changed successfully!");
    goToIndex();
  } else {
    alert("Incorrect old password!");
  }
}

// function displayWelcomeMessage0() {
//   var token = localStorage.getItem("token");

//   if (token) {
//     var users = JSON.parse(localStorage.getItem("users"));

//     var user = users.find(function (u) {
//       return u.username === token;
//     });

//     if (user) {
//       document.getElementById("welcomeMessage").textContent =
//         "Welcome, " + user.username + "!";
//     } else {
//       document.getElementById("welcomeMessage").textContent = "Welcome!";
//     }
//   } else {
//     window.location.href = "login.html";
//   }
// }

// Hiển thị tên đăng nhập
function displayWelcomeMessage() {
  var token = localStorage.getItem("token");

  if (token) {
    var users = JSON.parse(localStorage.getItem("users"));

    // Tìm thông tin user dựa trên token (user đã đăng nhập)
    var user = users.find(function (u) {
      return u.username === token;
    });

    if (user) {
      var dropdownDiv = document.getElementById("welcomeMessage");

      // Tạo nút hiển thị user
      var usernameBtn = document.createElement("button");
      usernameBtn.className = "username-btn";
      usernameBtn.textContent = user.username;

      // Tạo menu khi nhấn vào tên user
      var dropdownContent = document.createElement("div");
      dropdownContent.className = "dropdown-content";

      // Tạo "Đổi mật khẩu" trong menu
      var changePasswordLink = document.createElement("a");
      changePasswordLink.href = "change_password.html";
      changePasswordLink.textContent = "Đổi mật khẩu";
      changePasswordLink.className = "change-password-link";
      dropdownContent.appendChild(changePasswordLink);

      // Tạo "Đăng xuất" trong menu
      var logoutLink = document.createElement("a");
      logoutLink.href = "#";
      logoutLink.textContent = "Đăng xuất";
      logoutLink.className = "logout-link";
      dropdownContent.appendChild(logoutLink);

      // Thêm nút tên người dùng và menu
      dropdownDiv.appendChild(usernameBtn);
      dropdownDiv.appendChild(dropdownContent);

      // Hiển thị menu khi di chuột qua nút tên user
      usernameBtn.addEventListener("mouseover", function () {
        dropdownContent.style.display = "block";
      });

      // Ẩn menu khi di chuột ra khỏi nút tên user
      dropdownDiv.addEventListener("mouseleave", function () {
        dropdownContent.style.display = "none";
      });

      // Thêm sự kiện để xử lý đăng xuất
      logoutLink.addEventListener("click", function () {
        localStorage.removeItem("token");
        window.location.href = "login.html"; // Chuyển hướng đến trang đăng nhập sau khi đăng xuất
      });
    }
  } else {
    window.location.href = "login.html";
  }
}

// Hàm xử lý đăng xuất

function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";

  // Sau khi đăng xuất thành công, thêm lớp "logout-visible" vào #userContainer để hiển thị nút logout
  var userContainer = document.getElementById("userContainer");
  userContainer.classList.add("logout-visible");
}
function goToRegister() {
  window.location.href = "register.html";
}

function goToLogin() {
  window.location.href = "login.html";
}
function goToWeb_HTML() {
  window.location.href = "web_HTML.html";
}
function goToWeb_CSS() {
  window.location.href = "web_CSS.html";
}
function goToWeb_JS() {
  window.location.href = "web_JS.html";
}
function goToIndex() {
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", function () {
  var registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
      event.preventDefault();
      register();
    });
  }
  // Thay thế nút onclick bên html
  var loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      login();
    });
  }
  getList();
});
// Kiểm tra nội dung đã được điền chưa
function validateInput() {
  var formElement = document.querySelector(".form");
  var inputElement = formElement.querySelectorAll(".form-input");
  for (var i = 0; i < inputElement.length; i++) {
    if (inputElement[i].value === "") {
      inputElement[i].parentElement.querySelector(
        ".err-message"
      ).innerText = `Please enter ${inputElement[i].id}`;
    } else {
      inputElement[i].parentElement.querySelector(".err-message").innerText =
        "";
    }
  }
}
// Xoa chu trong input
function resetInput() {
  document.getElementById("name").value = "";
  document.getElementById("address").value = "";
}

// // API Thêm
// function addNew() {
//   validateInput();
//   var formElement = document.querySelector(".form");
//   var errElement = formElement.querySelectorAll(".err-message");
//   var arrErrorElement = [];
//   for (let i = 0; i < errElement.length; i++) {
//     arrErrorElement.push(errElement[i].innerText);
//   }
//   var checkErrorElement = arrErrorElement.every((value) => value === "");
//   if (checkErrorElement) {
//     var name = document.getElementById("name").value;
//     var address = document.getElementById("address").value;

//     var listStudent = JSON.parse(localStorage.getItem("list-student")) || [];
//     var loggedInUser = getLoggedInUser();
//     var currentTime = new Date().toLocaleTimeString();

//     listStudent.push({
//       name: name,
//       address: address,
//       addedBy: loggedInUser ? loggedInUser.username : "Unknown",
//       addedAt: currentTime,
//       lastEditedBy: loggedInUser ? loggedInUser.username : "Unknown",
//       lastEditedAt: currentTime,
//     });
//     localStorage.setItem("list-student", JSON.stringify(listStudent));
//     getList();
//     resetInput();
//   }
// }
// API Get
// function getList() {
//   var listStudent = localStorage.getItem("list-student")
//     ? JSON.parse(localStorage.getItem("list-student"))
//     : [];
//   var tableStudent = `
//               <tr id="tableHeader">
//                       <td>STT</td>
//                       <td>Câu hỏi</td>
//                       <td>Loại câu hỏi</td>
//                       <td>Người thêm</td>
//                       <td>Thời gian thêm</td>
//                       <td>Người chỉnh sửa gần nhất</td>
//                       <td>Thời gian sửa gần nhất</td>
//                       <td>Trạng thái</td>
//                       <td>Xem chi tiết</td>
//                       <td>Chức Năng</td>
//                   </tr>`;
//   listStudent.map((value, index) => {
//     tableStudent += `<tr>
//               <td>${index + 1}</td>
//               <td>${value.name}</td>
//               <td>${value.address}</td>
//               <td>${value.addedBy}</td>
//               <td>${value.addedAt}</td>
//               <td>${value.lastEditedBy}</td>
//               <td>${value.lastEditedAt}</td>
//               <td>Trạng thái</td>
//               <td>Xem chi tiết</td>
//               <td>
//               <button onclick="updateItem(${index})">Edit</button>
//               <button onclick="deleteItem(${index})" >Delete</button>
//               </td>
//           </tr>`;
//   });
//   document.getElementById("tableContent").innerHTML = tableStudent;
// }

// // API Sửa
// function updateItem(index) {
//   var listStudent = localStorage.getItem("list-student")
//     ? JSON.parse(localStorage.getItem("list-student"))
//     : [];
//   document.getElementById("name").value = listStudent[index].name;
//   document.getElementById("address").value = listStudent[index].address;
//   document.getElementById("index").value = index; // Hứng index

//   document.getElementById("saveItem").style.display = "none";
//   document.getElementById("updateInput").style.display = "inline-block";
// }
// function changeItem() {
//   var listStudent = localStorage.getItem("list-student")
//     ? JSON.parse(localStorage.getItem("list-student"))
//     : [];
//   var index = document.getElementById("index").value;
//   listStudent[index] = {
//     name: document.getElementById("name").value,
//     address: document.getElementById("address").value,
//     addedBy: listStudent[index].addedBy, // Giữ người thêm không thay đổi
//     addedAt: listStudent[index].addedAt,
//     lastEditedBy: getLoggedInUser().username, // Lấy thông tin người chỉnh sửa mới
//     lastEditedAt: new Date().toLocaleString(),
//   };
//   localStorage.setItem("list-student", JSON.stringify(listStudent));

//   document.getElementById("saveItem").style.display = "inline-block";
//   document.getElementById("updateInput").style.display = "none";

//   getList();
//   resetInput();
//   alert("Cập nhật thành công!");
// }
// // API Xóa
// function deleteItem(index) {
//   var listStudent = localStorage.getItem("list-student")
//     ? JSON.parse(localStorage.getItem("list-student"))
//     : [];
//   if (confirm("Are you sure?")) {
//     listStudent.splice(index, 1);
//     alert("Đã xoá thành công!");
//   }
//   localStorage.setItem("list-student", JSON.stringify(listStudent));
//   getList();
// }

function getLoggedInUser() {
  var username = localStorage.getItem("token");
  var users = JSON.parse(localStorage.getItem("users")) || [];
  var loggedInUser = users.find(function (user) {
    return user.username === username;
  });
  return loggedInUser;
}

//
function handleQuestionSelection(event) {
  var selectedOption = event.target.value;
  var inputContainer = document.getElementById("inputContainer");

  // Ẩn tất cả các input câu hỏi
  var allInputs = inputContainer.querySelectorAll("div[id$='Input']");
  allInputs.forEach(function (input) {
    input.classList.add("hidden");
  });

  // Hiển thị input tương ứng với lựa chọn
  var selectedInput = document.getElementById(selectedOption + "Input");
  if (selectedInput) {
    selectedInput.classList.remove("hidden");
  }
  if (selectedOption === "datalist") {
    createQuestionTable(); // Tạo bảng câu hỏi đã thêm

    document.getElementById("questionList").style.display = "block"; // Hiển thị div chứa bảng
  } else {
    document.getElementById("questionList").style.display = "none"; // Ẩn div chứa bảng
  }
}

function handleAnswerCountChange(event) {
  var answerCount = parseInt(event.target.value);
  var answersContainer = document.getElementById("answers-container");
  // Xóa các ô đáp án hiện có
  answersContainer.innerHTML = "";

  // Tạo các ô đáp án mới
  for (var i = 0; i < answerCount; i++) {
    var radioInput = document.createElement("input");
    radioInput.type = "radio";
    radioInput.name = "answer";
    radioInput.value = i + 1;
    console.log(radioInput);

    var answerInput = document.createElement("input");
    answerInput.type = "text";
    answerInput.placeholder = "Đáp án " + (i + 1);

    var answerContainer = document.createElement("div");

    answerContainer.appendChild(radioInput);
    answerContainer.appendChild(answerInput);

    answersContainer.appendChild(answerContainer);
  }
}

function handleAnswerCountChange3(event) {
  var answerCount = parseInt(event.target.value);
  var answersContainer = document.getElementById("answers-container3");
  answersContainer.innerHTML = "";

  for (var i = 0; i < answerCount; i++) {
    var checkboxInput = document.createElement("input");
    checkboxInput.type = "checkbox";
    checkboxInput.name = "answer3";
    checkboxInput.value = i + 1;

    var answerInput = document.createElement("input");
    answerInput.type = "text";
    answerInput.placeholder = "Đáp án " + (i + 1);

    var answerContainer = document.createElement("div");

    answerContainer.appendChild(checkboxInput);
    answerContainer.appendChild(answerInput);

    answersContainer.appendChild(answerContainer);
  }
}
function saveQuestion() {
  var questionInput = document.getElementById("question1");
  var answersContainer = document.getElementById("answers-container");
  var radioInputs = answersContainer.querySelectorAll("input[type='radio']");
  var answerInputs = answersContainer.querySelectorAll("input[type='text']");

  var question = questionInput.value;
  var correctAnswer = [];
  var userAnswers = [];

  // Lặp qua tất cả các input để lấy thông tin đáp án và đáp án đúng
  for (var i = 0; i < radioInputs.length; i++) {
    var radioInput = radioInputs[i];
    var answerInput = answerInputs[i];

    var answer = answerInput.value;
    var isCorrect = radioInput.checked;

    userAnswers.push(answer);

    if (isCorrect) {
      correctAnswer.push(answer);
    }
  }

  // Kiểm tra cấu trúc dữ liệu
  if (
    !question ||
    correctAnswer.length !== 1 ||
    userAnswers.length !== radioInputs.length
  ) {
    alert("Vui lòng nhập câu hỏi và chọn chính xác một đáp án đúng!");
    return;
  }
  var questions = localStorage.getItem("questions")
    ? JSON.parse(localStorage.getItem("questions"))
    : [];
  var loggedInUser = getLoggedInUser();
  var currentTime = new Date().toLocaleTimeString();
  var newQuestion = {
    type: "one_answer",
    question: question,
    correctAnswer: correctAnswer,
    userAnswers: userAnswers,
    addedBy: loggedInUser ? loggedInUser.username : "Unknown",
    addedAt: currentTime,
    lastEditedBy: "",
    lastEditedAt: "",
  };

  questions.push(newQuestion);

  // Lưu lại danh sách câu hỏi vào localStorage
  localStorage.setItem("questions", JSON.stringify(questions));

  // Reset input sau khi lưu câu hỏi thành công
  questionInput.value = "";
  radioInputs.forEach(function (input) {
    input.checked = false;
  });
  answerInputs.forEach(function (input) {
    input.value = "";
  });

  alert("Lưu câu hỏi thành công!");
  getList();
}
function saveQuestion2() {
  var questionInput = document.getElementById("question2");
  var answerInput = document.getElementById("answer2");

  var question = questionInput.value;
  var answer = answerInput.value;

  if (!question || !answer) {
    alert("Vui lòng nhập câu hỏi và câu trả lời!");
    return;
  }
  var loggedInUser = getLoggedInUser();
  var currentTime = new Date().toLocaleTimeString();
  var newQuestion = {
    type: "fill_in_blank",
    question: question,
    correctAnswer: answer,
    addedBy: loggedInUser ? loggedInUser.username : "Unknown",
    addedAt: currentTime,
    lastEditedBy: "",
    lastEditedAt: "",
  };
  var questions = localStorage.getItem("questions")
    ? JSON.parse(localStorage.getItem("questions"))
    : [];
  questions.push(newQuestion);

  // Lưu lại danh sách câu hỏi vào localStorage
  localStorage.setItem("questions", JSON.stringify(questions));

  questionInput.value = "";
  answerInput.value = "";

  alert("Lưu câu hỏi thành công!");
  getList();
}
function saveQuestion3() {
  var questionInput = document.getElementById("question3");
  var answersContainer = document.getElementById("answers-container3");
  var checkboxInputs = answersContainer.querySelectorAll(
    "input[type='checkbox']"
  );
  var answerInputs = answersContainer.querySelectorAll("input[type='text']");

  var question = questionInput.value;
  var correctAnswers = [];
  var userAnswers = [];

  // Lặp qua tất cả các input để lấy thông tin đáp án và đáp án đúng
  checkboxInputs.forEach(function (input, index) {
    var answerInput = answerInputs[index];
    var answer = answerInput.value;
    var isCorrect = input.checked;

    userAnswers.push(answer);

    if (isCorrect) {
      correctAnswers.push(answer);
    }
  });

  // Kiểm tra cấu trúc dữ liệu
  if (
    !question ||
    correctAnswers.length === 0 ||
    userAnswers.length !== checkboxInputs.length
  ) {
    alert("Vui lòng nhập câu hỏi và chọn ít nhất một đáp án đúng!");
    return;
  }
  var loggedInUser = getLoggedInUser();
  var currentTime = new Date().toLocaleTimeString();
  var newQuestion = {
    type: "multiple_answers",
    question: question,
    correctAnswers: correctAnswers,
    userAnswers: userAnswers,
    addedBy: loggedInUser ? loggedInUser.username : "Unknown",
    addedAt: currentTime,
    lastEditedBy: "",
    lastEditedAt: "",
  };
  var questions = localStorage.getItem("questions")
    ? JSON.parse(localStorage.getItem("questions"))
    : [];
  questions.push(newQuestion);

  // Lưu lại danh sách câu hỏi vào localStorage
  localStorage.setItem("questions", JSON.stringify(questions));

  // Reset input sau khi lưu câu hỏi thành công
  questionInput.value = "";
  checkboxInputs.forEach(function (input) {
    input.checked = false;
  });
  answerInputs.forEach(function (input) {
    input.value = "";
  });

  alert("Lưu câu hỏi thành công!");
  getList();
}

function createQuestionTable() {
  var storedQuestions = localStorage.getItem("questions");
  var questions = storedQuestions ? JSON.parse(storedQuestions) : [];

  var questionListContainer = document.getElementById("questionList");
  questionListContainer.innerHTML = "";

  questions.forEach(function (questionObj, index) {
    var questionItem = document.createElement("div");
    questionItem.textContent =
      "Câu hỏi " + (index + 1) + ": " + questionObj.question;

    questionListContainer.appendChild(questionItem);
  });
}

function getList() {
  var listQuestions = localStorage.getItem("questions")
    ? JSON.parse(localStorage.getItem("questions"))
    : [];
  var tableContent = `
  <tr id="tableHeader">
  <th >STT</th>
  <th class="question">Câu hỏi</th>
  <th class="question-type">Loại câu hỏi</th>
  <th class="user">Người thêm</th>
  <th class="time">Thời gian thêm</th>
  <th class="user">Người chỉnh sửa gần nhất</th>
  <th class="time">Thời gian sửa gần nhất</th>
  <th class="status">Trạng thái</th>
  <th class="detail">Xem chi tiết</th>
  <th class="function">Chức năng</th>
</tr>`;
  listQuestions.map(function (question, index) {
    var questionItem = `
  <tr>
      <td>${index + 1}</td>
      <td>${question.question}</td>
      <td>${getQuestionType(question)}</td>
      <td>${question.addedBy}</td>
      <td>${question.addedAt}</td>
      <td>${question.lastEditedBy}</td>
      <td>${question.lastEditedAt}</td>
      <td>Trạng thái</td>
      <td>
      <div class="popup" onclick="showQuestionDetail(${index})">Xem chi tiết
      <span class="popuptext" id="myPopup"></span>
      </div>
      </td>
      <input id="index" type="hidden">

      <td>
          <button onclick="editQuestion(${index})">Sửa</button>
          <button onclick="deleteQuestion(${index})">Xóa</button>
      </td>
  </tr>`;
    tableContent += questionItem;
  });
  document.getElementById("tableContent").innerHTML = tableContent;
}

function getQuestionType(question) {
  if (question.type === "one_answer") {
    return "Một đáp án";
  } else if (question.type === "multiple_answers") {
    return "Nhiều đáp án";
  } else if (question.type === "fill_in_blank") {
    return "Điền";
  } else {
    return "Không xác định";
  }
}

function showQuestionDetail(index) {
  var listQuestions = localStorage.getItem("questions")
    ? JSON.parse(localStorage.getItem("questions"))
    : [];
  if (index >= 0 && index < listQuestions.length) {
    var question = listQuestions[index];

    var modalBackground = document.getElementById("modalBackground");
    var questionDetailForm = document.getElementById("questionDetailForm");
    var questionDetailTextArea = document.getElementById("questionDetail");
    var questionTypeDetailInput = document.getElementById("questionTypeDetail");
    var closeButton = document.getElementById("closeButton");

    questionDetailTextArea.value = question.question;
    questionTypeDetailInput.value = getQuestionType(question);

    // Hiển thị nền mờ và form
    modalBackground.style.display = "block";
    questionDetailForm.style.display = "block";

    // Thêm sự kiện click vào nút "X" để đóng form và ẩn nền mờ
    closeButton.addEventListener("click", function () {
      modalBackground.style.display = "none";
      questionDetailForm.style.display = "none";
    });

    // Thêm sự kiện click vào nền mờ để đóng form và ẩn nền mờ
    modalBackground.addEventListener("click", function (event) {
      if (event.target === modalBackground) {
        modalBackground.style.display = "none";
        questionDetailForm.style.display = "none";
      }
    });
  }
}

// function showQuestionDetail(index) {
//   var listQuestions = localStorage.getItem("questions")
//     ? JSON.parse(localStorage.getItem("questions"))
//     : [];
//   if (index >= 0 && index < listQuestions.length) {
//     var question = listQuestions[index];
//     var popup = document.getElementById("myPopup");
//     popup.textContent = "Câu hỏi: " + question.question;
//     popup.classList.toggle("show");
//   }
// }
// Xóa
function deleteQuestion(index) {
  var listQuestions = localStorage.getItem("questions")
    ? JSON.parse(localStorage.getItem("questions"))
    : [];

  if (index >= 0 && index < listQuestions.length) {
    // Xóa câu hỏi khỏi danh sách
    listQuestions.splice(index, 1);

    // Lưu danh sách câu hỏi mới vào localStorage
    localStorage.setItem("questions", JSON.stringify(listQuestions));

    // Cập nhật lại bảng hiển thị câu hỏi
    getList();

    alert("Đã xóa câu hỏi thành công!");
  }
}
function editQuestion(index) {
  var listQuestions = localStorage.getItem("questions")
    ? JSON.parse(localStorage.getItem("questions"))
    : [];
  if (index >= 0 && index < listQuestions.length) {
    var questionObj = listQuestions[index];
    document.getElementById("index").value = index; // Hứng index
    // Kiểm tra xem câu hỏi cần sửa có đúng cấu trúc hay không
    if (questionObj) {
      var editQuestion1Form = document.getElementById("editQuestion1Form");
      var editQuestion2Form = document.getElementById("editQuestion2Form");
      var editQuestion3Form = document.getElementById("editQuestion3Form");

      // Ẩn tất cả các form chỉnh sửa
      editQuestion1Form.style.display = "none";
      editQuestion2Form.style.display = "none";
      editQuestion3Form.style.display = "none";

      if (questionObj.type === "one_answer") {
        // Nếu câu hỏi là dạng 1 đáp án, hiển thị form chỉnh sửa cho dạng 1 đáp án
        editQuestion1Form.style.display = "block";

        // Lấy thông tin câu hỏi cần sửa và điền vào các input tương ứng cho dạng 1 đáp án
        var editQuestion1 = document.getElementById("editQuestion1");
        var editAnswerCount = document.getElementById("editAnswerCount");
        var editAnswersContainer = document.getElementById(
          "editAnswers-container"
        );

        editQuestion1.value = questionObj.question;
        editAnswerCount.value = questionObj.userAnswers.length;

        // Xóa các ô đáp án hiện có trong input
        editAnswersContainer.innerHTML = "";

        // Tạo các ô đáp án mới và điền thông tin đáp án từ câu hỏi cần sửa vào
        for (var i = 0; i < questionObj.userAnswers.length; i++) {
          var radioInput = document.createElement("input");
          radioInput.type = "radio";
          radioInput.name = "editAnswer";
          radioInput.value = i + 1;
          // Tích chọn đáp án đúng
          if (questionObj.correctAnswer.includes(questionObj.userAnswers[i])) {
            radioInput.checked = true;
          }

          var answerInput = document.createElement("input");
          answerInput.type = "text";
          answerInput.placeholder = "Đáp án " + (i + 1);
          answerInput.value = questionObj.userAnswers[i];

          var answerContainer = document.createElement("div");

          answerContainer.appendChild(radioInput);
          answerContainer.appendChild(answerInput);

          editAnswersContainer.appendChild(answerContainer);
        }
      } else if (questionObj.type === "fill_in_blank") {
        // Nếu câu hỏi là dạng điền, hiển thị form chỉnh sửa cho dạng điền
        editQuestion2Form.style.display = "block";

        // Lấy thông tin câu hỏi cần sửa và điền vào các input tương ứng cho dạng điền
        var editQuestion2 = document.getElementById("editQuestion2");
        var editAnswer2 = document.getElementById("editAnswer2");

        editQuestion2.value = questionObj.question;
        editAnswer2.value = questionObj.correctAnswer;
      } else if (questionObj.type === "multiple_answers") {
        // Nếu câu hỏi là dạng nhiều đáp án, hiển thị form chỉnh sửa cho dạng nhiều đáp án
        editQuestion3Form.style.display = "block";

        // Lấy thông tin câu hỏi cần sửa và điền vào các input tương ứng cho dạng nhiều đáp án
        var editQuestion3 = document.getElementById("editQuestion3");
        var editAnswerCount3 = document.getElementById("editAnswerCount3");
        var editAnswersContainer3 = document.getElementById(
          "editAnswers-container3"
        );

        editQuestion3.value = questionObj.question;
        editAnswerCount3.value = questionObj.userAnswers.length;

        // Xóa các ô đáp án hiện có trong input
        editAnswersContainer3.innerHTML = "";

        // Tạo các ô đáp án mới và điền thông tin đáp án từ câu hỏi cần sửa vào
        for (var i = 0; i < questionObj.userAnswers.length; i++) {
          var checkboxInput = document.createElement("input");
          checkboxInput.type = "checkbox";
          checkboxInput.name = "editAnswer3";
          checkboxInput.value = i + 1;
          // Tích chọn đáp án đúng
          if (questionObj.correctAnswers.includes(questionObj.userAnswers[i])) {
            checkboxInput.checked = true;
          }

          var answerInput = document.createElement("input");
          answerInput.type = "text";
          answerInput.placeholder = "Đáp án " + (i + 1);
          answerInput.value = questionObj.userAnswers[i];

          var answerContainer = document.createElement("div");

          answerContainer.appendChild(checkboxInput);
          answerContainer.appendChild(answerInput);

          editAnswersContainer3.appendChild(answerContainer);
        }
      }
    } else {
      // Hiển thị thông báo nếu câu hỏi cần sửa không tồn tại hoặc không đúng cấu trúc
      alert("Câu hỏi cần sửa không tồn tại hoặc không đúng cấu trúc!");
    }
  }
}
function updateQuestion1() {
  // Lấy thông tin câu hỏi cần cập nhật từ form chỉnh sửa
  var editQuestion1 = document.getElementById("editQuestion1");
  var editAnswerCount = document.getElementById("editAnswerCount");
  var editAnswersContainer = document.getElementById("editAnswers-container");
  var radioInputs = editAnswersContainer.querySelectorAll(
    "input[type='radio']"
  );
  var answerInputs =
    editAnswersContainer.querySelectorAll("input[type='text']");

  var question = editQuestion1.value;
  var userAnswers = [];
  var correctAnswer = [];

  // Lấy thông tin đáp án người dùng nhập từ input
  answerInputs.forEach(function (input) {
    userAnswers.push(input.value);
  });
  // Lấy thông tin đáp án đúng từ input
  radioInputs.forEach(function (input, idx) {
    if (input.checked) {
      var answer = answerInputs[idx].value;
      correctAnswer.push(answer);
    }
  });

  if (!question || correctAnswer.length === 0) {
    alert("Vui lòng nhập câu hỏi và chọn đáp án đúng!");
    return;
  }

  // Lấy chỉ mục (index) của câu hỏi trong mảng
  var index = document.getElementById("index").value;

  var questions = localStorage.getItem("questions")
    ? JSON.parse(localStorage.getItem("questions"))
    : [];

  // Update câu hỏi cần sửa trong danh sách
  if (index >= 0 && index < questions.length) {
    if (questions[index].type === "one_answer") {
      questions[index].question = question;
      questions[index].userAnswers = userAnswers;
      questions[index].correctAnswer = correctAnswer;
      questions[index].addedBy = questions[index].addedBy;
      questions[index].addedAt = questions[index].addedAt;
      questions[index].lastEditedBy = getLoggedInUser().username;
      questions[index].lastEditedAt = new Date().toLocaleString();
    }
  }

  // Lưu danh sách câu hỏi mới vào localStorage
  localStorage.setItem("questions", JSON.stringify(questions));

  // Ẩn form chỉnh sửa
  var editQuestion1Form = document.getElementById("editQuestion1Form");
  editQuestion1Form.style.display = "none";

  // Cập nhật lại bảng hiển thị câu hỏi
  getList();

  alert("Cập nhật câu hỏi thành công!");
}

function updateQuestion2() {
  // Lấy thông tin câu hỏi cần cập nhật từ form chỉnh sửa
  var editQuestion2 = document.getElementById("editQuestion2");
  var editAnswer2 = document.getElementById("editAnswer2");

  var question = editQuestion2.value;
  var answer = editAnswer2.value;

  // Lấy chỉ mục (index) của câu hỏi trong mảng
  var index = document.getElementById("index").value;

  var questions = localStorage.getItem("questions")
    ? JSON.parse(localStorage.getItem("questions"))
    : [];

  // Update câu hỏi cần sửa trong danh sách
  if (index >= 0 && index < questions.length) {
    if (questions[index].type === "fill_in_blank") {
      questions[index].question = question;
      questions[index].correctAnswer = answer;
      questions[index].addedBy = questions[index].addedBy;
      questions[index].addedAt = questions[index].addedAt;
      questions[index].lastEditedBy = getLoggedInUser().username;
      questions[index].lastEditedAt = new Date().toLocaleString();
    }
  }

  // Lưu danh sách câu hỏi mới vào localStorage
  localStorage.setItem("questions", JSON.stringify(questions));

  // Ẩn form chỉnh sửa
  var editQuestion2Form = document.getElementById("editQuestion2Form");
  editQuestion2Form.style.display = "none";

  // Cập nhật lại bảng hiển thị câu hỏi
  getList();

  alert("Cập nhật câu hỏi thành công!");
}

function updateQuestion3() {
  // Lấy thông tin câu hỏi cần cập nhật từ form chỉnh sửa
  var editQuestion3 = document.getElementById("editQuestion3");
  var editAnswerCount3 = document.getElementById("editAnswerCount3");
  var editAnswersContainer3 = document.getElementById("editAnswers-container3");
  var checkboxInputs = editAnswersContainer3.querySelectorAll(
    "input[type='checkbox']"
  );
  var answerInputs =
    editAnswersContainer3.querySelectorAll("input[type='text']");

  var question = editQuestion3.value;
  var userAnswers = [];
  var correctAnswers = [];

  // Lấy thông tin đáp án người dùng nhập từ input
  answerInputs.forEach(function (input) {
    userAnswers.push(input.value);
  });
  // Lấy thông tin đáp án đúng từ input
  checkboxInputs.forEach(function (input, index) {
    if (input.checked) {
      var answer = answerInputs[index].value;
      correctAnswers.push(answer);
    }
  });

  if (!question || correctAnswers.length === 0) {
    alert("Vui lòng nhập câu hỏi và chọn ít nhất một đáp án đúng!");
    return;
  }

  // Lấy chỉ mục (index) của câu hỏi trong mảng
  var index = document.getElementById("index").value;

  var questions = localStorage.getItem("questions")
    ? JSON.parse(localStorage.getItem("questions"))
    : [];

  // Update câu hỏi cần sửa trong danh sách
  if (index >= 0 && index < questions.length) {
    if (questions[index].type === "multiple_answers") {
      questions[index].question = question;
      questions[index].userAnswers = userAnswers;
      questions[index].correctAnswers = correctAnswers;
      questions[index].addedBy = questions[index].addedBy;
      questions[index].addedAt = questions[index].addedAt;
      questions[index].lastEditedBy = getLoggedInUser().username;
      questions[index].lastEditedAt = new Date().toLocaleString();
    }
  }

  // Lưu danh sách câu hỏi mới vào localStorage
  localStorage.setItem("questions", JSON.stringify(questions));

  // Ẩn form chỉnh sửa
  var editQuestion3Form = document.getElementById("editQuestion3Form");
  editQuestion3Form.style.display = "none";

  // Cập nhật lại bảng hiển thị câu hỏi
  getList();

  alert("Cập nhật câu hỏi thành công!");
}