//2025/11/22



const nLowerBoundInput = document.getElementById("n (lower bound) input");
const nUpperBoundInput = document.getElementById("n (upper bound) input");

const lambdaLowerBoundInput = document.getElementById("lambda (lower bound) input");
const lambdaUpperBoundInput = document.getElementById("lambda (upper bound) input"); //(28:57:41)

const SearchButton = document.getElementById("SearchButton");
const OutputTable = document.getElementById("OutputTable");
//(10:42:47)



SearchButton.addEventListener("click", async function () { //(10:46:51)
    const nLowerBound = parseInt(nLowerBoundInput.value); //input이 비어 있었는지 아닌지, 즉 nLowerBoundInput.value === ""였는지 아닌지는, nLowerBound가 NaN인지 아닌지로 판별할 수 있음. 즉 이렇게 입력값 검사 없이 바로 타입 변환을 해도, 아직 입력값이 valid한지 아닌지에 대한 정보도 사라지지 않고 남아 있어서 (NaN을 적절히 판별해 주기만 한다면) 괜찮을 것 같음... . ㅎㅎ (21:37:52) 흠 ㅎㅎ
    const nUpperBound = parseInt(nUpperBoundInput.value);

    const lambdaLowerBound = parseFloat(lambdaLowerBoundInput.value);
    const lambdaUpperBound = parseFloat(lambdaUpperBoundInput.value);
    //(... 아니면 parseInt, parseFloat, ... 함수 대신에 Number 함수, ... 를 써도 된..다..? ... ㅋㅋㅋㅋ (29:00:44) 흠... ㅎㅎ)
    
    OutputTable.innerHTML = "Loading..."; //(10:50:02) (오오, 이걸 'await' 연산을 수행하는 부분보다 앞에 놓으니까, 정말로 로딩 중임을 표시하는 효과가 되는구나..! ㅎㅎ (10:50:34) 오오..! ㅎㅎ 흠 ㅎㅎ)

    const dataset = await (await fetch("BrowsableStretchFactorDatasetV1.1Size2To13.json")).json();



    //전체 반복문에 관련된 변수들 (반복문 전체에 얽혀 있는 'global한' 변수들) (25:45:34)
    const len1 = dataset.length;
    let count = 0; //(21:58:34)
    let k1;

    //반복문의 각 턴 안에서만 관련이 있고, 사용이 되는 변수들 (반복문의 한 턴 안에서만 얽힌 'local한' 변수들) (25:46:05)
    let n, matrix, phi, CyclesWOCrit, Cycle1WOCrit, nPrime, MatrixPrime, phiPrime; //(중복 계산 방지용 변수들 (25:46:27))
    let len2, len3, k2, k3; //(len2, len3 역시 중복 계산 방지용 변수임 (25:46:51))

    let HTMLTable;
    
    HTMLTable = '<table> <tr> '
        + '<th scope="col">size $n$</th> '
        + '<th scope="col">browsable matrix $M$</th> '
        + '<th scope="col">$\\epsilon$</th> '
        + '<th scope="col">permutation $\\phi$</th> '
        + '<th scope="col">characteristic polynomial $\\chi_M(x)$</th> '
        + '<th scope="col">factorization of characteristic polynomial $\\chi_M(x)$</th> '
        + '<th scope="col">closed form of browsable stretch factor (leading eigenvalue) $\\lambda$</th> ' //(28:31:39)
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
        if(!Number.isNaN(nLowerBound)) //만약 nLowerBound가 NaN이 아니라면, 즉 사용자가 정말 input으로 뭔가 입력했다면 (= 검사해야 할 조건이 존재한다면) (21:44:05)
        {
            if(!(nLowerBound <= dataset[k1][0])) //근데 dataset[k1][0], 즉 데이터 dataset[k1]의 0번째 항목인 n이 nLowerBound의 이상인 상황 (조건에 부합하는 상황) 이 아니라면, continue;를 해서 반복문을 다음 턴으로 넘김 (21:45:20)
            //이와 같이 코드를 짜면, 수십 개의 조건들을 체크하기 위해 if 문을 수십 개 중첩해야 하는 awkward한 상황을 피할 수 있음 (21:46:03)
            {
                continue;
            }
        }
        /*
        ... 사실, 그냥
        if(nLowerBound > dataset[k1][0])
        {
            continue;
        }
        이렇게 짜면, nLowerBound가 NaN인 경우엔 위 조건문의 결과가 항상 false가 되므로 조건문 하나로 처리가 끝나긴 함. ㅎㅎ (21:50:27)
        근데, 이렇게 짰을 경우...
            · 매번 검사해야 하는 조건을 수동으로 부정해서 넣어 줘야 하기도 하고 (조건문을 '!(nLowerBound <= dataset[k1][0])'과 같이 적었다간, NaN은 모든 조건문을 false로 만드므로 이 조건문의 결과는 !false = true가 나와 버려서 예상한 결과와 어긋날 수 있음...) ,
            · 애초에 입력값 nLowerBound가 NaN일 수 있는 시점에서... 집어넣은 조건문이 예상과 다르게 동작하면서 오류를 일으킬 가능성이 다분하고 농후하므로, (21:53:59)
        저렇게 짜는 건 (코드 가독성 및 해석, 코드 유지 보수, ... 등의 측면에서) 상당히 위험할 것 같음... . ㅎㅎ
        그래서, 그냥 조건문을 두 번 중첩해서, 매우 명시적으로 nLowerBound이 NaN일 가능성을 제외하고, 그 이후에야 조건문을 (편하고 안전하게) 사용해서 원하는 조건이 충족되는지를 체크하도록 했음... . ㅎㅎ (21:55:22) 흠... ㅎㅎ
        */
        
        if(!Number.isNaN(nUpperBound))
        {
            if(!(dataset[k1][0] <= nUpperBound)) //난 부등식의 방향이 실제 수직선 상의 방향과 일치할 때 더 직관적이라고 보기 때문에, >= 연산자 (≥) 보다는 <= 연산자 (≤) 를 쓰는 걸 좀 더 선호함... . ㅎㅎ (21:57:32) 흠... ㅎㅎ
            {
                continue;
            }
        }

        if(!Number.isNaN(lambdaLowerBound))
        {
            if(!(lambdaLowerBound <= dataset[k1][7]))
            {
                continue;
            }
        }

        if(!Number.isNaN(lambdaUpperBound))
        {
            if(!(dataset[k1][7] <= lambdaUpperBound))
            {
                continue;
            }
        }
        //(29:03:18)

        HTMLTable += "<tr> ";

            n = dataset[k1][0];
            HTMLTable += "<td>";
                HTMLTable += n.toString(); //(24:19:35)
            HTMLTable += "</td> ";

            matrix = dataset[k1][1];
            HTMLTable += "<td>";
                HTMLTable += "$\\begin{pmatrix} ";
                    HTMLTable += matrix[0][0].toString();
                    for(k3 = 1; k3 < n; k3++)
                    {
                        HTMLTable += " & ";
                        HTMLTable += matrix[0][k3].toString();
                    }
                    for(k2 = 1; k2 < n; k2++)
                    {
                        HTMLTable += " \\\\ ";
                        HTMLTable += matrix[k2][0].toString();
                        for(k3 = 1; k3 < n; k3++)
                        {
                            HTMLTable += " & ";
                            HTMLTable += matrix[k2][k3].toString(); //(CyclesWOCrit 리스트의 경우에 그 각 항목 (리스트) 을 따로 Cycle1WOCrit이라는 변수에 저장해서, 두 번째 반복문 (k3의 반복문) 안에서는 Cycle1WOCrit[k3]과 같이 간편하게 항목을 참조하듯이... 이 경우에도 matrix[k2] (리스트) (matrix의 한 row) 를 따로 하나의 변수에 저장해서, 중복 계산을 방지하는 게 조금 더 좋으..려나..? ... (... 이게 실제로 계산량, 계산 시간, ... 을 줄여 주려..나? ...) (26:07:15) 오.... ㅎㅎ 흠... ㅎㅎ)
                        }
                    } //(24:24:30)
                    //('&'와 '\\'가 redundant하지 않고 정확한 개수만큼 들어가게 하고 싶은데, if 문을 써서 굳이 계산량을 늘리고 싶지는 않고, 그러면서 'n - 1'이라는 값을 계속해서 중복 계산하고 싶지도 않아서 (...) , 이렇게 각 반복문에서 가장 첫 번째 턴을 분리해 내는 방식으로 코드를 짤 수밖에 없었음 (이게 최선의 코드였음) ... . ㅎㅎ (24:25:56) 흠... ㅎㅎ)
                HTMLTable += " \\end{pmatrix}$";
            HTMLTable += "</td> ";

            HTMLTable += "<td>";
                HTMLTable += dataset[k1][2].toString(); //(24:19:43)
            HTMLTable += "</td> ";

            phi = dataset[k1][3];
            HTMLTable += "<td>";
                HTMLTable += "$\\begin{pmatrix} ";
                    //HTMLTable += (0).toString();
                    HTMLTable += "0"; //(25:30:39)
                    for(k3 = 1; k3 <= n; k3++)
                    {
                        HTMLTable += " & ";
                        HTMLTable += k3.toString();
                    }
                    HTMLTable += " \\\\ ";
                    HTMLTable += phi[0].toString();
                    for(k3 = 1; k3 <= n; k3++) //위에서 browsable matrix를 출력하는 코드를 작성할 때와 analogous하게 프로그래밍하기 위해, 몇 번째 column인지를 결정하는 dummy variable로 (k2가 아니라) k3를 사용함. ㅎㅎ (25:31:53) 흠 ㅎㅎ
                    {
                        HTMLTable += " & ";
                        HTMLTable += phi[k3].toString();
                    }
                HTMLTable += " \\end{pmatrix}$";
            HTMLTable += "</td> ";

            HTMLTable += "<td>";
                HTMLTable += "$" + dataset[k1][4].replace(/\*/g, "") + "$";
                /*
                참고: dataset[k1][4]라는, (울프람 랭귀지에서 사용 가능한) (string 형태의) 수식을 LaTeX 문법에 맞게 바꾸기 위해, 가장 먼저 곱하기 연산 '*'를 제거해야 함... . ㅎㅎ (23:19:03)
                ... 근데, 그냥 'dataset[k1][4].replace("*", "")'라고만 하면, 이건 dataset[k1][4]에서 찾을 수 있는 가장 첫 번째 '*'만을 제거 (empty string으로 치환) 해 줌. ㅎㅎ (23:15:00)
                -> 고로, 찾을 수 있는 모든 '*'를 제거하려면 정규 표현식 (regular expression) 을 활용해야 함. 구글에 'javascript remove specific characters from string'라고 검색해 보니, 'AI 개요'가 두 개의 슬래시 ('/') 안에 제거할 문자를 넣고, 그 뒤에 'global flag'인 g를 붙여서 정규 표현식을 만든 후, 그걸 replace의 첫 번째 인자로 전달하면 된다고 해서 그대로 따라해 봄..! ㅎㅎ (23:17:53)
                -> 근데, 그냥 특수문자인 '*'를 적을 수는 없으니 (슬래시 + 애스터리스크가 주석으로 인식되기도 하고, 애스터리스크 ('*') 자체가 정규 표현식에서 의미가 있는 문자인 것 같기도 함) , 이걸 이스케이프하기 위해서 '*'의 앞에 역슬래시를 붙여서 성공적으로 정규 표현식을 만들어 줬음..! ㅎㅎ (참고 - 이에 대한 도큐멘테이션:
                    https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Regular_expressions
                )
                (23:20:57) 오오..! ㅎㅎ 흠 ㅎㅎ
                */
                //아직 지수에 두 자리 수 이상의 자연수가 있으면 수식이 어색해지는 문제를 고쳐야 함 (23:05:52)
            HTMLTable += "</td> ";

            HTMLTable += "<td>";
                HTMLTable += "$" + dataset[k1][5].replace(/\*/g, "") + "$"; //(23:04:22)
                //아직 지수에 두 자리 수 이상의 자연수가 있으면 수식이 어색해지는 문제를 고쳐야 함 (23:06:00)
            HTMLTable += "</td> ";

            HTMLTable += "<td>";
                if(dataset[k1][6].slice(0, 4) !== "Root") //dataset[k1][6] 안에 저장된 게, 울프람 랭귀지에서만 유용하게 사용될 수 있는 (?) Root[...] 꼴의 문자열 (울프람 랭귀지의 Root 오브젝트? ㅎㅎ) 이 아닌 경우에만 (즉, 뭔가 λ 값을 닫힌 식으로 정리할 수 있는 등, 출력된 결과를 유용하게 활용할 수 있는 경우에만) dataset[k1][6]에 저장된 문자열을 출력하라는 뜻... . ㅎㅎ (26:37:52) 오... ㅎㅎ 흠 ㅎㅎ
                {
                    HTMLTable += dataset[k1][6];
                }
            HTMLTable += "</td> ";

            HTMLTable += "<td>";
                HTMLTable += dataset[k1][7].toString(); //(29:04:54)
            HTMLTable += "</td> ";

            HTMLTable += "<td>";
                HTMLTable += "$" + dataset[k1][8].replace(/\*/g, "") + "$"; //(23:05:10)
                //아직 지수에 두 자리 수 이상의 자연수가 있으면 수식이 어색해지는 문제를 고쳐야 함 (23:06:03)
            HTMLTable += "</td> ";

            HTMLTable += "<td>";
                HTMLTable += dataset[k1][9].toString(); //(24:19:48)
            HTMLTable += "</td> ";

            CyclesWOCrit = dataset[k1][10];
            HTMLTable += "<td>";
                len2 = CyclesWOCrit.length;
                HTMLTable += "{";
                //HTMLTable += "$\\{"; //CyclesWOCrit를 출력할 때에는, 굳이 LaTeX으로 출력할 필요 없을 것 같아서, 굳이 웹페이지 로딩 시에 MathJax가 할 일을 (그리고 로딩 시간을) 늘리지 않아도 될 것 같아서... CyclesWOCrit을 출력할 시에는 딱히 LaTeX을 쓰지 않고, 그냥 문자열 형태로 출력하기로 결정함... . ㅎㅎ (26:13:49) 흠... ㅎㅎ
                for(k2 = 0; k2 < len2; k2++)
                {
                    if(k2 !== 0) //이 k2의 반복문은, 한 턴이 좀 복잡하게 생긴 것 같아서 그냥 이렇게 if 문을 써서 (살짝 계산량이 증가하더라도) 코드 가독성을 지나치게 떨어뜨리지 않는 편이 낫다고 판단함... . ㅎㅎ (25:59:23) 흠... ㅎㅎ
                    //또한 이렇게 if 문으로, 반복문에서 k2 = 0인 경우만 제외하고 쉼표를 찍는 식으로 코딩을 하면, (k2가 0부터 시작해도 돼서, len2가 1 이상일 필요가 없으므로) 반복문을 시작하기 전에 len2가 0인 경우를 따로 분리하는 예외 처리를 하지 않아도 된다는 이점이 있음. ㅎㅎ (26:02:56) 흠 ㅎㅎ
                    {
                        HTMLTable += ", ";
                    }

                    Cycle1WOCrit = CyclesWOCrit[k2];
                    len3 = Cycle1WOCrit.length;

                    HTMLTable += "(";
                    HTMLTable += Cycle1WOCrit[0].toString();
                    for(k3 = 1; k3 < len3; k3++)
                    {
                        HTMLTable += " "; //순환치환을 나타내는 통상적인 표기법대로, (덜 순서쌍처럼 보이게 하기 위해..? ... ㅎㅎ) 하나의 순환치환 안에서는 (쉼표를 없애고) 그냥 띄어쓰기로 수들을 구분하기로 함... . ㅎㅎ (26:21:04) 흠... ㅎㅎ
                        //HTMLTable += ", ";
                        HTMLTable += Cycle1WOCrit[k3].toString();
                    }
                    HTMLTable += ")";
                }
                HTMLTable += "}";
                //HTMLTable += "\\}$";
            HTMLTable += "</td> ";

            HTMLTable += "<td>";
                //HTMLTable += dataset[k1][11];
                if(dataset[k1][11])
                {
                    //HTMLTable += "T";
                    HTMLTable += "O";
                    //HTMLTable += "○";
                    //true / false를 어떤 식으로 출력해야 표 상에서 가장 가독성이 좋을지 고민하다가, (ASCII code 안에서 해결되므로, 특수문자가 깨질 걱정 같은 걸 하지 않아도 되기도 하고, ...) 가장 가독성이 괜찮아 보이는 (대문자) 알파벳 'O'와 'X'를 사용하기로 함... . ... ㅎㅎ (27:00:27) 흠... ㅎㅎ
                }
                else
                {
                    //HTMLTable += "F";
                    HTMLTable += "X";
                    //HTMLTable += "×";
                }
            HTMLTable += "</td> ";

            nPrime = dataset[k1][12];
            HTMLTable += "<td>";
                HTMLTable += nPrime.toString(); //(24:36:57)
            HTMLTable += "</td> ";

            MatrixPrime = dataset[k1][13]; //(24:37:12)
            HTMLTable += "<td>";
                HTMLTable += "$\\begin{pmatrix} ";
                    HTMLTable += MatrixPrime[0][0].toString();
                    for(k3 = 1; k3 < nPrime; k3++)
                    {
                        HTMLTable += " & ";
                        HTMLTable += MatrixPrime[0][k3].toString();
                    }
                    for(k2 = 1; k2 < nPrime; k2++)
                    {
                        HTMLTable += " \\\\ ";
                        HTMLTable += MatrixPrime[k2][0].toString();
                        for(k3 = 1; k3 < nPrime; k3++)
                        {
                            HTMLTable += " & ";
                            HTMLTable += MatrixPrime[k2][k3].toString();
                        }
                    } //(24:38:50)
                HTMLTable += " \\end{pmatrix}$";
            HTMLTable += "</td> ";

            phiPrime = dataset[k1][14];
            HTMLTable += "<td>";
                HTMLTable += "$\\begin{pmatrix} ";
                    //HTMLTable += (0).toString();
                    HTMLTable += "0"; //(25:30:39)
                    for(k3 = 1; k3 <= nPrime; k3++)
                    {
                        HTMLTable += " & ";
                        HTMLTable += k3.toString();
                    }
                    HTMLTable += " \\\\ ";
                    HTMLTable += phiPrime[0].toString();
                    for(k3 = 1; k3 <= nPrime; k3++)
                    {
                        HTMLTable += " & ";
                        HTMLTable += phiPrime[k3].toString();
                    }
                HTMLTable += " \\end{pmatrix}$";
            HTMLTable += "</td> ";

            HTMLTable += "<td>";
                HTMLTable += dataset[k1][15].toString(); //(24:19:55)
            HTMLTable += "</td> ";

            HTMLTable += "<td>";
                //HTMLTable += dataset[k1][16];
                if(dataset[k1][16]) //(27:02:04)
                {
                    //HTMLTable += "T";
                    HTMLTable += "O";
                    //HTMLTable += "○";
                }
                else
                {
                    //HTMLTable += "F";
                    HTMLTable += "X";
                    //HTMLTable += "×";
                }
            HTMLTable += "</td> ";

            HTMLTable += "<td>";
                HTMLTable += dataset[k1][17].toString(); //(24:19:58)
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