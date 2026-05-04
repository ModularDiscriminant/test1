//2026/5/3



//const ReferenceElementList = document.getElementsByClassName("def thm lem cor prp"); //(각각 definition, theorem, lemma, corollary, proposition을 의미함 (2026/5/3 16:36:20))
//정의, 정리, figure (?) , ... 등 추후 참조할 만한 것들은 모두 'reference'라는 이름으로 묶어서 부른다. ㅎㅎ (2026/5/3 16:38:26) 흠 ㅎㅎ

//알고 보니, 'document.getElementsByClassName("def thm lem cor prp")'를 하면 (def, thm, lem, cor, prp 중 하나라도 클래스로 갖고 있는 element를 모두 모아 주는 게 아니라) def, thm, lem, cor, prp를 모두 클래스로 갖고 있는 element들만 (!) 모아 주는 거였음... . ㅎㅎ (2026/5/3 17:55:59)
//-> (ChatGPT에게 물어보고 답변을 받은 후) 아래와 같이 코드를 수정함... . ㅎㅎ (2026/5/3 17:56:16)
const ReferenceElementList = Array.from(document.querySelectorAll(".def, .thm, .lem, .cor, .prp")); //(2026/5/3 17:58:36)
/*
참고:
https://developer.mozilla.org/ko/docs/Web/API/Document/querySelectorAll
을 보면, querySelectorAll은 NodeList라는 걸 반환하며,
https://developer.mozilla.org/ko/docs/Web/API/NodeList
를 보면 그걸 array로 바꾸려면 Array.from()을 사용할 수 있다고 함... . ㅎㅎ
(또한, 그냥 forEach()를 사용해서 NodeList 전체에 대해서 선회하는 반복문을 돌릴 수도 있다고 함... . ㅎㅎ)
(+ ChatGPT의 답변에 따르면, nodelist라는 NodeList 객체? ... 가 주어졌을 때, '[...nodelist]' 같이 적으면 그것도 아마 nodelist를 array로 변환한 게 되는 듯..? ... ㅎㅎ (2026/5/3 18:01:55) 흠... ㅎㅎ)
(2026/5/3 18:02:02) 오오..! ㅎㅎ 흠... ㅎㅎ
*/

const NumOfRefs = ReferenceElementList.length; //('reference'를 줄여서 그냥 'ref'라고 (그리고 'references'를 줄여서 그냥 'refs'라고) 적음... . ㅎㅎ (2026/5/3 16:39:59) 흠... ㅎㅎ)
const ReferenceIdList = new Array(NumOfRefs); //(... 굳이 이런 array를 만들 필요는 없..나? ... ㅋㅋㅋㅋ (2026/5/3 16:42:52) 흠... ㅎㅎ (... RegexForReferenceIdList를 만들고부터는, 진짜로 필요 없을 수도..? ... ㅎㅎ (2026/5/3 18:17:41) 흠... ㅎㅎ) (... 나중에 모든 definition과 theorem, ... 을 모아서 보여주는 기능도 만들고, ... 해야 되나... ㅎㅎ (2026/5/3 17:27:45) 흠... ㅎㅎ))



function FullNameOfClassForRefs(ClassName)
/*
"def", "thm" 같은, (reference가 가질 수 있는) 클래스 명칭을 입력하면 그에 대응하는 full name ("Definition", "Theorem" 등) 을 반환하는 함수.
(실제로 웹 페이지에서 "Definition. ...", "Theorem. ..."과 같이 출력할 때 사용할 것이기 때문에, 대문자로 시작하도록 적는다.)
(2026/5/3 16:49:56) 흠 ㅎㅎ
*/
{
    switch(ClassName)
    {
        case "def":
            return "Definition";
        case "thm":
            return "Theorem";
        case "lem":
            return "Lemma";
        case "cor":
            return "Corollary";
        case "prp":
            return "Proposition";
        default:
            return null; //(2026/5/3 16:55:25)
    }
}
//(2026/5/3 16:55:28)



let ref; //(중복 계산 방지용 변수이기도 하고, 코드의 가독성을 위한 것도 있음 (2026/5/3 17:13:55))
let k3;

for(k3 = 0; k3 < NumOfRefs; k3++)
{
    ref = ReferenceElementList[k3]; //(중복 계산 방지용 / 가독성용 변수 (2026/5/3 17:14:24))

    ReferenceIdList[k3] = ref.id; //(2026/5/3 16:43:09) (2026/5/3 17:14:35에 수정함)

    ref.innerHTML = '<span style="font-size: 20px"><b>' + FullNameOfClassForRefs(ref.className) + '.</b> (' + ref.id + ')</span> <br><br> ' + ref.innerHTML; //(ref.id를 쓸지 ReferenceIdList[k3]를 쓸지 (뭐가 더 빠를지, ...) 고민했는데, 일단 그냥 ref.id를 씀 (2026/5/3 17:16:54)) (2026/5/3 18:03:49에 '<br>'을 '<br><br>'로 바꿈)
}
//(2026/5/3 17:17:19)




