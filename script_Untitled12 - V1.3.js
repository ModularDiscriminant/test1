//2026/5/2
//(이 문서 만든 시각: 2026/5/2 19:55:36)



const WrapperList = document.getElementsByClassName("proof"); //(2026/5/2 23:51:04)
const NumOfProofs = WrapperList.length; //(2026/5/2 23:52:40)
const ProofList = new Array(NumOfProofs); //(2026/5/2 24:14:44)
const ProofLenList = new Array(NumOfProofs); //(2026/5/2 24:28:00) (... (중복 계산 방지를 위한) 이런 배열을 굳이 만들 필요는 없..나..? (그냥 매번 ProofList[k1].length를 쓰면 되나..?) ... ㅎㅎ (2026/5/2 25:42:13) 흠... ㅎㅎ)
const CurrentPageNumList = new Array(NumOfProofs); //(2026/5/2 27:23:14)



let k1, k2;

//<div class="proof">(...)</div> 안에 적힌 증명 읽어서 가져오기 (2026/5/2 25:43:15)
for(k1 = 0; k1 < NumOfProofs; k1++)
{
    ProofList[k1] = WrapperList[k1].innerHTML.split("@@"); //(2026/5/2 24:27:23)
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
    //편의상, 가독성을 위해 실제 HTML에서 적을 때와 똑같이 들여쓰기를 해서 적음... . ㅎㅎ (2026/5/2 26:24:39) 흠... ㅎㅎ
    WrapperList[k1].innerHTML = '<h2>Proof.</h2> '
        + '<div class="ArgumentBox"> '
            + '<div class="CurrentPage"> '
                + 'Current Page: 1/' + ProofLenList[k1].toString()
            + '</div> '

            + '<div class="GoToPage"> '
                + '<label for="PageNumInput' + k1.toString() + '">Go to Page</label> &nbsp;&nbsp; ' //(2026/5/2 27:28:23)
                + '<input type="number" id="PageNumInput' + k1.toString() + '" style="width: 50px"></input> &nbsp;&nbsp;&nbsp;&nbsp; ' //(2026/5/2 27:28:23)
                + '<button onclick="ChangePage(' + k1.toString() + ')" style="cursor: pointer">&nbsp;&nbsp;Go&nbsp;&nbsp;</button> ' //(2026/5/2 28:26:52)
            + '</div> '

            + '<button class="PrevButton" onclick="PrevPage(' + k1.toString() + ')"> ' //(2026/5/2 28:27:05)
                + '← Previous '
            + '</button> '

            + '<button class="NextButton" onclick="NextPage(' + k1.toString() + ')"> ' //(2026/5/2 28:27:17)
                + 'Next → '
            + '</button> '

            + '<div class="StatusAndGoal"> '
                + ProofList[k1][0][0]
            + '</div> '

            + '<div class="ExampleStatusAndGoal"> '
                + ProofList[k1][0][2] //(2026/5/2 29:46:26)
            + '</div> '

            + '<div class="Argument"> '
                + ProofList[k1][0][1] //(2026/5/2 29:46:33)
            + '</div> '

            + '<div class="ExampleArgument"> '
                + ProofList[k1][0][3]
            + '</div> '
        + '</div> '

        + '<br> '
        + '<div class="RecallBox"></div> '; //(2026/5/2 26:31:15) (클래스명을 전부 각 칸의 명칭에 맞춰 수정한 시각: 2026/5/2 26:51:05)
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
    ExampleStatusAndGoalElementList[ProofIndex].innerHTML = ProofList[ProofIndex][PageIndex][2]; //(2026/5/2 29:47:24)
                ArgumentElementList[ProofIndex].innerHTML = ProofList[ProofIndex][PageIndex][1]; //(2026/5/2 29:47:31)
         ExampleArgumentElementList[ProofIndex].innerHTML = ProofList[ProofIndex][PageIndex][3];
    //(2026/5/2 28:25:00)

    MathJax.Hub.Queue(["Typeset", MathJax.Hub, WrapperList[ProofIndex]]); //(2026/5/2 29:09:57)
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