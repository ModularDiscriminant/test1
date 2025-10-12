//2025/10/12
//(이 문서 만든 시각: 2025/10/12 15:02:40)

/*
https://hianna.tistory.com/480
https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input
이런 내용들을 따라해 보는 중임. ㅎㅎ (심지어
https://developer.mozilla.org/en-US/play?uuid=922163d6-441e-4470-89a3-3fca6faf177c&state=q1bKKMnNUbJSssnMKygtUSipLEi1jVFKKi0pyc%2BLUVLIS8xF4Zcl5pSCBJxgAvp2SjpKycXFSlZKSjpKWVC6JCM1N1XJSiknMz2jRKkWAA%3D%3D&srcPrefix=%2Fen-US%2Fdocs%2FWeb%2FHTML%2FReference%2FElements%2Finput%2F
에는 플레이어블 데모도 있음~! ㅎㅎ (15:08:07) 오오..! ㅎㅎ 흠 ㅎㅎ)
(15:08:02) 흠 ㅎㅎ
*/



function ButtonClicked1()
{
    document.getElementById("output").innerHTML += "A new line is added. <br> ";
    //"새 줄이 추가되었다." (19:39:12)
}

function ButtonClicked2()
{
    document.getElementById("output").innerHTML += "A new line is again added. <br> ";
    //"새 줄이 다시금 추가되었다." (19:39:12)
}

//(15:53:29) 옹 ㅎㅎ 흠 ㅎㅎ

function ButtonClicked3()
{
    const input1 = document.getElementById("TextInput1");
    const output1 = document.getElementById("output");

    //output1.innerHTML += input1.value + " <br> ";
    //(19:41:50) 흠 ㅎㅎ

    //... 오, 근데 이렇게 했다간 집어넣는 아무 html 코드나 다 실행시킬 수 있는 건가... ㄷㄷㄷㄷㄷㄷㄷㄷ
    //... 이거 상당한 보안 취약점이 될 것 같기도...... (19:43:42)
    //... 음, 이거 public website이기도 하니까, 너무 위험하므로... 그냥 innerHTML 대신 innerText로 바꾸자... ㅋㅋㅋㅎ... (19:44:29) 흠.... ㅎㅎ

    output1.innerText += input1.value + "\n";
    //오 ㄷㄷㄷㄷㄷㄷㄷㄷ 개행 문자가 먹히네?! ㅎㅎ (19:45:50) 오오..!! ㅎㅎ 흠 ㅎㅎ
}

function ButtonClicked4()
{
    const output1 = document.getElementById("output");

    output1.innerText = "";
    //(19:55:05)

    //오, ButtonClicked1(), ButtonClicked2()에서는 'innerText'가 아니라 'innerHTML' 변수를 편집해서 내용을 집어넣은 건데도, output1.innerText = "";를 하니까 모든 내용들이 다 없어지넹... ㄷㄷㄷㄷ (정확히 왜 그런 거지..? ...) (19:56:20) 흠.... ㅎㅎ
}