//------------------------------------------------ (2026/5/3 16:33:43)
//(구분선 위쪽: 각 definition, theorem, ... 등 reference로 사용되는 것들의 innerHTML을 좀 편집하는 코드,
//구분선 아래쪽: 모두 클래스가 proof인 element의 내부를 편집하는 코드. ㅎㅎ (2026/5/3 18:26:01) 흠 ㅎㅎ)




function EscapeRegex(string) //(주어진 긴 문자열 안에서 주어진 문자열 string이 어떤어떤 위치에 포함되어 있는지 정확하게 찾아낼 수 있도록,) 문자열 string 안에 regex (정규 표현식) 에서 사용되는 symbol들이 섞여 있더라도, string을 특수문자들을 잘 escaping하면서 regex로 변환해 주는 함수. ㅎㅎ (2026/5/3 18:11:01) 오오..! ㅎㅎ 흠 ㅎㅎ
{
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); //(ChatGPT가 제시한 코드를 사용함 (2026/5/3 17:30:00))
}
//(2026/5/3 17:30:05)



const RegexForReferenceIdList = new Array(NumOfRefs); //각 reference들의 id (문자열) 를, EscapeRegex 함수를 통해서 regex로 바꾼 결과를 계산해서 저장해 놓는 array. ㅎㅎ (2026/5/3 18:08:04) 흠 ㅎㅎ

for(k3 = 0; k3 < NumOfRefs; k3++)
{
    RegexForReferenceIdList[k3] = new RegExp(
        EscapeRegex(ReferenceIdList[k3])
    , "gi"); //(각 reference들의 id의 regex-escaped 버전의 문자열로 만든 regex를 미리 다 계산해 놓는 전처리 (2026/5/3 18:13:29))
    //참고: (ChatGPT에 따르면) "gi"에서 g는 global, 즉 문자열 전체를 검사한다는 뜻이고, i는 case-insensitive, 즉 대소문자를 무시하고 검색한다는 뜻이다. (2026/5/3 18:14:19)
}
//(2026/5/3 18:14:29)



const WrapperList = document.getElementsByClassName("proof"); //(2026/5/2 23:51:04)
const NumOfProofs = WrapperList.length; //(2026/5/2 23:52:40)
const ProofList = new Array(NumOfProofs); //(2026/5/2 24:14:44)
const ProofLenList = new Array(NumOfProofs); //(2026/5/2 24:28:00) (... (중복 계산 방지를 위한) 이런 배열을 굳이 만들 필요는 없..나..? (그냥 매번 ProofList[k1].length를 쓰면 되나..?) ... ㅎㅎ (2026/5/2 25:42:13) 흠... ㅎㅎ)
const CurrentPageNumList = new Array(NumOfProofs); //(2026/5/2 27:23:14)



let temp1; //주어진 증명에서, 사용된 definition, theorem, ... 등의 reference들을 marking, highlighting, ... 하는 과정에서 사용하는 임시 변수 (2026/5/3 18:21:12)
let temp2; //(중복 계산 방지용 변수, 문자열을 담음 (2026/5/3 19:12:59))
let k1, k2;

