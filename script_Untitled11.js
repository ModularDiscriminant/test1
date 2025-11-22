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
    HTMLTable += '<table> <tr> <th scope="col">$n$</th> <th scope="col">$\epsilon$</th> </tr> ';

    for(k1 = 0; k1 < 100 /*len1*/; k1++)
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
});

//OutputTable.innerHTML += '<table> <tr> <th scope="col">$n$</th> <th scope="col">$n^2$</th> </tr> <tr> <td>2</td> <td>4</td> </tr> </table> <br><br> ';
//음, 위 코드를 가지고 실험해 봐도... 위와 같이 JavaScript로 입력한 HTML 코드는, $ $ 사이에 수식을 넣어도 LaTeX이 적용되어 읽히지가 않네... ㅠㅠㅠ (11:22:27) 왜지.... 흠....

//OutputTable.innerHTML += "$x^2$";
//이렇게, 더 간단한 코드로 시험해 봐도 마찬가지야... ㅠㅠ (11:23:31) 흠....