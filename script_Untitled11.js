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
    
    OutputTable.innerHTML = len1.toString() + " data found in total <br><br> "; //(11:05:55)
    OutputTable.innerHTML += '<table> <tr> <th scope="col">$n$</th> <th scope="col">$\epsilon$</th> </tr> '; //(11:11:03)

    for(k1 = 0; k1 < len1; k1++)
    {
        OutputTable.innerHTML += "<tr> "; //(11:12:15)

        OutputTable.innerHTML += "<td>"; //(11:13:31)
        OutputTable.innerHTML += dataset[k1][0]; //(11:14:22)
        OutputTable.innerHTML += "</td> "; //(11:13:34)

        OutputTable.innerHTML += "<td>";
        OutputTable.innerHTML += dataset[k1][2]; //(11:14:30)
        OutputTable.innerHTML += "</td> ";
        
        OutputTable.innerHTML += "</tr> "; //(11:12:59)
    }

    OutputTable.innerHTML += "</table> "; //(11:11:06)
});

//OutputTable.innerHTML += '<table> <tr> <th scope="col">$n$</th> <th scope="col">$n^2$</th> </tr> <tr> <td>2</td> <td>4</td> </tr> </table> <br><br> ';
//음, 위 코드를 가지고 실험해 봐도... 위와 같이 JavaScript로 입력한 HTML 코드는, $ $ 사이에 수식을 넣어도 LaTeX이 적용되어 읽히지가 않네... ㅠㅠㅠ (11:22:27) 왜지.... 흠....

//OutputTable.innerHTML += "$x^2$";
//이렇게, 더 간단한 코드로 시험해 봐도 마찬가지야... ㅠㅠ (11:23:31) 흠....