//<div class="proof">(...)</div> 안에 적힌 증명 읽어서 가져오기 (2026/5/2 25:43:15)
for(k1 = 0; k1 < NumOfProofs; k1++)
{
    temp1 = WrapperList[k1].innerHTML; //(2026/5/3 18:26:30)

    for(k3 = 0; k3 < NumOfRefs; k3++)
    {
        //temp2 = '<span onclick="ShowReference(' + k1.toString() + ', ' + ReferenceIdList[k3] + ')" style="color: blue; cursor: pointer;">'; //(중복 계산 방지용 변수, 문자열을 담음 (2026/5/3 19:13:10))


        //temp2 = '<span onclick="ShowReference(' + k1.toString() + ', "' + ReferenceIdList[k3] + '")" style="color: blue; cursor: pointer;">';
        /*
        원래는 위와 같이 코드를 짰었는데, 이렇게 코드를 짤 경우, 예컨대 k1은 0이고 ReferenceIdList[k3] (즉 reference의 id) 은 "Freshman's Dream"이라고 했을 때 추후 HTML에는
            <span onclick="ShowReference(0, "Freshman's Dream")" style="color: blue; cursor: pointer;">Freshman's Dream</span>
        이런 코드가 들어가게 됨. ㅎㅎ (2026/5/3 28:40:11)
        근데, 사실 이렇게 짜면 문제가 되는 게...
            onclick="ShowReference(0, "Freshman's Dream")"
        부분에서 큰따옴표가 이중으로 겹쳐 있고, 이걸 해결할 수가 없음.

        · 특히 문제는,
            onclick="ShowReference(0, \"Freshman's Dream\")"
        와 같이 역슬래시로 escape하려고 시도해도 잘 되지 않는다는 것임. (2026/5/3 28:42:45)

        · 이에 대해 ChatGPT와 Gemini에게 물어보니, 둘 다 [큰따옴표 안쪽이 JavaScript의 문법으로 해석되기 이전에, 저 전체 문자열을 HTML의 문법대로 parsing하는 과정에서 문제가 생긴다. HTML에서는 역슬래시 + 큰따옴표가 큰따옴표의 escaping으로 인식되지 않으며, 결국 저 코드는 그냥 큰따옴표가
            "ShowReference(0, \" 및 ")"
        처럼 묶인 상황으로 인식되어 오류를 일으킨다.]고 답변함 (2026/5/3 28:45:30)

        → 해결 방안:

        (1) ChatGPT와 Gemini가 공통적으로 제시한 첫 번째 해결 방법은, 안쪽의 큰따옴표를 (JavaScript식으로 역슬래시 + 큰따옴표와 같이 적어서 escape하는 게 아니라) HTML식으로 &quot;와 같이 적어서 escape하는 것임. ㅎㅎ (2026/5/3 30:24:12)
        즉, 코드를
            temp2 = '<span onclick="ShowReference(' + k1.toString() + ', &quot;' + ReferenceIdList[k3] + '&quot;)" style="color: blue; cursor: pointer;">';
        와 같이 짜는 방법이 있고, 실제로 이렇게 하면 문제가 해결됨 (!) . (2026/5/3 30:24:55)

        ▷ 이 코드를 좀 더 해석해 보면, 예컨대 k1은 0이고 ReferenceIdList[k3]은 "Freshman's Dream"일 때, 추후 HTML에는
            <span onclick="ShowReference(0, &quot;Freshman's Dream&quot;)" style="color: blue; cursor: pointer;">Freshman's Dream</span>
        이란 코드가 들어가게 됨. ㅎㅎ 그러면 이걸 HTML parser가 분석하는 과정에서 &quot;을 큰따옴표로 인식하게 되고, 텍스트를 클릭할 시에 onclick="(...)"에서 (...) 부분에 있는 JavaScript 코드인
            ShowReference(0, &quot;Freshman's Dream&quot;)
        에서 &quot;를 큰따옴표로 바꿔서, 실제로는
            ShowReference(0, "Freshman's Dream")
        이라는 JavaScript 코드를 실행하게 된다고 함..! ㅎㅎ 그래서 문제없이 잘 실행이 되는 원리라고 하네... . ㅎㅎ (2026/5/3 30:33:52) 흠.... ㅎㅎ


        (2) Gemini가 제시한 두 번째 해결 방법은, JavaScript에 있는 문법 중 하나인 'template literal'이라는 것을 이용하는 것임. ㅎㅎ 이건 backtick (`) 을 활용해서 만들 수 있는데, 문자열과 비슷하지만 여러 줄에 걸쳐 선언할 수 있고 (이로써 엔터를 자연스럽게 입력할 수 있다는 장점이 있음!!) , 작은따옴표와 큰따옴표를 모두 내부에 별다른 escaping 없이 포함할 수 있음! (2026/5/3 30:27:15)
        그래서, 결국 backtick (`) 은 작은따옴표와 큰따옴표 다음의, 문자열을 선언하는 세 번째 방법? ... 처럼 기능하게 되는 것 같음... . ㅎㅎ (2026/5/3 30:27:54)
        이를 사용하면, 다행히도 escape 문제를 간신히 우회할 수 있고,
            temp2 = '<span onclick="ShowReference(' + k1.toString() + ', `' + ReferenceIdList[k3] + '`)" style="color: blue; cursor: pointer;">';
        와 같이 성공적으로 작동하는 코드를 짤 수 있음..! ㅎㅎ (2026/5/3 30:29:47) 오오..! ㅎㅎ 흠 ㅎㅎ

        ▷ 이 코드도 좀 더 해석해 보면, 예컨대 k1은 0이고 ReferenceIdList[k3]은 "Freshman's Dream"일 때, 추후 HTML에는
            <span onclick="ShowReference(0, `Freshman's Dream`)" style="color: blue; cursor: pointer;">Freshman's Dream</span>
        이란 코드가 들어가게 됨. ㅎㅎ 그러면 텍스트를 클릭할 시에 JavaScript 코드인
            ShowReference(0, `Freshman's Dream`)
        이 실행되게 되고, 이건 실제로 올바른 (유효한) JavaScript 코드이며, apostrophe (작은따옴표) (') 는 backtick으로 감싼 문자열 안에 들어 있으므로 별다른 escape가 필요하지 않게 돼서 (!) 원활하게 코드가 동작하게 된다고 함..!! ㅎㅎ (2026/5/3 30:35:46)


        (3) Gemini는 세 번째 해결 방법도 제시했는데, 그냥 텍스트 부분의 HTML 코드는
            <span class="clickable" data-message="Freshman's Dream">Freshman's Dream</span>
        과 같은 식으로 간단명료하게 짜고, 나중에 JavaScript 코드 내에서
            document.querySelectorAll('.clickable').forEach(function (element) {
                element.addEventListener('click', function () {
                    ShowReference(0, this.dataset.message);
                });
            });
        이런 식으로 각 element에 직접적으로 하나씩 (손수) event listener를 달아 주면서 클릭 시 원하는 동작을 수행하도록 만드는 방법도 알려줌... . ㅎㅎ
        이런 식으로 할 경우, HTML 태그 안에 적혀 있는 data-(무언가) 꼴의 attribute들은 그 태그가 품고 있는 데이터로서 기능한다는 점을 활용한다는 것 같네... . ㅎㅎ (2026/5/3 30:44:16)
        (참고: 실제론 'ShowReference(0, this.dataset.message);'에서 함수의 첫 번째 입력값 0도 텍스트에 따라서 달라지도록, (아마 data-(무언가) 꼴의 attribute들을 활용해서) 좀 더 코드를 수정해야 함... . ㅎㅎ (2026/5/3 30:45:59) 흠... ㅎㅎ)
        (data attribute의 documentation:
        https://developer.mozilla.org/ko/docs/Web/HTML/How_to/Use_data_attributes
        (2026/5/3 30:46:38) 오오..! ㅎㅎ 흠 ㅎㅎ)
        
        (... 이 방법은 data attribute 같은 새로운 개념을 배우고 사용해 보도록 해 주며, 논리적으로도 깔끔한 좋은 코드이기는 하지만... 사실 가뜩이나 이 코드 자체도 HTML에 원래 있는 코드가 아니라 JavaScript를 이용해서 나중에 입력될 코드이니, 이 코드를 다 사용하게 되면 JavaScript 코드가 너무 읽기 힘들고 복잡해질 듯해서 이 방법을 채택하지는 않음... . ㅎㅎ
        (1)이나 (2) 같은 방법이, 코드가 원래와 거의 비슷해서 하고자 하는 바가 명확하면서, 그렇게 길지 않아서 JavaScript의 문자열 안에 담는 것도 합리적이다..라고 생각했음... . ㅎㅎ
        (2026/5/3 31:16:19) 오오..! ㅎㅎ 흠 ㅎㅎ)


        ∴ 결국 나는 방법 (2)를 택해서, backtick을 사용해서 깔끔하게 코드를 짜기로 결정함... . ㅎㅎ
        (2026/5/3 31:17:12) 오오..! ㅎㅎ 흠 ㅎㅎ
        */
        
        //temp2 = '<span onclick="ShowReference(' + k1.toString() + ', &quot;' + ReferenceIdList[k3] + '&quot;)" style="color: blue; cursor: pointer;">';

        temp2 = '<span onclick="ShowReference(' + k1.toString() + ', `' + ReferenceIdList[k3] + '`)" style="color: blue; cursor: pointer;">'; //(2026/5/3 31:18:10)


        
        temp1 = temp1.replace(RegexForReferenceIdList[k3], match => (temp2 + match + '</span>')); //(2026/5/3 19:14:47)
        /*
        나는 아까 replace 함수를
        replace(정규 표현식, 변경 후의 문자열)
        꼴로 쓰는 것만 (ChatGPT한테) 배웠어서, (find and) replace를 할 때, 변경 후의 문자열이 변경 전의 문자열 (특히 regular expression에 의해 감지 (detect) 된 부분) 의 영향을 받아야 할 경우엔 어떻게 해야 할지 몰랐는데...
        한 번 더 ChatGPT에게 물어보니, replace 함수를
        replace(정규 표현식, (정규 표현식이 detect한 문자열을 받아서 변경 후의 문자열을 내놓는 anonymous function))
        의 꼴로 사용하는 것도 가능하다고 해서, 이걸 사용해서 문제를 해결하는 방법을 배움..!! ㅎㅎ
        (2026/5/3 19:03:16) 오오..! ㅎㅎ 흠 ㅎㅎ
        */
    }
    //(2026/5/3 19:15:15)

    ProofList[k1] = temp1.split("@@"); //(2026/5/2 24:27:23) (2026/5/3 18:41:19에 수정함)
    /*
    innerHTML, innerText, textContent 중 innerHTML을 쓰는 게 이 상황 (직접적으로 HTML 코드에 적힌 문자열을 읽어와야 하는 상황) 에서 가장 낫다는 것을 배운 것은
    https://hianna.tistory.com/483
    이 글을 보고 나서였음... . ㅎㅎ (2026/5/2 24:24:44) 오오..! ㅎㅎ 흠 ㅎㅎ
    */
    ProofLenList[k1] = ProofList[k1].length; //(2026/5/2 25:36:25)
    for(k2 = 0; k2 < ProofLenList[k1]; k2++)
    {
        ProofList[k1][k2] = ProofList[k1][k2].split("@"); //(<div class="proof">(...)</div> 안에 증명을 올바른 (정상적인) format으로 입력했다면, 이건 무조건 길이 4의 array of strings가 되어야 함) (2026/5/2 25:40:46)
    }
}



