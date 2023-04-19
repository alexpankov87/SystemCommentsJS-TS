window.addEventListener("DOMContentLoader", function (e) {
    var txHeight = 61;
    var tx = document.getElementsByTagName("textarea");
    for (var i = 0; i < tx.length; i++) {
        if (tx[i].value == "") {
            tx[i].setAttribute("style", "height:" + txHeight + "px; overflow-y:hidden;");
        }
        else {
            tx[i].setAttribute("style", "height:" + tx[i].scrollHeight + "px;overflow-y:hidden;");
        }
        tx[i].addEventListener("input", OnInput, false);
    }
    function OnInput(event) {
        var target = event.target;
        target.style.height = "auto";
        target.style.height = target.scrollHeight + "px";
    }
    var textarea = document.getElementById("text_area");
    var count = document.getElementById("count_display");
    var btn = document.querySelector(".btn-submit");
    var comment_add = document.getElementById("comment-add");
    var userName = document.getElementById("user-name");
    var userImage = document.querySelector(".img-wrapper");
    var imageObject = document.querySelector(".img-avatar-answer");
    var imageSrc = userImage.getElementsByTagName("img")[0].src;
    var count_display = document.querySelector("#count_average");
    var count_answer = document.querySelector("#count_answer");
    var plus = document.getElementById("plus");
    var minus = document.getElementById("minus");
    var minus_anwer = document.getElementById("minus_anwer");
    var plus_answer = document.getElementById("plus_answer");
    var reanswerImg = document.querySelector(".reanswer-img");
    var imgReAnswImgAvatar = reanswerImg.getAttribute("src");
    var buttonSend;
    var countNew;
    var btnAnswer;
    var plusTest;
    var minusTest;
    var reAnwerCommentBlock;
    var counter = 0;
    var reAnswerBlock;
    var blockAnswerComments;
    var comments = [];
    loadComments();
    var length = textarea.value.length;
    var max = 1000;
    comment_add.addEventListener("click", function () {
        var correctly = textarea.value.length > max;
        correctly || event.preventDefault();
        imageObject.setAttribute("data", imageSrc);
        var comments = [];
        var comment = {
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
        }
        else {
            comment_add.disabled = false;
            if (textarea.value.length != 0) {
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
        var newComment = document.getElementById("new_comments");
        newComment.classList.add("answer-comments-wrapper");
        var out = "";
        comments.forEach(function (item) {
            out += "<div class=\"img-wrapper-answer\">\n                        <img class=\"img-avatar\" src=".concat(item.img, "></img>\n                </div>\n                <div class=\"answer-comments\">\n                        <div class=\"row-name-and-date\">\n                            <label>").concat(item.title, "</label>\n                        <span class=\"date-time\">").concat(timeConverter(item.time), "\n                            </span>\n                        </div>\n                        <span  class=\"text-message\">").concat(item.comment, "</span>\n                        <div class=\"favorite-answer-block\">\n                                <div class=\"answer\">\n                                    <button id=\"btn-reanswer\">\n                                        <img src=\"css/img/Mask group.svg\" alt=\"answer\">\n                                        <span>\n                                            \u041E\u0442\u0432\u0435\u0442\u0438\u0442\u044C\n                                        </span>\n                                    </button>\n                                </div>\n                                <div class=\"favourites\">\n                                    <span> &#10084; \u0412 \u0438\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u043C </span>\n                                </div>\n                                <div class=\"plus-minus-comments\">\n                                    <button id=\"minus-test\" class=\"minus\">\n                                        <span> &#8722; </span>\n                                    </button>\n                                    <span id=\"count_new\" class=\"count\">\n                                      ").concat(item.counter, "\n                                    </span>\n                                    <button id=\"plus-test\" class=\"plus\">\n                                        <span> &#43; </span>\n                                    </button>\n                                </div>\n                        </div>\n                        <div class=\"reanswer\" id=\"reanswer\">\n                            \n                        </div>\n                        <div id=\"block-send-answer\"></div>\n                </div>\n                ");
        });
        newComment.innerHTML = out;
        if (newComment.innerHTML === out) {
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
        var reAnswerCommentBlock = document.querySelector("#reanswer");
        var inputAnswer;
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
        }
        else {
            throw new Error();
        }
        var reAnswerBlock = document.querySelector("#block-send-answer");
        var buttonSend;
        if (reAnswerBlock !== null && reAnswerBlock.children.length === 0) {
            buttonSend = document.createElement("button");
            buttonSend.id = "btn-send-message";
            buttonSend.type = "submit";
            buttonSend.textContent = "Отправить";
            buttonSend.classList.add("btn-answer-question");
            reAnswerBlock.appendChild(buttonSend);
        }
        else {
            throw new Error();
        }
        buttonSend.addEventListener("click", function () {
            inputAnswer = document.querySelector("#answerInput");
            if (inputAnswer !== null) {
                var textValueAnswer = inputAnswer.value;
                event === null || event === void 0 ? void 0 : event.preventDefault();
                var comment2 = {
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
            }
            else {
                throw new Error();
            }
        });
    }
    function showAnswerComments() {
        var blockAnswerComments = document.getElementById("answer-question-block");
        blockAnswerComments.classList.add("reanswer-comments");
        var output = "";
        Object.keys(comments[1]).forEach(function (item) {
            output += "<div class=\"reanswer-img-wrapper\">\n                  <img src=\"".concat(item.img, "\" alt=\"avatar\">\n                </div>\n                <div class=\"reanswer-text-block\">\n                  <div class=\"title-comments\">\n                    <label for=\"user-name\">\u0414\u0436\u0443\u043D\u0431\u043E\u043A\u04413000</label>\n                    <svg id=\"user-svg\" width=\"22\" height=\"22\" viewBox=\"0 0 22 22\" fill=\"none\"\n                        xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n                      <g opacity=\"0.4\">\n                        <mask id=\"mask0_3_259\" style=\"mask-type:alpha\" maskUnits=\"userSpaceOnUse\" x=\"0\"\n                            y=\"0\" width=\"22\" height=\"22\">\n                          <rect width=\"22\" height=\"22\" fill=\"url(#pattern0)\" />\n                        </mask>\n                        <g mask=\"url(#mask0_3_259)\">\n                          <rect x=\"-2\" y=\"-1\" width=\"26\" height=\"25\" fill=\"black\" />\n                        </g>\n                      </g>\n                      <defs>\n                        <pattern id=\"pattern0\" patternContentUnits=\"objectBoundingBox\" width=\"1\"\n                            height=\"1\">\n                          <use xlink:href=\"#image0_3_259\" transform=\"scale(0.01)\" />\n                        </pattern>\n                        <image id=\"image0_3_259\" width=\"100\" height=\"100\" />\n                      </defs>\n                    </svg>\n                    <div class=\"user-answer\">\n                      <span>\u041C\u0430\u043A\u0441\u0438\u043C \u0410\u0432\u0434\u0435\u0435\u043D\u043A\u043E</span>\n                    </div>\n                    <div class=\"time-date-comments\">\n                      <span>\n                        ").concat(timeConverter(item.time), "\n                      </span>\n                    </div>\n                  </div>\n                  <div class=\"answer-user-comments\">\n                    <span>\n                      ").concat(item.comment, "\n                    </span>\n                  </div>\n                  <div class=\"favorite-answer-block\">\n                    <div class=\"favourites-heart\">\n                      <button>\n                        <span> \u0412 \u0438\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u043C </span>\n                      </button>\n                    </div>\n                    <div class=\"plus-minus-comments\">\n                      <button id=\"minus_anwer\" class=\"minus\">\n                        <span> &#8722; </span>\n                      </button>\n                      <span id=\"count_answer\" class=\"count\">\n                        ").concat(item.counter, "\n                      </span>\n                      <button id=\"plus_answer\" class=\"plus\">\n                        <span> &#43; </span>\n                      </button>\n                    </div>\n                  </div>\n                </div>");
        });
        blockAnswerComments.innerHTML = output;
        console.log(blockAnswerComments);
    }
    function minusCounter() {
        counter--;
        countNew.textContent = counter.toString();
    }
    function plusCounter() {
        counter++;
        countNew.textContent = counter.toString();
    }
    function timeConverter(UNIX_timestamp) {
        var a = new Date(UNIX_timestamp * 1000);
        var months = [
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
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
        return time;
    }
    textarea.addEventListener("input", function () {
        var length = textarea.value;
        var styleAttr = "color:red; display:flex; font-weight: 600;";
        count.setAttribute("style", styleAttr);
        var divElement = document.createElement("div");
        divElement.textContent = "/1000";
        divElement.classList.add("black-text");
        count.appendChild(divElement);
        count.innerHTML = "".concat(length.length) + divElement.textContent;
    });
    plus_answer.addEventListener("click", function () {
        counter++;
        count_answer.textContent = counter.toString();
    });
    minus_anwer.addEventListener("click", function () {
        counter--;
        count_answer.textContent = counter.toString();
    });
    minus.addEventListener("click", function () {
        counter--;
        count_display.textContent = counter.toString();
    });
    function plusCount() {
        counter++;
        count_display.textContent = counter.toString();
    }
    plus.addEventListener("click", plusCount);
});
