//2026/5/5, 2026/5/7



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
const ReferenceIdList = new Array(NumOfRefs); //(... 굳이 이런 array를 만들 필요는 없..나? ... ㅋㅋㅋㅋ (2026/5/3 16:42:52) 흠... ㅎㅎ (... ReferenceIdLowerCaseList는 있어야 하지만, ReferenceIdList는 없어도 되려..나..? ... ㅎㅎ (2026/5/5 24:59:58) 흠... ㅎㅎ) (... 나중에 모든 definition과 theorem, ... 을 모아서 보여주는 기능도 만들고, ... 해야 되나... ㅎㅎ (2026/5/3 17:27:45) 흠... ㅎㅎ))

const ReferenceIdLowerCaseList = new Array(NumOfRefs); //(추후 비교를 위함 (2026/5/5 17:39:23))



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



function HighlightSelectedTextForReferences(text) /*
이중 대괄호 ('[[]]') 안에 적은, 선택된 (selected) 텍스트를
· (reference를 연결하고 파랗게 칠하(고 마우스 포인터를 올렸을 때 모양을 클릭하는 모양으로 바꾸)거나,
· (연결할 수 있는 reference가 없으면) 약간 어둡게 파랗게 칠함 (그리고 마우스 포인터를 올렸을 때 모양을 바꾸지 않음) 으로써)
highlight하는 함수. (2026/5/5 24:38:57)
(원래는 함수명을 그냥 HighlightSelectedText라고 지으려고 했는데, 생각해 보니 reference 버전과 proof 버전을 따로 만들어야 할 것 같아서 HighlightSelectedTextForReferences 함수와 HighlightSelectedTextForProofs 함수를 따로 만듦 (분리함) ... . ㅎㅎ (2026/5/5 24:53:54) 흠... ㅎㅎ
(... 두 함수의 내부 코드엔 거의 차이가 없어서 (딱 하나, 'AddReferenceForReferences'와 'AddReferenceForProofs'의 차이밖에 없음 (2026/5/5 25:27:01)) , 하나로 합치려면 합칠 수도 있을 것 같긴 한데... ㅋㅋㅋㅎ... (2026/5/5 24:54:18) 흠... ㅎㅎ))
*/
{
    const index = ReferenceIdLowerCaseList.indexOf(text.toLowerCase()); //(2026/5/5 24:44:16)
    if(index !== -1)
    {
        return `<span onclick="AddReferenceForReferences(this, ${index.toString()})" style="color: blue; cursor: pointer;">${text}</span>`; //(오오, 이전에 골머리를 앓았던, onclick 안의 함수에 문자열 입력값을 넣을 때의 escaping 문제, ... 가 눈 녹듯 사라졌네..! ㅎㅎ (2026/5/5 25:04:35) 오오..! ㅎㅎ 흠 ㅎㅎ)
    }
    else
    {
        return `<span style="color: darkblue;">${text}</span>`; //(2026/5/5 25:05:47)
    }
}
//(2026/5/5 25:05:53)



const ReferenceContentList = new Array(NumOfRefs); //각 reference에 들어 있는 내용 (content (여러 개이진 않고 한 reference에 대한 내용이므로 content's'가 아님)) 을 모두 백업해 놓는 리스트. (추후엔 클래스가 def, thm 등인 element들 안에도 RecallBox를 삽입하고, 그 안에 다시 reference를 중첩해서 켤 수 있도록 할 것이기 때문... .) ㅎㅎ (2026/5/5 17:32:37) 흠... ㅎㅎ



let ref; //(중복 계산 방지용 변수이기도 하고, 코드의 가독성을 위한 것도 있음 (2026/5/3 17:13:55))
let k3;

for(k3 = 0; k3 < NumOfRefs; k3++)
{
    ref = ReferenceElementList[k3]; //(중복 계산 방지용 / 가독성용 변수 (2026/5/3 17:14:24))

    ReferenceIdList[k3] = ref.id; //(2026/5/3 16:43:09) (2026/5/3 17:14:35에 수정함)
    ReferenceIdLowerCaseList[k3] = ref.id.toLowerCase(); //(이것도 ref.id와 ReferenceIdList[k3] 중 고민하다가 그냥 ref.id를 씀 (2026/5/5 17:43:49))
}
//(HighlightSelectedTextForReferences 함수를 사용하려면, 일단 ReferenceIdLowerCaseList가 전부 준비되어 있어야 해서 이 반복문은 따로 분리했음 (분리해야 했음) ... . ㅎㅎ (2026/5/5 25:18:45) 흠... ㅎㅎ)
//(2026/5/5 25:15:03)

