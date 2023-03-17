window.addEventListener("DOMContentLoaded", (e) => {
  const txHeight = 61;
  const tx = document.getElementsByTagName("textarea");

  for (let i = 0; i < tx.length; i++) {
    if (tx[i].value == "") {
      tx[i].setAttribute(
        "style",
        "height:" + txHeight + "px; overflow-y:hidden;"
      );
    } else {
      tx[i].setAttribute(
        "style",
        "height:" + tx[i].scrollHeight + "px;overflow-y:hidden;"
      );
    }
    tx[i].addEventListener("input", OnInput, false);
  }

  function OnInput(e) {
    this.style.height = 0;
    this.style.height = this.scrollHeight + "px";
  }

  let textarea = document.getElementById("text_area");
  let count = document.getElementById("count_display");
  let btn = document.querySelector(".btn-submit");
  let btn_answer = document.getElementById("btn-answer");
  let comment_add = document.getElementById("comment-add");
  let userName = document.getElementById("user-name");
  let userImage = document.querySelector(".img-wrapper");
  let imageObject = document.querySelector(".img-avatar-answer");
  let imageSrc = userImage.getElementsByTagName("img")[0].src;
  let count_display = document.querySelector("#count_average");
  let count_answer = document.querySelector("#count_answer");
  let plus = document.getElementById("plus");
  let minus = document.getElementById("minus");
  let minus_anwer = document.getElementById("minus_anwer");
  let plus_answer = document.getElementById("plus_answer");
  let countNew;
  let plusTest;
  let minusTest;
  let counter = 0;
  let conterComments = 0;

  let comments = [];
  loadComments();
  let { length } = textarea.value;

  let max = 1000;

  comment_add.addEventListener("click", () => {
    let correctly = length.length > max;
    correctly || event.preventDefault();
    imageObject.setAttribute("data", imageSrc);

    let comment = {
      img: imageSrc,
      title: userName.textContent,
      comment: textarea.value,
      time: Math.floor(Date.now() / 1000),
      counter: counter,
    };
    textarea.value = "";
    if (correctly) {
      count.innerHTML = "Слишком длинное сообщение";
    } else {
      if (length != 0) {
        comments.push(comment);

        saveComments();
        showComments();
      }
    }
  });

  function saveComments() {
    localStorage.setItem("comments", JSON.stringify(comments));
  }

  function loadComments() {
    if (localStorage.getItem("comments")) {
      comments = JSON.parse(localStorage.getItem("comments"));
    }
    showComments();
  }

  function showComments() {
    let newComment = document.getElementById("new_comments");
    newComment.classList.add("answer-comments-wrapper");
    let out = "";

    comments.forEach((item) => {
      out += `<div class="img-wrapper-answer">
                        <img class="img-avatar" src=${item.img}></img>
                </div>
                <div class="answer-comments">
                        <div class="row-name-and-date">
                            <label>${item.title}</label>
                        <span class="date-time">${timeConverter(item.time)}
                            </span>
                        </div>
                        <span  class="text-message">${item.comment}</span>
                        <div class="favorite-answer-block">
                                <div class="answer">
                                    <button id="btn-answer">
                                        <img src="css/img/Mask group.svg" alt="answer">
                                        <span>
                                            Ответить
                                        </span>
                                    </button>
                                </div>
                                <div class="favourites">
                                    <span> &#10084; В избранном </span>
                                </div>
                                <div class="plus-minus-comments">
                                    <button id="minus-test" class="minus">
                                        <span> &#8722; </span>
                                    </button>
                                    <span id="count_new" class="count">
                                      ${item.counter}
                                    </span>
                                    <button id="plus-test" class="plus">
                                        <span> &#43; </span>
                                    </button>
                                </div>
                        </div>   
                </div>
                `;
    });

    newComment.innerHTML = out;
    if ((newComment.innerHTML = out)) {
      plusTest = document.querySelector("#plus-test");
      minusTest = document.querySelector("#minus-test");
      countNew = document.querySelector("#count_new");
      minusTest.addEventListener("click", minusCounter);
      plusTest.addEventListener("click", plusCounter);
    }
  }
  // function plusCounter() {
  //   counter++;
  //   count_display.textContent = counter;
  // }
  function minusCounter() {
    counter--;
    countNew.textContent = counter;
  }
  function plusCounter() {
    counter++;
    countNew.textContent = counter;
  }

  function timeConverter(UNIX_timestamp) {
    let a = new Date(UNIX_timestamp * 1000);
    let months = [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
    let time =
      date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
    return time;
  }

  textarea.addEventListener("input", () => {
    length = textarea.value;
    let styleAtrr = "color:red; display:flex; font-weight: 600;";
    count.setAttribute("style", styleAtrr);
    let divElement = document.createElement("div");
    divElement.textContent = "/1000";
    divElement.classList.add("black-text");
    count.appendChild(divElement);
    count.innerHTML = `${length.length}` + divElement.textContent;
  });
  //Count

  plus_answer.addEventListener("click", () => {
    counter++;
    count_answer.textContent = counter;
  });

  minus_anwer.addEventListener("click", () => {
    counter--;
    count_answer.textContent = counter;
  });

  minus.addEventListener("click", () => {
    counter--;
    count_display.textContent = counter;
  });

  function plusCount() {
    counter++;
    count_display.textContent = counter;
  }
  plus.addEventListener("click", plusCount);
});
