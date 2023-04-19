window.addEventListener("DOMContentLoader", (e) => {
    const txHeight: number = 61;
const tx: HTMLCollectionOf<HTMLTextAreaElement> = document.getElementsByTagName("textarea");

for (let i = 0; i < tx.length; i++) {
if (tx[i].value == "") {
tx[i].setAttribute("style","height:"+txHeight + "px; overflow-y:hidden;");
} else {
tx[i].setAttribute("style","height:"+tx[i].scrollHeight+ "px;overflow-y:hidden;");
}
tx[i].addEventListener("input", OnInput, false);
}

function OnInput(event: Event): void {
const target = event.target as HTMLTextAreaElement;
target.style.height = "auto";
target.style.height = target.scrollHeight + "px";
    }
    
const textarea = document.getElementById("text_area") as HTMLTextAreaElement;
const count = document.getElementById("count_display") as HTMLElement;
const btn = document.querySelector(".btn-submit") as HTMLElement;

const comment_add = document.getElementById("comment-add") as HTMLElement;
const userName = document.getElementById("user-name") as HTMLElement;
const userImage = document.querySelector(".img-wrapper") as HTMLElement;
const imageObject = document.querySelector(".img-avatar-answer") as HTMLElement;
const imageSrc = userImage.getElementsByTagName("img")[0].src;
const count_display = document.querySelector("#count_average") as HTMLElement;
const count_answer = document.querySelector("#count_answer") as HTMLElement;
const plus = document.getElementById("plus") as HTMLElement;
const minus = document.getElementById("minus") as HTMLElement;
const minus_anwer = document.getElementById("minus_anwer") as HTMLElement;
const plus_answer = document.getElementById("plus_answer") as HTMLElement;
const reanswerImg = document.querySelector(".reanswer-img") as HTMLElement;
const imgReAnswImgAvatar = reanswerImg.getAttribute("src");
let buttonSend: HTMLElement;
let countNew: HTMLElement;
let btnAnswer: HTMLElement;
let plusTest: HTMLElement;
let minusTest: HTMLElement;
let reAnwerCommentBlock: HTMLElement;
let counter: number = 0;
let reAnswerBlock: HTMLElement;
let blockAnswerComments: HTMLElement;

    let comments: Comment[] = [];
    
    interface Comment {
        img: string;
        title: string;
        comment: string;
        time: number;
        counter: number;
    }

loadComments();
const { length } = textarea.value;

const max = 1000;
 
comment_add.addEventListener("click", () => {
  let correctly = textarea.value.length > max;
  correctly || event.preventDefault();
  imageObject.setAttribute("data", imageSrc);
    let comments: {
        img: string;
        title: string;
        comment: string;
        time: number;
        counter: number;
    }[] = [];
    
  let comment = {
    img: imageSrc,
    title: userName.textContent,
    comment: textarea.value,
    time: Math.floor(Date.now() / 1000),
    counter: counter,
  };
  textarea.value = "";

  if (correctly) {
    (comment_add as HTMLButtonElement).disabled = true;
    count.innerHTML = "Слишком длинное сообщение";
  } else {
    (comment_add as HTMLButtonElement).disabled = false;
    if (textarea.value.length != 0) {
      comments.push(comment);

      saveComments();
      showComments();
    }
  }
});
    
    
    
    function saveComments(): void {
  localStorage.setItem("comments", JSON.stringify(comments));
}

function loadComments(): void {
  if (localStorage.getItem("comments")) {
    comments = JSON.parse(localStorage.getItem("comments")!);
    }
     showComments();
    }

   function showComments() {
  const newComment = document.getElementById("new_comments") as HTMLElement;
  newComment.classList.add("answer-comments-wrapper");
  let out = "";

  comments.forEach((item: Comment) => {
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

  if (newComment.innerHTML === out) {
    plusTest = document.querySelector("#plus-test") as HTMLButtonElement;
    minusTest = document.querySelector("#minus-test") as HTMLButtonElement;
    countNew = document.querySelector("#count_new") as HTMLElement;
    btnAnswer = document.querySelector("#btn-reanswer") as HTMLButtonElement;

    minusTest.addEventListener("click", minusCounter);
    plusTest.addEventListener("click", plusCounter);
    btnAnswer.addEventListener("click", addAnswer);
  }
}

function addAnswer() {
  const reAnswerCommentBlock = document.querySelector<HTMLDivElement>("#reanswer");
  let inputAnswer: HTMLTextAreaElement;

  if (reAnswerCommentBlock && reAnswerCommentBlock.children.length === 0) {
    inputAnswer = document.createElement("textarea");
    inputAnswer.id = "answerInput";
    inputAnswer.classList.add("text-area");
    inputAnswer.setAttribute("type", "text");
    inputAnswer.name = "answerInput";
    inputAnswer.value = "";
    inputAnswer.placeholder = "Введите текст сообщения...";
    inputAnswer.classList.add("focus");

    reAnswerCommentBlock.appendChild(inputAnswer);
  } else {
    throw new Error();
    }
    
    let reAnswerBlock = document.querySelector<HTMLDivElement>("#block-send-answer");
    let buttonSend: HTMLButtonElement;

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
  inputAnswer = document.querySelector<HTMLTextAreaElement>("#answerInput");

  if (inputAnswer !== null) {
    let textValueAnswer = inputAnswer.value;

    event?.preventDefault();
    let comment2: Comment = {
      img: imgReAnswImgAvatar,
      title: userName.textContent || "",
      comment: textValueAnswer,
      time: Math.floor(Date.now() / 1000),
      counter: counter,
    };

    inputAnswer.value = "";

    comments.push(comment2);

    saveComments();
    showAnswerComments();
    console.log(comments);
  } else {
    throw new Error();
  }
});

}    

    function showAnswerComments(): void {
  const blockAnswerComments = document.getElementById("answer-question-block") as HTMLElement;
  blockAnswerComments.classList.add("reanswer-comments");
  let output = "";
  Object.keys(comments[1]).forEach((item: any) => {
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
                        <image id="image0_3_259" width="100" height="100" />
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
  
    
function minusCounter(): void {
  counter--;
  countNew.textContent = counter.toString();
}

function plusCounter(): void {
  counter++;
  countNew.textContent = counter.toString();
}

function timeConverter(UNIX_timestamp: number): string {
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
  let length = textarea.value;
  let styleAttr = "color:red; display:flex; font-weight: 600;";
  count.setAttribute("style", styleAttr);

  let divElement = document.createElement("div");
  divElement.textContent = "/1000";
  divElement.classList.add("black-text");
  count.appendChild(divElement);

  count.innerHTML = `${length.length}` + divElement.textContent;
});
 
plus_answer.addEventListener("click", () => {
    counter++;
    count_answer.textContent = counter.toString();
});

minus_anwer.addEventListener("click", () => {
    counter--;
    count_answer.textContent = counter.toString();
});

minus.addEventListener("click", () => {
    counter--;
    count_display.textContent = counter.toString();
});

function plusCount() {
    counter++;
    count_display.textContent = counter.toString();
}
plus.addEventListener("click", plusCount);
    
    
}) 

