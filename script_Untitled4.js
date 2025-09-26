//2025/9/26
//(이 문서 만든 시각: 2025/9/26 25:18:01)

document.querySelector("h2").textContent = "Hello World!"; //(25:19:55)

document.querySelector("html").onclick = function () {
    alert("This webpage is clicked by you.");
}; //(25:27:50)
//음.... 왜 작동을 안 하지..? ㅠㅠ 그냥 VS Code 미리보기에서는 alert 함수가 동작을 안 하는 건가..? (실제 웹사이트에서는 제대로 됐으면...) (... 아니면, 설마 위와 같이 'document.querySelector("html").onclick = (익명 함수)' 이렇게 짜는 것만으로는 지속적이고 반복적으로 click을 받을 준비가 되어 있는 상황이 아닌 거라든가...? ...) (25:30:31) 흠.... ㅎㅎ