for(k3 = 0; k3 < NumOfRefs; k3++)
{
    ref = ReferenceElementList[k3]; //(2026/5/5 25:17:25)

    ref.innerHTML = '<span style="font-size: 20px"><b>' + FullNameOfClassForRefs(ref.className) + '.</b> (' + ref.id + ')</span> <br><br> ' //(ref.id를 쓸지 ReferenceIdList[k3]를 쓸지 (뭐가 더 빠를지, ...) 고민했는데, 일단 그냥 ref.id를 씀 (2026/5/3 17:16:54)) (2026/5/3 18:03:49에 '<br>'을 '<br><br>'로 바꿈)
        + ref.innerHTML.replace(/\[\[(.*?)\]\]/g, (match, inner) => HighlightSelectedTextForReferences(inner)) //(2026/5/5 25:10:03)
        + '<div class="RecallBox"></div>'; //(2026/5/5 25:50:04)
    //(ref.id를 쓸지 ReferenceIdList[k3]를 쓸지 (뭐가 더 빠를지, ...) 고민했는데, 일단 그냥 ref.id를 씀 (2026/5/3 17:16:54))

    ReferenceContentList[k3] = ref.innerHTML; //(위에서 계산한 문자열을 바로 ReferenceContentList[k3]에 넣고, 그 뒤에 'ref.innerHTML = ReferenceContentList[k3];'을 하는 게 더 나을까... 하는 생각도 했지만, ref.innerHTML을 다시 불러오는 게 그렇게 시간이 많이 걸리지는 않을 것 같다는 생각이 있었고, 또한 ref.innerHTML에 한 번 집어넣어서 HTML 파싱을 하는 등 뭔가 처리를 거친 후에 (?) (처리가 끝난 후) 다시 그걸 불러와서 ReferenceContentList[k3]에 저장해 두는 게 (아마) 살짝 더 나을 것 같다고 생각했음... . ㅎㅎ (2026/5/5 25:40:21) 흠... ㅎㅎ)
}
//(2026/5/5 25:50:13)




//------------------------------------------------ (2026/5/3 16:33:43)
//(구분선 위쪽: 각 definition, theorem, ... 등 reference로 사용되는 것들의 innerHTML을 좀 편집하는 코드,
//구분선 아래쪽: 모두 클래스가 proof인 element의 내부를 편집하는 코드. ㅎㅎ (2026/5/3 18:26:01) 흠 ㅎㅎ)




const WrapperList = document.getElementsByClassName("proof"); //(2026/5/2 23:51:04)
const NumOfProofs = WrapperList.length; //(2026/5/2 23:52:40)
const ProofList = new Array(NumOfProofs); //(2026/5/2 24:14:44)
const ProofLenList = new Array(NumOfProofs); //(2026/5/2 24:28:00) (... (중복 계산 방지를 위한) 이런 배열을 굳이 만들 필요는 없..나..? (그냥 매번 ProofList[k1].length를 쓰면 되나..?) ... ㅎㅎ (2026/5/2 25:42:13) 흠... ㅎㅎ)
const CurrentPageNumList = new Array(NumOfProofs); //(2026/5/2 27:23:14)