//<div class="proof">(...)</div> 안에 ArgumentBox를 비롯한 구조들을 전부 집어넣기 (2026/5/2 25:45:42)
for(k1 = 0; k1 < NumOfProofs; k1++)
{
    WrapperList[k1].innerHTML = `<h2>Proof.</h2>
        <div class="ArgumentBox">
            <div class="CurrentPage">
                Current Page: 1/${ProofLenList[k1].toString()}
            </div>

            <div class="GoToPage">
                <label for="PageNumInput${k1.toString()}">Go to Page</label> &nbsp;&nbsp;
                <input type="number" id="PageNumInput${k1.toString()}" style="width: 50px"></input> &nbsp;&nbsp;&nbsp;&nbsp;
                <button onclick="ChangePage(${k1.toString()})" style="cursor: pointer">&nbsp;&nbsp;Go&nbsp;&nbsp;</button>
            </div>

            <button class="PrevButton" onclick="PrevPage(${k1.toString()})">
                ← Previous
            </button>

            <button class="NextButton" onclick="NextPage(${k1.toString()})">
                Next →
            </button>

            <div class="StatusAndGoal">
                ${ProofList[k1][0][0]}
            </div>

            <div class="ExampleStatusAndGoal">
                ${ProofList[k1][0][2]}
            </div>

            <div class="Argument">
                ${ProofList[k1][0][1]}
            </div>

            <div class="ExampleArgument">
                ${ProofList[k1][0][3]}
            </div>
        </div>

        <br>
        <div class="RecallBox"></div>`; //(2026/5/4 19:48:56)
    /*
    (backtick으로 감싼 template literal을 사용하면, 기존처럼 HTML 코드의 모든 행을 따로따로 문자열로 만들고 전부 '+'로 잇는 수고를 하지 않아도 되며, 더하여 문자열 안에 들어 있어야 하는 변수들도 ('${...}'를 사용해서) 전부 간단히 문자열 안에 삽입할 수 있다는 것을 알게 돼서, 기존보다 코드가 더욱 보기 편하고 깔끔해질 것 같아서 이 장문의 문자열 부분만 template literal을 사용해서 다시 코딩해 봄... . ㅎㅎ (기능에는 전혀 차이가 없음!) (2026/5/4 19:52:47)
    코드에서 문자열을 사용하는 나머지 부분들은 (사실 길이가 그렇게 길지 않아서) 죄다 backtick을 사용하는 template literal로 고쳐 놓지는 않겠지만, 아마도 추후에는 코딩할 때 이렇게 backtick과 '${...}'를 사용해서 innerHTML에 넣을 문자열을 편집하는 방식을 많이 사용할 듯..?? ... ㅎㅎ (2026/5/4 19:55:11) 오오..!! ㅎㅎ 흠 ㅎㅎ
    + 추가로, backtick과 '${...}'을 쓰는 방식으로 코딩 방식을 바꾸더라도, 문자열을 concatenate할 때에는 명시적으로 문자열 타입인 것들만 사용해야 한다는 (즉, 형 변환이 필요하다면 명시적 형 변환을 진행해야 한다는) 내 관점은 바뀌지 않음... . ㅎㅎ 그래서 ('${k1}'과 같이 쓰는 게 비록 짧고 간결해 보이더라도) 문자열이 아닌, 예컨대 수 (number) 변수와 같은 경우 전부 '${k1.toString()}'과 같이 명시적 형 변환을 진행하고 문자열에 삽입하는 식으로 적었음... . ㅎㅎ (그래야 코드를 읽는 사람이 각 변수의 타입에 대해서 혼동 없이 보다 명확하게 인식할 수 있기 때문... .) (2026/5/4 20:00:43) 흠... ㅎㅎ)
    */
    //(참고: backtick을 사용하지 않고 문자열만으로 모두 처리했던 기존 코드를 완성했던 시각은 2026/5/2 26:31:15였고, 거기서 클래스명을 전부 각 칸의 명칭에 맞춰 수정한 시각은 2026/5/2 26:51:05였음. ㅎㅎ (2026/5/4 19:56:47))



    //(... 지금 보니 클래스명 중 'Argument'는 단일 단어임에도 그냥 전부 소문자로 적지 않고 (파스칼 케이스를 따라) 대문자로 시작하게 적어 버렸네... ㅋㅋㅋㅋ (그냥 놔둬도 괜찮겠지..? ㅋㅋㅋㅋ) (2026/5/2 26:58:31) 흠 ㅎㅎ)
    CurrentPageNumList[k1] = 1; //페이지 번호는 양의 정수 (1, 2, 3, ...) 로 세며, 0을 포함하지 않는 것이 나의 convention이다. 그러므로 첫 페이지는 1페이지이다. (2026/5/2 27:25:00)
}



