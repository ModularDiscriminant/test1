//2025/10/12
//(이 문서 만든 시각: 2025/10/12 25:38:09)



/*
<JSON 파일 로딩 연습하기>

https://www.freecodecamp.org/news/how-to-read-json-file-in-javascript/
https://developer.mozilla.org/ko/docs/Web/API/Fetch_API/Using_Fetch#%EC%9A%94%EC%B2%AD_%EC%98%B5%EC%85%98_%EC%A0%9C%EA%B3%B5
이 사이트들을 한 번 참조해서 짜 봄... . ㅎㅎ (25:40:25)

참고: 'Promise' 오브젝트와 'then' 메소드에 대해서 알아볼 때는,
https://joshua1988.github.io/web-development/javascript/promise-for-beginners/
이 글을 보고 이해를 잘 할 수 있었음..! ㅎㅎ
(25:41:06) 오오..! ㅎㅎ 흠 ㅎㅎ

그리고 await 연산자에 대해서 이해할 때는
https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/await
을 봄... . ㅎㅎ
-> then 메소드는 결국 Promise 오브젝트를 받아서 다시 Promise 오브젝트를 내놓지만, await 연산자는 Promise 오브젝트를 받아서 실제로 사용 가능한 대상 (JSON 파일을 fetch하고 있는 지금 상황에서는, Response 오브젝트가 나와야 함) 을 내놓으니까, 우리는 await 연산자를 쓰기로 함..! ㅎㅎ (25:43:19) 흠 ㅎㅎ

참고: Response 오브젝트는 아직 자바스크립트에서 사용 가능하도록 JSON 파일을 parsing (일종의 가공) 한 형태가 아니며, Response 오브젝트를 가공하려면 json() 메소드를 호출해야 함. ㅎㅎ (25:44:18) 흠 ㅎㅎ
*/



/*
참고: JSON 파일 다루는 연습을 하기 위해서,

· 내 컴퓨터의
    C:\Users\enigm\Downloads\hyperrogue-win64-free
폴더에서
    hypervr_binding_index.json
파일을 복사해서 가져오고 (파일 이름은
    hypervr_binding_index - from hyperrogue-win64-free.json
로 바꿨음) ,

· 또 내 컴퓨터의
    C:\Users\enigm\AppData\Roaming\.minecraft
폴더에서
    launcher_quick_play.json
파일을 복사해서 가져옴 (파일 이름은
    launcher_quick_play - from .minecraft.json
로 바꿨음) ... ㅋㅋㅋㅋㅋㅋ

(25:48:02) 옹 ㅎㅎ 흠 ㅎㅎ
*/



/*
const data1 = (await fetch("http://example.com/movies.json")).json();
const data2 = (await fetch("hypervr_binding_index - from hyperrogue-win64-free.json")).json();
const data3 = (await fetch("launcher_quick_play - from .minecraft.json")).json();

document.getElementById("Data1Output").innerText = data1;
document.getElementById("Data2Output").innerText = data2;
document.getElementById("Data3Output").innerText = data3;
*/



/*
... 왜인지는 모르겠지만...
const data = await fetch("something");
이런 식으로, 'await' 연산자를 함수 바깥에서, 그냥 JavaScript 프로그램 안에서 '바로' 사용하는 건 허용되지 않는 것 같고...
'await' 연산자를 쓰려면, 반드시 <async function>의 안에서 사용해야만 JavaScript 프로그램이 올바르게 동작하는 듯...?
아......
... 음, 왜 그런 건지는 잘 모르겠지만 (그리고 'async function', 즉 '비동기 함수'가 뭔지도 아직 잘 모르겠지만) ... 일단 그걸 따라야겠군...
(26:39:17) 흠.... ㅎㅎ
*/