function HighlightSelectedTextForProofs(text) /*
이중 대괄호 ('[[]]') 안에 적은, 선택된 (selected) 텍스트를
· (reference를 연결하고 파랗게 칠하(고 마우스 포인터를 올렸을 때 모양을 클릭하는 모양으로 바꾸)거나,
· (연결할 수 있는 reference가 없으면) 약간 어둡게 파랗게 칠함 (그리고 마우스 포인터를 올렸을 때 모양을 바꾸지 않음) 으로써)
highlight하는 함수. (2026/5/5 24:38:57)
(원래는 함수명을 그냥 HighlightSelectedText라고 지으려고 했는데, 생각해 보니 reference 버전과 proof 버전을 따로 만들어야 할 것 같아서 HighlightSelectedTextForReferences 함수와 HighlightSelectedTextForProofs 함수를 따로 만듦 (분리함) ... . ㅎㅎ (2026/5/5 24:53:54) 흠... ㅎㅎ
(... 두 함수의 내부 코드엔 거의 차이가 없어서 (딱 하나, 'AddReferenceForReferences'와 'AddReferenceForProofs'의 차이밖에 없음 (2026/5/5 25:27:12)) , 하나로 합치려면 합칠 수도 있을 것 같긴 한데... ㅋㅋㅋㅎ... (2026/5/5 24:54:18) 흠... ㅎㅎ))
*/
{
    const index = ReferenceIdLowerCaseList.indexOf(text.toLowerCase()); //(2026/5/5 24:44:16)
    if(index !== -1)
    {
        return `<span onclick="AddReferenceForProofs(this, ${index.toString()})" style="color: blue; cursor: pointer;">${text}</span>`; //(오오, 이전에 골머리를 앓았던, onclick 안의 함수에 문자열 입력값을 넣을 때의 escaping 문제, ... 가 눈 녹듯 사라졌네..! ㅎㅎ (2026/5/5 25:04:35) 오오..! ㅎㅎ 흠 ㅎㅎ)
    }
    else
    {
        return `<span style="color: darkblue;">${text}</span>`; //(2026/5/5 25:05:47)
    }
}
//(2026/5/5 25:05:53)



let temp1; //주어진 증명에서, 사용된 definition, theorem, ... 등의 reference들을 marking, highlighting, ... 하는 과정에서 사용하는 임시 변수 (2026/5/3 18:21:12)
//let temp2; //(중복 계산 방지용 변수, 문자열을 담음 (2026/5/3 19:12:59))
let k1, k2;

