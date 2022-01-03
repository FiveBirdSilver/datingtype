const Main = document.querySelector('#Main');
const QnA = document.querySelector('#QnA');
const Result = document.querySelector('#Result');
const StartBtn = document.querySelector('.StartBtn');
const pocketballimg = document.querySelector('#pocketballimg');
const openpocketball = document.querySelector('#openpocketball');
const replay = document.querySelector('.replay');

StartBtn.addEventListener('click', Start);
replay.addEventListener('click', function() {
    window.location.reload();
})

const Anumber = 12; // 질문의 총 갯수
const select = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] //사용자의 질문에 대한 선택이 담긴 배열, 초기값 0

function Start() {
    Main.style.display = "none";
    QnA.style.display = "block";
    let QIdx = 0; // QIdx => 질문 갯수, 0에서 부터 시작
    goNext(QIdx);
}

function goNext(QIdx) {
    if (QIdx === Anumber) {
        resultRoading();
        return;
    }
    const Qbox = document.querySelector('.Qbox');
    Qbox.innerHTML = qnaList[QIdx].q;

    for (let i in qnaList[QIdx].a) {
        GoAnswer(qnaList[QIdx].a[i].answer, QIdx, i)
    }
    const status = document.querySelector('.statusBar');
    status.style.width = (100 / Anumber) * (QIdx + 1) + "%";

    const count = document.querySelector('.count');
    count.innerHTML = (QIdx + 1) + ' / ' + Anumber;
}

function GoAnswer(text, QIdx, Idx) {
    const Abox = document.querySelector('.Abox');
    const AnswerBtn = document.createElement('button');
    AnswerBtn.classList.add('AnswerBtnvalue') // 질문의 내용을 밑에서 모두 가져오기 위해 classlist로 추가

    Abox.appendChild(AnswerBtn);
    AnswerBtn.innerHTML = text;

    AnswerBtn.addEventListener('click', function () {
        const AnswerBtnvalue = document.querySelectorAll('.AnswerBtnvalue');
        for (let i = 0; i < AnswerBtnvalue.length; i++) {
            AnswerBtnvalue[i].disabled = true; // 버튼 비활성화
            AnswerBtnvalue[i].style.display = "none";
        }
        const target = qnaList[QIdx].a[Idx].type;
        for (let i = 0; i < target.length; i++) {
            select[target[i]] += 1;
        }
        goNext(++QIdx);
    })
}
function goResult() {
    QnA.style.display = "none";
    setTimeout(() => {
        Result.style.display = "block";
    }, 300);
    setResult();
}

function setResult() {
    let point = calResult();
    console.log(point);
    const resultname = document.querySelector('.resultname');
    const resultImg = document.querySelector('.resultImg');
    const ImgDiv = document.createElement('img');
    const resultDesc = document.querySelector('.resultDesc');

    resultname.innerHTML = infoList[point].name;
    const imgURL = 'img/' + point + '.png';
    ImgDiv.src = imgURL;
    resultImg.appendChild(ImgDiv);
    resultDesc.innerHTML = infoList[point].desc;

}

function calResult() {
    let result = select.indexOf(Math.max(...select)); // select 배열의 쵀댓값을 결과로 도출
    return result;
}
function resultRoading() {
    QnA.style.display = "none";
    pocketballimg.style.display = "block";

    pocketballimg.addEventListener('click', function () {
        pocketballimg.style.display = "none";
        goResult();
    })
}