//2025/11/22



const SizeNLowerBoundInput = document.getElementById("size n (lower bound) input");
const SizeNUpperBoundInput = document.getElementById("size n (upper bound) input");

const SearchButton = document.getElementById("SearchButton");
const OutputTable = document.getElementById("OutputTable");
//(10:42:47)



SearchButton.addEventListener("click", async function () { //(10:46:51)
    const SizeNLowerBound = parseInt(SizeNLowerBoundInput.value); //input이 비어 있었는지 아닌지, 즉 SizeNLowerBoundInput.value === ""였는지 아닌지는, SizeNLowerBound가 NaN인지 아닌지로 판별할 수 있음. 즉 이렇게 입력값 검사 없이 바로 타입 변환을 해도, 아직 입력값이 valid한지 아닌지에 대한 정보도 사라지지 않고 남아 있어서 (NaN을 적절히 판별해 주기만 한다면) 괜찮을 것 같음... . ㅎㅎ (21:37:52) 흠 ㅎㅎ
    const SizeNUpperBound = parseInt(SizeNUpperBoundInput.value);
    
    OutputTable.innerHTML = "Loading..."; //(10:50:02) (오오, 이걸 'await' 연산을 수행하는 부분보다 앞에 놓으니까, 정말로 로딩 중임을 표시하는 효과가 되는구나..! ㅎㅎ (10:50:34) 오오..! ㅎㅎ 흠 ㅎㅎ)

    const dataset = await (await fetch("BrowsableStretchFactorDatasetV1.1Size2To13.json")).json();



    const len1 = dataset.length;
    let count = 0; //(21:58:34)
    let k1;

    let HTMLTable;
    
    HTMLTable = '<table> <tr> '
        + '<th scope="col">size $n$</th> '
        + '<th scope="col">browsable matrix $M$</th> '
        + '<th scope="col">$\\epsilon$</th> '
        + '<th scope="col">permutation $\\phi$</th> '
        + '<th scope="col">characteristic polynomial $\\chi_M(x)$</th> '
        + '<th scope="col">factorization of characteristic polynomial $\\chi_M(x)$</th> '
        + '<th scope="col">browsable stretch factor (leading eigenvalue) $\\lambda$</th> '
        + '<th scope="col">numerical value of $\\lambda$</th> '
        + '<th scope="col">minimal polynomial of $\\lambda$</th> '
        + '<th scope="col">degree $d$ of $\\lambda$</th> '
        + '<th scope="col">cycles of $\\phi$ without critical points</th> '
        + '<th scope="col">minimality of $M$</th> '
        + '<th scope="col">minimalized size $n\'$</th> '
        + '<th scope="col">minimalized browsable matrix $M\'$</th> '
        + '<th scope="col">minimalized permutation $\\phi\'$</th> '
        + '<th scope="col">genus $g$</th> '
        + '<th scope="col">coronality of $\\lambda$</th> '
        + '<th scope="col">determinant $\\det(M)$</th> '
        + '</tr> '; //(22:40:43)
    //문자열 안에서 그냥 '$\epsilon$'이라고 쓰면 '\'가 다음에 나온 문자인 'e'랑 붙어서 특별한 문자? 이스케이프 시퀀스? ... 인 '\e'로 인식되는..? 것 같아서 (그래서 출력은 그냥 '\'가 사라진 것처럼, $epsilon$을 출력한 결과와 동일한 결과가 나옴) , 문자열 안의 '\'를 제대로 기술하기 위해 이스케이프 시퀀스 '\\'를 사용해 줘야 올바르게 출력이 되는 것 같음... . ㅎㅎ (18:09:45)
    //즉, 조금 번거롭긴 해도, 매번 '$\epsilon$' 같이 쓰지 않고 '$\\epsilon$' 같이 써 줘야 올바르게 결과가 나오게 되는 듯..? ... ㅎㅎ (18:10:13) 옹... ㅎㅎ 흠... ㅎㅎ

    for(k1 = 0; k1 < len1; k1++)
    {
        if(!Number.isNaN(SizeNLowerBound)) //만약 SizeNLowerBound가 NaN이 아니라면, 즉 사용자가 정말 input으로 뭔가 입력했다면 (= 검사해야 할 조건이 존재한다면) (21:44:05)
        {
            if(!(SizeNLowerBound <= dataset[k1][0])) //근데 dataset[k1][0], 즉 데이터 dataset[k1]의 0번째 항목인 n이 SizeNLowerBound의 이상인 상황 (조건에 부합하는 상황) 이 아니라면, continue;를 해서 반복문을 다음 턴으로 넘김 (21:45:20)
            //이와 같이 코드를 짜면, 수십 개의 조건들을 체크하기 위해 if 문을 수십 개 중첩해야 하는 awkward한 상황을 피할 수 있음 (21:46:03)
            {
                continue;
            }
        }
        /*
        ... 사실, 그냥
        if(SizeNLowerBound > dataset[k1][0])
        {
            continue;
        }
        이렇게 짜면, SizeNLowerBound가 NaN인 경우엔 위 조건문의 결과가 항상 false가 되므로 조건문 하나로 처리가 끝나긴 함. ㅎㅎ (21:50:27)
        근데, 이렇게 짰을 경우...
            · 매번 검사해야 하는 조건을 수동으로 부정해서 넣어 줘야 하기도 하고 (조건문을 '!(SizeNLowerBound <= dataset[k1][0])'과 같이 적었다간, NaN은 모든 조건문을 false로 만드므로 이 조건문의 결과는 !false = true가 나와 버려서 예상한 결과와 어긋날 수 있음...) ,
            · 애초에 입력값 SizeNLowerBound가 NaN일 수 있는 시점에서... 집어넣은 조건문이 예상과 다르게 동작하면서 오류를 일으킬 가능성이 다분하고 농후하므로, (21:53:59)
        저렇게 짜는 건 (코드 가독성 및 해석, 코드 유지 보수, ... 등의 측면에서) 상당히 위험할 것 같음... . ㅎㅎ
        그래서, 그냥 조건문을 두 번 중첩해서, 매우 명시적으로 SizeNLowerBound이 NaN일 가능성을 제외하고, 그 이후에야 조건문을 (편하고 안전하게) 사용해서 원하는 조건이 충족되는지를 체크하도록 했음... . ㅎㅎ (21:55:22) 흠... ㅎㅎ
        */
        
        if(!Number.isNaN(SizeNUpperBound))
        {
            if(!(dataset[k1][0] <= SizeNUpperBound)) //난 부등식의 방향이 실제 수직선 상의 방향과 일치할 때 더 직관적이라고 보기 때문에, >= 연산자 (≥) 보다는 <= 연산자 (≤) 를 쓰는 걸 좀 더 선호함... . ㅎㅎ (21:57:32) 흠... ㅎㅎ
            {
                continue;
            }
        }

        HTMLTable += "<tr> ";

        HTMLTable += "<td>";
        HTMLTable += dataset[k1][0];
        HTMLTable += "</td> ";

        HTMLTable += "<td>";
        HTMLTable += dataset[k1][1];
        HTMLTable += "</td> ";

        HTMLTable += "<td>";
        HTMLTable += dataset[k1][2];
        HTMLTable += "</td> ";

        HTMLTable += "<td>";
        HTMLTable += dataset[k1][3];
        HTMLTable += "</td> ";

        HTMLTable += "<td>";
        HTMLTable += dataset[k1][4];
        HTMLTable += "</td> ";

        HTMLTable += "<td>";
        HTMLTable += dataset[k1][5];
        HTMLTable += "</td> ";

        HTMLTable += "<td>";
        HTMLTable += dataset[k1][6];
        HTMLTable += "</td> ";

        HTMLTable += "<td>";
        HTMLTable += dataset[k1][7];
        HTMLTable += "</td> ";

        HTMLTable += "<td>";
        HTMLTable += dataset[k1][8];
        HTMLTable += "</td> ";

        HTMLTable += "<td>";
        HTMLTable += dataset[k1][9];
        HTMLTable += "</td> ";

        HTMLTable += "<td>";
        HTMLTable += dataset[k1][10];
        HTMLTable += "</td> ";

        HTMLTable += "<td>";
        HTMLTable += dataset[k1][11];
        HTMLTable += "</td> ";

        HTMLTable += "<td>";
        HTMLTable += dataset[k1][12];
        HTMLTable += "</td> ";

        HTMLTable += "<td>";
        HTMLTable += dataset[k1][13];
        HTMLTable += "</td> ";

        HTMLTable += "<td>";
        HTMLTable += dataset[k1][14];
        HTMLTable += "</td> ";

        HTMLTable += "<td>";
        HTMLTable += dataset[k1][15];
        HTMLTable += "</td> ";

        HTMLTable += "<td>";
        HTMLTable += dataset[k1][16];
        HTMLTable += "</td> ";

        HTMLTable += "<td>";
        HTMLTable += dataset[k1][17];
        HTMLTable += "</td> ";
        
        HTMLTable += "</tr> ";

        count++;
    }

    HTMLTable += "</table>";

    OutputTable.innerHTML = count.toString() + " data found in total <br><br> " + HTMLTable; //(22:01:30)
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