//클래스가 X인 element들의 리스트 (array) 를 XElementList와 같이 적음. ㅎㅎ (2026/5/2 27:00:17) 흠 ㅎㅎ
const          CurrentPageElementList = document.getElementsByClassName(         "CurrentPage");
//const             GoToPageElementList = document.getElementsByClassName(            "GoToPage"); //클래스가 GoToPage인 element를 참조할 일이 없음 (2026/5/2 27:07:23)
//const           PrevButtonElementList = document.getElementsByClassName(          "PrevButton"); //처음엔 필요한 줄 알았는데, 이것도 사실 불필요함. 버튼이 눌릴 때 proof index 정보를 전달해 주는 것이 중요할 뿐, 클래스가 PrevButton인 element들 자체는 참조할 일이 없기 때문. (2026/5/2 28:20:40)
//const           NextButtonElementList = document.getElementsByClassName(          "NextButton"); //처음엔 필요한 줄 알았는데, 이것도 사실 불필요함. 버튼이 눌릴 때 proof index 정보를 전달해 주는 것이 중요할 뿐, 클래스가 NextButton인 element들 자체는 참조할 일이 없기 때문. (2026/5/2 28:20:53)
const        StatusAndGoalElementList = document.getElementsByClassName(       "StatusAndGoal");
const ExampleStatusAndGoalElementList = document.getElementsByClassName("ExampleStatusAndGoal");
const             ArgumentElementList = document.getElementsByClassName(            "Argument");
const      ExampleArgumentElementList = document.getElementsByClassName(     "ExampleArgument");
//(5개의) 각 array의 length는 모두 NumOfProofs와 같음 (2026/5/2 28:32:50)