//<div class="proof">(...)</div> 안에 적힌 증명 읽어서 가져오기 (2026/5/2 25:43:15)
for(k1 = 0; k1 < NumOfProofs; k1++)
{
    ProofList[k1] = WrapperList[k1].innerHTML.replace(/\[\[(.*?)\]\]/g, (match, inner) => HighlightSelectedTextForProofs(inner)).split("@@"); //(2026/5/5 25:30:55)
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

        <div class="RecallBox"></div>`; //(2026/5/4 19:48:56) (원래 이 RecallBox 직전에 '<br>' (개행) 이 하나 있었는데, 이제부터는 RecallBox 안에 reference가 하나라도 있으면 자동으로 맨 위에 '<br>' (개행) 을 삽입하게 되면서 이를 제거함 (2026/5/7 17:29:51))
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




//------------------------------------------------ (2026/5/4 20:21:42)
//(구분선 (바로) 위쪽: 클래스가 proof인 element의 내부를 편집하는 코드,
//구분선 아래쪽: (reference 안에 있거나 proof (클래스가 proof인 element) 안에 있는,) 클래스가 RecallBox인 element의 내부를 편집하는 코드 (2026/5/5 26:40:58))




function AddReferenceForReferences(ClickedText, ReferenceIndex) //(reference (definition, theorem, ...) 상자 안에서 다시 reference 추가하기 (2026/5/5 23:52:22))
//ClickedText는 클릭된 그 텍스트가 담긴 <span> 태그의 element를 의미하고, ReferenceIndex는 ReferenceElementList (혹은 ReferenceIdLowerCaseList) 기준으로 몇 번째 reference를 추가할 것인지를 의미함... . ㅎㅎ (2026/5/5 24:03:46) 흠 ㅎㅎ
{
    const box = ClickedText.parentElement.querySelector(".RecallBox"); /*클릭된 텍스트 (ClickedText라는 element) 가 들어 있는 reference 안에 들어 있는 클래스가 RecallBox인 (유일한) element를 찾아내는 코드. ㅎㅎ
    (ChatGPT에게 물어보니, (여러 개의 element에서 ID를 동일하게 "RecallBox"로 주는 건 안 되고, 여러 개의 element들에서 클래스를 모두 "RecallBox"로 준 후) 이렇게 하거나 아니면 그냥
    const box = ClickedText.parentElement.getElementsByClassName("RecallBox")[0];
    과 같이 짜는 게 가장 좋고 common하다고 해서 그렇게 짬... . ㅎㅎ)
    (2026/5/5 25:54:38) 오... ㅎㅎ 흠... ㅎㅎ
    */
    
    if(box.childElementCount === 0)
    {
        box.innerHTML = "<br>";
    }
    //(2026/5/7 15:34:18)
    //RecallBox 안에 reference가 하나도 없으면 (그리고 '<br>' (개행) 도 하나도 없으면) (이를 'box.childElementCount === 0'으로 판정함) , 아래 코드를 실행하기 전에 우선 '<br>' (개행) 을 하나 붙여 주는 코드. ㅎㅎ (2026/5/7 17:31:46) 흠 ㅎㅎ
    
    const temp = `<div>
            <div class="${ReferenceElementList[ReferenceIndex].className}">
                ${ReferenceContentList[ReferenceIndex]}
            </div>
            <div style="text-align: right;">
                <button onclick="DeleteReference(this)" style="cursor: pointer; margin: 5px;">Delete ↑</button>
            </div>
        </div> `; //(2026/5/5 26:04:22)
    
    /*
    const temp = `<div class="${ReferenceElementList[ReferenceIndex].className}">
            ${ReferenceContentList[ReferenceIndex]}
            <div style="text-align: right;">
                <button onclick="DeleteReference(this)" style="cursor: pointer; margin: 5px;">Delete</button>
            </div>
        </div> `; //(2026/5/5 26:06:23)
    //이렇게 'Delete' 버튼을 definition, theorem, ... 상자 (직사각형) 안에 배치하도록 짤 수도 있을 듯..? ... ㅎㅎ (2026/5/5 26:07:16) 흠... ㅎㅎ
    */



    box.innerHTML = "<br>" + temp + box.innerHTML.slice(4); //(2026/5/5 26:08:57) (2026/5/7 15:37:43에 수정함 (코드가 살짝 복잡해 보이기도 하지만, 이렇게 하는 것보다 더 좋은 방법은 떠올리지 못했음... (2026/5/7 17:32:26)))
    
    MathJax.typesetPromise([box.firstElementChild.firstElementChild]); /*(box라는 element 안에서, 방금 추가한 reference 안쪽만 수식을 재렌더링하는 코드. ㅎㅎ (
    · box.firstElementChild는 temp에 적혀 있는 내용과 같은, 실제 reference 내용과 'Delete ↑' 버튼을 모두 포함하는 element를 의미하고,
    · box.firstElementChild.firstElementChild는 temp에 적혀 있는 element의 첫 번째 child element인, 클래스가 def 혹은 thm 혹은 ... 인 element, 즉 reference 자체를 의미한다.)
    (2026/5/5 26:53:20) 오오..! ㅎㅎ 흠 ㅎㅎ)*/

    /*
    참고: 위 코드는 reference들을 (추가한 순서에 따라) 아래에서 위로 출력하는 코드이다. 만약 reference를 (추가한 순서에 따라) 위에서 아래로 출력하고 싶다면,
        box.innerHTML = box.innerHTML + temp;
        MathJax.typesetPromise([box.lastElementChild.firstElementChild]);
    혹은
        box.innerHTML += temp;
        MathJax.typesetPromise([box.lastElementChild.firstElementChild]);
    라는 코드를 사용하면 된다. ㅎㅎ
    (원래는 2026/5/4 21:14:00에 썼던 주석을, 2026/5/5 26:09:48에 수정해서 재사용함)
    (2번의 'MathJax.typesetPromise([box.lastElementChild.firstElementChild]);'는 2026/5/5 26:57:31에 추가함)
    오오..! ㅎㅎ 흠 ㅎㅎ

    (참고 (2026/5/7 17:33:30) : 아래에서 위로 출력할 시의 코드가 'box.innerHTML = "<br>" + temp + box.innerHTML.slice(4);'로 변경되었지만,
    (RecallBox가 reference를 하나라도 갖고 있을 경우 RecallBox 안 (innerHTML) 의 맨 위 (혹은 맨 앞, 혹은 문자열상 맨 왼쪽) 에 '<br>' (개행) 을 덧붙여 놓기 때문에,)
    위에서 아래로 출력할 시의 코드는 그대로 'box.innerHTML += temp;'임... . ㅎㅎ
    (2026/5/7 17:36:45) 오... ㅎㅎ 흠... ㅎㅎ)
    */
}
//(... 중복 계산 방지를 위해 ReferenceElementList[k3].className, ... 도 모두 미리 계산해서 array에 저장해 놓고, ... 할 필요는 없겠..지..? ... ㅋㅋㅋㅋ (2026/5/5 26:02:02) 흠... ㅎㅎ)
//(2026/5/7 15:39:04)



function AddReferenceForProofs(ClickedText, ReferenceIndex) //(proof 안의 텍스트를 눌렀을 때 reference 추가하기 (2026/5/5 23:57:38))
//ClickedText는 클릭된 그 텍스트가 담긴 <span> 태그의 element를 의미하고, ReferenceIndex는 ReferenceElementList (혹은 ReferenceIdLowerCaseList) 기준으로 몇 번째 reference를 추가할 것인지를 의미함... . ㅎㅎ (2026/5/5 24:03:46) 흠 ㅎㅎ
{
    const box = ClickedText.parentElement.parentElement.parentElement.querySelector(".RecallBox"); /*
    · 클릭된 텍스트 (ClickedText라는 element)
    · 가 들어 있는 ArgumentBox (이때 '.parentElement'가 2번 필요함)
    · 가 들어 있는, 클래스가 proof인 element (이때 '.parentElement'가 1번 필요함)
    · 의 안에 들어 있는, 클래스가 RecallBox인 (유일한) element
    를 찾아내는 코드 (2026/5/5 26:15:32)*/

    if(box.childElementCount === 0)
    {
        box.innerHTML = "<br>";
    }
    //(2026/5/7 15:34:18)
    //RecallBox 안에 reference가 하나도 없으면 (그리고 '<br>' (개행) 도 하나도 없으면) (이를 'box.childElementCount === 0'으로 판정함) , 아래 코드를 실행하기 전에 우선 '<br>' (개행) 을 하나 붙여 주는 코드. ㅎㅎ (2026/5/7 17:31:46) 흠 ㅎㅎ

    const temp = `<div>
            <div class="${ReferenceElementList[ReferenceIndex].className}">
                ${ReferenceContentList[ReferenceIndex]}
            </div>
            <div style="text-align: right;">
                <button onclick="DeleteReference(this)" style="cursor: pointer; margin: 5px;">Delete ↑</button>
            </div>
        </div> `; //(2026/5/5 26:04:22)
    
    /*
    const temp = `<div class="${ReferenceElementList[ReferenceIndex].className}">
            ${ReferenceContentList[ReferenceIndex]}
            <div style="text-align: right;">
                <button onclick="DeleteReference(this)" style="cursor: pointer; margin: 5px;">Delete</button>
            </div>
        </div> `; //(2026/5/5 26:06:23)
    //이렇게 'Delete' 버튼을 definition, theorem, ... 상자 (직사각형) 안에 배치하도록 짤 수도 있을 듯..? ... ㅎㅎ (2026/5/5 26:07:16) 흠... ㅎㅎ
    */



    box.innerHTML = "<br>" + temp + box.innerHTML.slice(4); //(2026/5/5 26:08:57) (2026/5/7 15:37:43에 수정함 (코드가 살짝 복잡해 보이기도 하지만, 이렇게 하는 것보다 더 좋은 방법은 떠올리지 못했음... (2026/5/7 17:32:26)))
    
    MathJax.typesetPromise([box.firstElementChild.firstElementChild]); /*(box라는 element 안에서, 방금 추가한 reference 안쪽만 수식을 재렌더링하는 코드. ㅎㅎ (
    · box.firstElementChild는 temp에 적혀 있는 내용과 같은, 실제 reference 내용과 'Delete ↑' 버튼을 모두 포함하는 element를 의미하고,
    · box.firstElementChild.firstElementChild는 temp에 적혀 있는 element의 첫 번째 child element인, 클래스가 def 혹은 thm 혹은 ... 인 element, 즉 reference 자체를 의미한다.)
    (2026/5/5 26:53:20) 오오..! ㅎㅎ 흠 ㅎㅎ)*/

    /*
    참고: 위 코드는 reference들을 (추가한 순서에 따라) 아래에서 위로 출력하는 코드이다. 만약 reference를 (추가한 순서에 따라) 위에서 아래로 출력하고 싶다면,
        box.innerHTML = box.innerHTML + temp;
        MathJax.typesetPromise([box.lastElementChild.firstElementChild]);
    혹은
        box.innerHTML += temp;
        MathJax.typesetPromise([box.lastElementChild.firstElementChild]);
    라는 코드를 사용하면 된다. ㅎㅎ
    (원래는 2026/5/4 21:14:00에 썼던 주석을, 2026/5/5 26:09:48에 수정해서 재사용함)
    (2번의 'MathJax.typesetPromise([box.lastElementChild.firstElementChild]);'는 2026/5/5 26:57:31에 추가함)
    오오..! ㅎㅎ 흠 ㅎㅎ

    (참고 (2026/5/7 17:33:30) : 아래에서 위로 출력할 시의 코드가 'box.innerHTML = "<br>" + temp + box.innerHTML.slice(4);'로 변경되었지만,
    (RecallBox가 reference를 하나라도 갖고 있을 경우 RecallBox 안 (innerHTML) 의 맨 위 (혹은 맨 앞, 혹은 문자열상 맨 왼쪽) 에 '<br>' (개행) 을 덧붙여 놓기 때문에,)
    위에서 아래로 출력할 시의 코드는 그대로 'box.innerHTML += temp;'임... . ㅎㅎ
    (2026/5/7 17:36:45) 오... ㅎㅎ 흠... ㅎㅎ)
    */
}
//(코드가 box를 계산하는 코드 이외엔 정확히 똑같지만, 추후에 definition, theorem, ... 안에서 reference를 띄울 때와 proof 안에서 reference를 띄울 때의 behavior를 다르게 만들고, ... 할 수도 있으니 (?) 일단은 AddReferenceForReferences 함수와 AddReferenceForProofs 함수를 (두 개의 함수로) 완전히 분리해 놓음... . ㅎㅎ (2026/5/5 26:19:31) 흠... ㅎㅎ)
//(2026/5/7 15:39:19)



function DeleteReference(ClickedButton) //ClickedButton은 클릭된 그 'Delete ↑' 버튼 (element) 자체를 의미함 (2026/5/5 26:21:30)
{
    const reference = ClickedButton.parentElement.parentElement; //(중복 계산 방지용 변수 (2026/5/7 13:25:42))
    const box = reference.parentElement; //(그 reference가 담긴 RecallBox를 의미함, 중복 계산 방지용 변수 (2026/5/7 13:27:21))

    if(box.childElementCount === 2) //(2026/5/7 17:24:26)
    //(box를 정의하지 않았을 경우) 이게 반드시 'reference.remove();'보다 먼저 실행되어야 하므로, 그냥 'reference.remove();'를 실행하기 이전에 'remove 후에는 reference가 하나도 안 남을 것인가'를 판정해서 동작하도록 함. ㅎㅎ (2026/5/7 17:26:22)
    //(참고로, '남은 reference 개수가 1개인가'는 ('box.childElementCount === 1'이 아니라) 'box.childElementCount === 2'와 동치임. 이는 (reference가 하나라도 적혀 있을 경우 맨 앞에 붙이는) '<br>' (개행) 도 하나의 child element로 간주되기 때문임... . (...) (2026/5/7 17:27:56) 흠.... ㅎㅎ (더 좋은 방법은 딱히 떠오르지 않았음... ㅋㅋㅋㅋ (2026/5/7 17:44:17) 흠... ㅎㅎ))
    {
        box.innerHTML = ""; //(2026/5/7 13:27:41) (이때 '<br>' (개행) 이 사라지면서, 남아 있던 한 빈 줄이 사라져서 definition / theorem / ... 이 적힌 상자 (직사각형) 나 proof가 불필요한 공백이 없는 깔끔한 모습이 됨 (2026/5/7 17:42:07))
    }
    else
    {
        reference.remove(); //(2026/5/7 13:27:55)
    }
}
//(2026/5/7 17:28:02)