async function f1() {
    //const data1 = await (await fetch("http://example.com/movies.json")).json();
    const data2 = await (await fetch("hypervr_binding_index - from hyperrogue-win64-free.json")).json();
    const data3 = await (await fetch("launcher_quick_play - from .minecraft.json")).json();
    const data4 = await (await fetch("data1_Untitled8.json")).json();
    const data5 = await (await fetch("data2_Untitled8.json")).json();

    //document.getElementById("Data1Output").innerText = data1;
    document.getElementById("Data2Output").innerText = data2;
    document.getElementById("Data3Output").innerText = data3;
    document.getElementById("Data4Output").innerText = data4;
    document.getElementById("Data5Output").innerText = data5;

    document.getElementById("Data5Output").innerText += "\n\n" + data5["a"] + "\n" + data5["b"] + "\n" + data5["c"];
    //(27:13:00) 오오..! ㅎㅎ 흠 ㅎㅎ

    document.getElementById("Data2Output").innerText += "\n\n" + data2["bindings"];
    //(27:14:47) 음... array? map? ... 을 그냥 텍스트로 바꾸려고 하면, (내용물들이 다 출력되는 건 지원하지 않고) 그냥 [object Object]라는 텍스트로 바뀌어 들어갈 뿐인 건가..? ... (27:16:04) 흠... ㅎㅎ

    //... 오, 구글에 'javascript object to string' 검색해 보니, 'AI 개요'가 JSON-compatible object들에 대해서는 'JSON.stringify()' 메소드를 쓸 수 있다고 알려주넹~! ㅎㅎ (27:23:10) 오오! ㅎㅎ 흠 ㅎㅎ

    document.getElementById("Data2Output").innerText += "\n\n" + JSON.stringify(data2);
    //오 ㄷㄷㄷㄷㄷㄷ 개쩌넹~~!!! ㅎㅎ (27:24:08) 오오..!! ㅎㅎ 흠 ㅎㅎ
}

f1();

/*
... 아.... 심지어 또
const data1 = (await fetch("http://example.com/movies.json")).json();
는 실행이 안 되네..?
... 단순히 'http://example.com/movies.json'라는 파일이 존재하지 않는 파일..이라서 그런 건가? 아니면 다른 이유인 건가..? ...
(26:44:01) 음.... 흠....
*/

/*
아, 그리고
    const data2 = (await fetch("hypervr_binding_index - from hyperrogue-win64-free.json")).json();
    document.getElementById("Data2Output").innerText = data2;
같이 넣었더니
    [object Promise]
라고 나와서,
    https://developer.mozilla.org/ko/docs/Web/API/Fetch_API/Using_Fetch#%EC%9A%94%EC%B2%AD_%EC%98%B5%EC%85%98_%EC%A0%9C%EA%B3%B5
에서 json() 메소드를 실행한 후에 await을 한 번 더 달아 준 것을 보고 (즉,
    const jsonData = response.json();
이 아니라
    const jsonData = await response.json();
처럼 짠 것을 보고) 나도
    const data2 = await (await fetch("hypervr_binding_index - from hyperrogue-win64-free.json")).json();
    document.getElementById("Data2Output").innerText = data2;
이렇게 바꿔 줌... . ㅎㅎ (26:55:24)
그랬더니 [object Object]로 나옴..! ㅎㅎ (또, 코드의 'const data2' (data2의 정의) 에 마우스를 올렸을 때 뜨는 설명도,
    const data2: Promise<any>
에서
    const data2: any
로 바뀜..! ㅎㅎ)
(26:57:23) 오오..! ㅎㅎ 흠 ㅎㅎ
*/



/*
data1_Untitled8.json 파일: 정말 최소한의 내용을 가지고 있는 JSON 파일을 만들어 봄. ㅎㅎ 안에는
{
}
밖에 없음! ㅎㅎ (아예 완전히 (통째로) 비어 있는 json 파일은 오류를 일으켜서 (JavaScript 전체가 실행이 안 되게 만들어서) , 최소한의 (minimal? minimum? ... ㅎㅎ) JSON 파일을 만들려면 저렇게 해야 했음... . ㅎㅎ) (27:05:29) 흠 ㅎㅎ

data2_Untitled8.json 파일: 실제로 사용 가능한 JSON 파일의 간단한 예시를 만들어 봄. ㅎㅎ (27:05:52) 흠 ㅎㅎ
*/