//참고: index k1이 주어져 있을 때 매번 WrapperList[k1].getElementsByClassName("CurrentPage")[0]과 같은 방식으로 그 element를 찾아낼 수도 있겠지만, 음... 이렇게 하는 건 계속 계산을 하도록 만드므로 약간 비효율적인 것 같아서 그냥 위와 같이 7개의 리스트를 미리 다 계산해 놓는 게 나을 (효율적일) 것이라고 판단함... . ㅎㅎ (2026/5/2 27:12:35) 흠... ㅎㅎ
//... 음, 애초에 위 반복문에서 WrapperList[k1].innerHTML에 값을 대입할 때, 여덟 개 칸 각각에 class뿐만 아니라 id도 부여해서, 예컨대 k1 = 1, 2, 3, ...일 때 id를 "CurrentPage1", "CurrentPage2", "CurrentPage3", ... 으로 부여하는 (!) 방법도 있었을 것 같긴 한데.... 음, 그것도 좀 사실 (매번 (불필요하게 문서 전체에서 getElementById를 계산하는? ...) 계산을 요하기도 하고) redundant하고 불필요한 id를 너무 많이 부여하게 되는 것 같아서 기각함... . ㅎㅎ (2026/5/2 27:15:54) 흠... ㅎㅎ

const         PageNumInputElementList = new Array(NumOfProofs); //(2026/5/2 27:40:48)

