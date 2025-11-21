//2025/11/19
//(이 프로그램 만든 시각: 2025/11/19 15:54:10)

const NumberInput1 = document.getElementById("NumberInput1");
const NumberInput2 = document.getElementById("NumberInput2");
const NumberInput3 = document.getElementById("NumberInput3");
const  EnterButton = document.getElementById( "EnterButton");
const      Output1 = document.getElementById(     "Output1");

/*
EnterButton.addEventListener("click", function () {
    const num1 = NumberInput1.value;
    const num2 = NumberInput2.value;
    const num3 = NumberInput3.value;

    Output1.innerHTML +=
                  num1.toString()
        + " * " + num2.toString()
        + " + " + num3.toString()
        + " = " + (num1 * num2 + num3).toString()
        + "<br>";
});
//(16:59:25)
*/

/*
?????? 왜 (num1 곱하기 num2) 더하기 num3이 아니라, (num1 곱하기 num2)에 num3을 concatenate한 (즉, 문자열로서 더한) 결과가 나오지???
(17:02:15) 음.... 흠....

... 아, typeof(num1)을 출력해서 확인해 본 결과, num1의 type은 string이라고 나오네요... 음.
... 수 입력란에 적힌 내용이라도, 그냥 NumberInput1.value를 하면 string이 나오는구나... (...) (17:12:02) 흠....
-> 그럼 string끼리 곱하기 (*) 를 하려고 시도했을 땐, string끼리는 곱할 수 없으니까 자동으로 십진 정수로 변환해서 곱셈을 진행했고, 그 다음에 다시 덧셈을 하려고 시도했을 땐 두 번째 인자 (num3) 가 string이니까 (...) 다시 두 값을 string으로 변환해서 덧셈을 해서 (...) 이렇게 된 듯..? ... ㅋㅋㅋㅋㅋㅋ... (17:13:13)
(... 울랭처럼 string concatenation 연산을 '+', ... 말고 다른 연산으로 썼으면 이 정도는 아니었을 듯... ㅠㅠ...)
-> 숫자 입력값을 받았을 때에도, 매번 숫자로 변환을 해서 사용해 줘야 하겠네... ㅋㅋㅋㅋ...
(17:14:00) 오.... ㅎㅎ 흠.... ㅎㅎ
*/

//-> 아래와 같이 새로 코드를 짬... ㅋㅋㅋㅋ (17:17:40) 흠 ㅎㅎ

EnterButton.addEventListener("click", function () {
    const num1 = parseInt(NumberInput1.value);
    const num2 = parseInt(NumberInput2.value);
    const num3 = parseInt(NumberInput3.value);

    Output1.innerHTML +=
                  num1.toString()
        + " * " + num2.toString()
        + " + " + num3.toString()
        + " = " + (num1 * num2 + num3).toString()
        + "<br>";
});
//(17:19:28)
//오케이, 제대로, 정상적으로, ... 동작한다~~ ㅎㅎ (17:20:05) 오오..! ㅎㅎ 흠 ㅎㅎ
//... 이제 빈 input, ... 을 handling하는 것만 잘 처리해 주면 되겠넹... ㅎㅎ (17:20:26) 흠... ㅎㅎ