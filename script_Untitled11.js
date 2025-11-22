//2025/11/22
//(이 프로그램 만든 시각: 2025/11/22 10:29:03)



const SizeNLowerBoundInput = document.getElementById("size n (lower bound) input");
const SizeNUpperBoundInput = document.getElementById("size n (upper bound) input");

const SearchButton = document.getElementById("SearchButton");
const OutputTable = document.getElementById("OutputTable");
//(10:42:47)



SearchButton.addEventListener("click", async function () { //(10:46:51)
    OutputTable.innerHTML = "Loading..."; //(10:50:02) (오오, 이걸 'await' 연산을 수행하는 부분보다 앞에 놓으니까, 정말로 로딩 중임을 표시하는 효과가 되는구나..! ㅎㅎ (10:50:34) 오오..! ㅎㅎ 흠 ㅎㅎ)

    const dataset = await (await fetch("BrowsableStretchFactorDatasetV1.1Size2To13.json")).json();



    const len1 = dataset.length;
    let k1;

    let HTMLTable;
    
    HTMLTable = len1.toString() + " data found in total <br><br> ";
    HTMLTable += '<table> <tr> <th scope="col">$n$</th> <th scope="col">$\\epsilon$</th> </tr> ';
    //문자열 안에서 그냥 '$\epsilon$'이라고 쓰면 '\'가 다음에 나온 문자인 'e'랑 붙어서 특별한 문자? 이스케이프 시퀀스? ... 인 '\e'로 인식되는..? 것 같아서 (그래서 출력은 그냥 '\'가 사라진 것처럼, $epsilon$을 출력한 결과와 동일한 결과가 나옴) , 문자열 안의 '\'를 제대로 기술하기 위해 이스케이프 시퀀스 '\\'를 사용해 줘야 올바르게 출력이 되는 것 같음... . ㅎㅎ (18:09:45)
    //즉, 조금 번거롭긴 해도, 매번 '$\epsilon$' 같이 쓰지 않고 '$\\epsilon$' 같이 써 줘야 올바르게 결과가 나오게 되는 듯..? ... ㅎㅎ (18:10:13) 옹... ㅎㅎ 흠... ㅎㅎ

    for(k1 = 0; k1 < len1; k1++)
    {
        HTMLTable += "<tr> ";

        HTMLTable += "<td>";
        HTMLTable += dataset[k1][0];
        HTMLTable += "</td> ";

        HTMLTable += "<td>";
        HTMLTable += dataset[k1][2];
        HTMLTable += "</td> ";
        
        HTMLTable += "</tr> ";
    }

    HTMLTable += "</table>";

    OutputTable.innerHTML = HTMLTable; //(17:21:23)
    //오케이, 이런 식으로 따로 문자열 변수 (HTMLTable) 를 만들어서 거기다 HTML 코드를 전부 집어넣고, 그걸 ('<table> ... </table>'이라는 format이 완성된 채로) 한 번에 OutputTable.innerHTML에 집어넣어서 innerHTML을 업데이트해야 문제없이 제대로 표가 출력되는구나~! ㅎㅎ (17:24:49) 오오..! ㅎㅎ 흠 ㅎㅎ

    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "OutputTable"]); //(18:06:46)
    /*
    https://chatgpt.com/c/6921343b-5d3c-8321-8418-996514172097
    오오, innerHTML을 편집할 때 추가한 $...$ 형태의 수식은 LaTeX이 적용되지 않는 현상이 있었어서, 이걸 해결할 방법을 ChatGPT (ModularDiscriminant 계정) 에 질문해 보니...
    HTML 페이지가 동적으로 변경되면 변경 후에 MathJax를 다시 호출해서 수식을 렌더링해 줘야 한다면서, MathJax를 다시 호출하기 위해서
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, (수식을 추가한 요소의 id를 문자열로 입력)]);
    이런 코드를 쓰라고 알려줌..! ㅎㅎ
    -> 이걸 사용하니, 실제로 잘 먹히는 것 같넹~~~ ㅎㅎ
    (18:06:02)
    오오..!!! ㅎㅎ 흠 ㅎㅎ
    */
});