for(k1 = 0; k1 < NumOfProofs; k1++)
{
    PageNumInputElementList[k1] = document.getElementById("PageNumInput" + k1.toString()); //(2026/5/2 27:44:05)
}

//클래스가 GoToPage인 element 안에 들어 있는 수 입력란 (<input> 태그) 의 경우, <label>을 달아야 하기 때문에 어쩔 수 없이 "PageNumInput0", "PageNumInput1", "PageNumInput2", ... 꼴로 각자 개별적인 id를 부여함... . ㅎㅎ 대신 얘네는 style을 지정할 게 많이 없어서 따로 얘네들을 모은 클래스를 만들(고 CSS 파일에 그 클래스 관련 항목을 추가하)지는 않음. ㅎㅎ 그래서 이 element들의 주솟값? 은 (중복 계산 방지를 위해) 미리 (class 대신) id를 통해서 전부 추출해서 PageNumInputElementList array에 저장해 (기록해) 놓음... . ㅎㅎ (2026/5/2 27:32:48) 흠... ㅎㅎ

const            RecallBoxElementList = document.getElementsByClassName(           "RecallBox");
//이 array의 length도 NumOfProofs와 같음 (2026/5/3 16:25:04)



function GoToGivenPage(ProofIndex, PageNum) //ProofIndex는 proof의 번호 (index) 를, PageNum은 이동할 페이지의 번호 (number) 를 의미한다.
//이때 proof 번호를 proof index라고 한 이유는 이 값은 array에서의 index와 일치하는 값이며 0부터 시작하고,
//페이지 번호를 page number라고 한 이유는 이 값은 array에서의 index와는 일치하지 않는 (독자적인) 값 (번호) (numbering) 이며 1부터 시작하기 때문이다. (2026/5/2 27:53:51)
{
    const PageIndex = PageNum - 1; //중복 계산 방지용 변수 (그리고 프로그래밍 시의 혼동 방지용 변수) . 0부터 시작하며 실제로 array에서의 index와 일치하는 값이기 때문에 PageIndex (page index) 라고 이름붙였다. (2026/5/2 28:18:52)

    CurrentPageNumList[ProofIndex] = PageNum; //(2026/5/2 28:39:06)
    
             CurrentPageElementList[ProofIndex].innerHTML = "Current Page: " + PageNum.toString() + "/" + ProofLenList[ProofIndex].toString(); //(2026/5/2 28:23:14)
           StatusAndGoalElementList[ProofIndex].innerHTML = ProofList[ProofIndex][PageIndex][0];
    ExampleStatusAndGoalElementList[ProofIndex].innerHTML = ProofList[ProofIndex][PageIndex][2]; //(2026/5/2 29:48:24)
                ArgumentElementList[ProofIndex].innerHTML = ProofList[ProofIndex][PageIndex][1]; //(2026/5/2 29:48:36)
         ExampleArgumentElementList[ProofIndex].innerHTML = ProofList[ProofIndex][PageIndex][3];
    //(2026/5/2 28:25:00)



    //MathJax.Hub.Queue(["Typeset", MathJax.Hub, WrapperList[ProofIndex]]); //(2026/5/2 29:09:57)
    /*
    오오, 전에 찾아본 (그리고 ChatGPT에게 물어봐서 해결한) 바와 같이 이러한 재렌더링이 필요하다는 사실은 알고 있었는데, 전에는 재렌더링하길 원하는 element의 ID를 알고 있을 때
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, (수식을 추가한 요소의 id를 문자열로 입력)]);
    과 같이 입력하는 방법만을 알고 있었음... . ㅎㅎ
    근데, 지금은 WrapperList[ProofIndex]의 id라는 게 없고 그냥 그 element 자체(의 주솟값)만 갖고 있는 상황이라서, ChatGPT에게 다시 물어보니
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, (수식을 추가한 요소 자체(의 주솟값))]);
    과 같이 입력해도 똑같이 재렌더링을 할 수 있다고 알려줌... . ㅎㅎ
    그래서 이번에도 코드 한 줄 추가로 간편하게 재렌더링에 성공함..!! ㅎㅎ
    오오, 편리하넹..!! ㅎㅎ (2026/5/2 29:14:06) 오오..!! ㅎㅎ 흠 ㅎㅎ
    */

    /*
    이전에 쓰던 MathJax 2.7.5 버전에서는, 기존에 있던 innerHTML을 복사해서 다른 곳에 붙여넣으면서 수식도 함께 복사하면, 그걸
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, (재렌더링을 진행할 element)]);
    같은 코드로 재렌더링할 때 복사한 출처가 된 innerHTML에 있는 수식도 영향을 받아서 사라지거나, ... 하는 버그가 있었음... . ㅎㅎ (ChatGPT에게 물어보니, 애초에 MathJax 2.7.5 구현 방식 상의 버그라고 함...) (2026/5/4 18:38:56)

    그래서 ChatGPT로부터, MathJax의 버전을 업그레이드하는 게 좋을 것 같다는 말을 듣고,
    https://docs.mathjax.org/en/stable/web/start.html
    에 가서 MathJax (버전 4..!) 의 최신 버전? 최신 안정 버전? ... 을 가져옴..! ㅎㅎ 앞으로는 쭉 이 개선된 버전을 사용하도록 하자... . ㅎㅎ
    (2026/5/4 18:40:44) 오오..! ㅎㅎ 흠 ㅎㅎ
    
    -> ChatGPT에게 물어보니, MathJax의 이 버전 (버전 4) 에서는, 어떤 element에 수식을 추가했고 재렌더링이 필요할 경우, 간단히
        MathJax.typesetPromise([(재렌더링을 진행할 element)]);
    라고 입력하면 된다고 함~ ㅎㅎ (2026/5/4 18:42:15)
    (참고: (ChatGPT 왈) 만약 렌더링한 MathJax 수식을 바로 사용할 일이 있다면, MathJax.typesetPromise의 동작이 끝날 때까지 기다려야 하므로
        await MathJax.typesetPromise([(재렌더링을 진행할 element)]);
    라고 적는 것이 더 바람직할 것이라고 함... . ㅎㅎ 그러나 그냥 렌더링을 진행해서 화면에 표시하고 끝이라면, 굳이 await를 붙일 필요는 없다고 함... . ㅎㅎ (특히, await keyword는 async function 안에서만 사용할 수 있다는 점에 유념할 것)
    (2026/5/4 18:45:12) 옹 ㅎㅎ 흠 ㅎㅎ)

    오케이, 이제 MathJax 4를 사용해서 편리하게 innerHTML의 수식을 복사해서 옮기고, ... 할 수 있겠넹~~ ㅎㅎ
    (2026/5/4 18:45:57) 오오..!! ㅎㅎ 흠 ㅎㅎ
    */
    
    MathJax.typesetPromise([WrapperList[ProofIndex]]); //(2026/5/4 18:46:45)
}
//(2026/5/2 29:14:12)

