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
  let reanswerImg = document.querySelector(".reanswer-img");
  let imgReAnswImgAvatar = reanswerImg.getAttribute("src");
  let buttonSend;
  let countNew;
  let btnAnswer;
  let plusTest;
  let minusTest;
  let reAnwerCommentBlock;
  let counter = 0;
  let reAnswerBlock;
  let blockAnswerComments;

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
      comment_add.disabled = true;
      count.innerHTML = "Слишком длинное сообщение";
    } else {
      comment_add.disabled = false;
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
                                    <button id="btn-reanswer">
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
                        <div class="reanswer" id="reanswer">
                            
                        </div>
                        <div id="block-send-answer"></div>
                </div>
                `;
    });

    newComment.innerHTML = out;

    if ((newComment.innerHTML = out)) {
      plusTest = document.querySelector("#plus-test");
      minusTest = document.querySelector("#minus-test");
      countNew = document.querySelector("#count_new");
      btnAnswer = document.querySelector("#btn-reanswer");

      minusTest.addEventListener("click", minusCounter);
      plusTest.addEventListener("click", plusCounter);
      btnAnswer.addEventListener("click", addAnswer);
    }
  }

  function addAnswer() {
    reAnwerCommentBlock = document.querySelector("#reanswer");
    let inputAnswer;

    if (
      reAnwerCommentBlock !== null &&
      reAnwerCommentBlock.children.length === 0
    ) {
      inputAnswer = document.createElement("textarea");
      inputAnswer.id = "answerInput";
      inputAnswer.classList.add("text-area");
      inputAnswer.type = "text";
      inputAnswer.name = "answerInput";
      inputAnswer.value = "";
      inputAnswer.placeholder = "Введите текст сообщения...";
      inputAnswer.classList.add("focus");

      reAnwerCommentBlock.appendChild(inputAnswer);
    } else {
      throw new Error();
    }

    reAnswerBlock = document.querySelector("#block-send-answer");
    if (reAnswerBlock !== null && reAnswerBlock.children.length === 0) {
      buttonSend = document.createElement("button");
      buttonSend.id = "btn-send-message";
      buttonSend.type = "submit";
      buttonSend.textContent = "Отправить";
      buttonSend.classList.add("btn-answer-question");
      reAnswerBlock.appendChild(buttonSend);
    } else {
      throw new Error();
    }
    buttonSend.addEventListener("click", () => {
      let textValueAnswer = inputAnswer.value;
      //let correct = textValueAnswer > max;

      //correct ||
      event.preventDefault();
      let comment2 = {
        img: imgReAnswImgAvatar,
        title: userName.textContent,
        comment: textValueAnswer,
        time: Math.floor(Date.now() / 1000),
        counter: counter,
      };

      textValueAnswer = "";
      //   if (correct) {
      //     buttonSend.disabled = true;
      //   } else {
      //     if (textValueAnswer != 0) {
      comments.push(comment2);

      saveComments();
      showAnswerComments();
      console.log(comments);
      //     }
      //   }
    });
  }

  function showAnswerComments() {
    blockAnswerComments = document.getElementById("answer-question-block");
    //blockAnswerComments.classList.add("reanswer-comments");
    let output = "";
    Object.keys(comments[1]).forEach((item) => {
      output += `<div class="reanswer-img-wrapper">
                            <img src="${item.img}" alt="avatar">
                        </div>
                        <div class="reanswer-text-block">
                            <div class="title-comments">
                                <label for="user-name">Джунбокс3000</label>
                                <svg id="user-svg" width="22" height="22" viewBox="0 0 22 22" fill="none"
                                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                    <g opacity="0.4">
                                        <mask id="mask0_3_259" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0"
                                            y="0" width="22" height="22">
                                            <rect width="22" height="22" fill="url(#pattern0)" />
                                        </mask>
                                        <g mask="url(#mask0_3_259)">
                                            <rect x="-2" y="-1" width="26" height="25" fill="black" />
                                        </g>
                                    </g>
                                    <defs>
                                        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1"
                                            height="1">
                                            <use xlink:href="#image0_3_259" transform="scale(0.01)" />
                                        </pattern>
                                        <image id="image0_3_259" width="100" height="100"
                                            xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAAEvElEQVR4nO2cW4hVVRiAvzONFOOMRWMD6aA1E4OJBVEveQHD7KGHSKiHoKIQAiPQCOshovAlXyL0pZdQH9QuFEQWEdHV7lEYJVFmiZYYRNNNytIzPfxn8njmXNZeZ+3173X2/8HPzJlhzvnX/82+rfXvDYZhGIZhGIZhFIz12gkYwhDwNDClnYgBVwAHEBkmRJnbgeOclmFClBgEdnGmCBOixCLgC5rLMCGRuQ34k9YyTEgkzgG20F6ECYnEBLAPNxkmJGfWAJO4yzAhOXE27rsoE5IzC4AP8JNhQgJzA/AL/jJMSCD6gc1Ale5kmJAAjALv0r0IExKAVcAxwskwIZ6cBTwCnCKsDBPiwQjwGuFFmBAPVgJHyU+GCXGkAjwAnCRfGSbEgbnAK+QvohRCKl3+/QrgKWB+gFxc+R34rRa/1n1/DPi2Lg4jJxWloALcD/xLvC0ja5wAvgJ2AncDlwF9eRRDm/OBPegX3CcmgZeBjcDFoQujwZXAQfQLGyr2I9dLl4QsUizWI7sB7SLmEVVgL3ATclFbaOqb1MoQ3yH/fLNDFC80jU1qZYqfgQeR9f5C0KxJrYxxpFYLNdo1qZU5XgeWdFFXL5Yg5+7agy9qnADupfsLaidcmtQsJF4Ehv3K3JksTWoWp+MIsNyj3m3pQza/wdBvXAJGgTfJ8YBvuyy/qAL3edTbiU6d5xatY7NHvZ2w017/2OJRb2fswtAvHvIptitlnjrxjSpwh0+xXRkCninAQFOKf4DrfIqdhbvo3en3PGKSCItgVyHT09qDTSU+AmZ5VToD5wLPKQ80pXjUr8zZmO7DKnKTQ1HiFNLjHIUVwA85D6gX4gCOC10hppFHkFab1QHey4UBZHBzkP3zeUiz3gW1uBBYCIwB47XfF4FNwMOxPqyv9mFFbCUdBq5B1jF2AF8S5sahrPE3csdxVFYBP3WZeGghzRhGbq97DGkFiiXlpUD5Z2Ie8LZHsjGFNDKOdJq8R/5bz9KcxtCWfuR0L4/B5c04svs9nEPuU8AbEcbQkuuRdpqUhEzTjzTO7Q2c/xQRT4ObMYrsClITUs8ywvYzvxo3/ZnMAh4n/duiryXMAl4VWBw596asQe7pSFUIyK7sHuQ+lW7G8UTsxFsxDnxKukKmWYjsenzHcRyZFywEvfLwmQrd3RWwNn7K7bkF+IN0hUxzNX4PSHhLI9lOTACfk7YQkMWor8l+cC/knVwDwHbSFgIy0foJ2aRsVMnUkTvp3OlSdAaRTnlXIe/opOnOpciMbKpCQBpDPsNNyElk+aDQDAG7SVcIyLrMIdyk3KqUY2bWIesIKQoB2dpdnqC3TStBH1J/GP+NdBZyUC07T+YAz5KmEIAn6SxlgVp2nlSADdpJeDJI55bcm9WyKykraS9kk15q5eV5Wgt5QTGv0jLGzLPGZA/svcJWWs9rDSnmVVouonUL7tKefKBXwTmEHEuaMWFCdNja4ufzTYgO7wPfNPn5vMI/rKuHmYtcm9RzVCMRQ7icmQf1j1UzKjkV4EfOFPK9HUP0mEJWFuuZbUJ0+bDh9YAJ0WVfw+sBlSyM/xmh4cAe5VF1RlvGal//QiYeDcMwDMMwDMMwDMMwjOb8B7T5oNqqo7gkAAAAAElFTkSuQmCC" />
                                    </defs>
                                </svg>
                                <div class="user-answer">
                                    <span>Максим Авдеенко</span>
                                </div>
                                <div class="time-date-comments">
                                    <span>
                                        ${timeConverter(item.time)}
                                    </span>
                                </div>
                            </div>
                            <div class="answer-user-comments">
                                <span>
                                   ${item.comment}
                                </span>
                            </div>
                            <div class="favorite-answer-block">
                                <div class="favourites-heart">
                                    <button>
                                        <span> В избранном </span>
                                        </button>
                                </div>
                                
                                <div class="plus-minus-comments">
                                    <button id="minus_anwer" class="minus">
                                        <span> &#8722; </span>
                                    </button>
                                    <span id="count_answer" class="count">
                                        ${item.counter}
                                    </span>
                                    <button id="plus_answer" class="plus">
                                        <span> &#43; </span>
                                    </button>
                                </div>
                            </div>
                        </div>`;
    });
    blockAnswerComments.innerHTML = output;
    console.log(blockAnswerComments);
  }

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