function ChangePage(ProofIndex)
{
    const PageNumInput = parseInt(PageNumInputElementList[ProofIndex].value); //(2026/5/2 28:09:16)
    if(Number.isInteger(PageNumInput)) //딱 한 가지 예외인, PageNumInput이 NaN인 경우를 배제하려는 것. 즉 '!Number.isNaN(PageNumInput)'을 써도 됨 (2026/5/2 28:11:41)
    {
        if(1 <= PageNumInput && PageNumInput <= ProofLenList[ProofIndex])
        {
            GoToGivenPage(ProofIndex, PageNumInput);
        }
    }
}
//(2026/5/2 28:12:30)

function PrevPage(ProofIndex)
{
    if(CurrentPageNumList[ProofIndex] > 1)
    {
        GoToGivenPage(ProofIndex, CurrentPageNumList[ProofIndex] - 1);
    }
    //CurrentPageNumList[ProofIndex]를 두 번 계산하는 정도의 중복 계산은 괜찮겠지..? ... ㅎㅎ (2026/5/2 28:15:29) 흠... ㅎㅎ
}
//(2026/5/2 28:15:36)

function NextPage(ProofIndex)
{
    if(CurrentPageNumList[ProofIndex] < ProofLenList[ProofIndex])
    {
        GoToGivenPage(ProofIndex, CurrentPageNumList[ProofIndex] + 1);
    }
    //CurrentPageNumList[ProofIndex]를 두 번 계산하는 정도의 중복 계산은 괜찮겠지..? ... ㅎㅎ (2026/5/2 28:15:58) 흠... ㅎㅎ
}
//(2026/5/2 28:16:04)



function ShowReference(ProofIndex, ReferenceId)
{
    const reference = document.getElementById(ReferenceId); //(2026/5/3 16:21:08)

    const ReferenceContent = '<div class="' + reference.className + '">'
            + reference.innerHTML
        + '</div> '; //(2026/5/3 16:31:28)

    RecallBoxElementList[ProofIndex].innerHTML = ReferenceContent + RecallBoxElementList[ProofIndex].innerHTML; //(2026/5/3 16:26:21)
}
//(2026/5/3 16:31:34)