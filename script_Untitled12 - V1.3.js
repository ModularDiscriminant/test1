//2026/5/2
//(이 문서 만든 시각: 2026/5/2 19:55:36)



const WrapperList = document.getElementsByClassName("proof"); //(2026/5/2 23:51:04)
const NumOfProofs = WrapperList.length; //(2026/5/2 23:52:40)
const ProofList = new Array(NumOfProofs); //(2026/5/2 24:14:44)
const ProofLenList = new Array(NumOfProofs); //(2026/5/2 24:28:00) (... (중복 계산 방지를 위한) 이런 배열을 굳이 만들 필요는 없..나..? (그냥 매번 ProofList[k1].length를 쓰면 되나..?) ... ㅎㅎ (2026/5/2 25:42:13) 흠... ㅎㅎ)



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
            + '<div class="box2" style="grid-area: CurrentPage"> '
                + 'Current Page: 1/' + ProofLenList[k1].toString()
            + '</div> '

            + '<div class="box2" style="grid-area: GoToPage"> '
                + '<label for="PageNum">Go to Page</label> &nbsp; '
                + '<input type="number" id="PageNum" style="width: 50px"></input> &nbsp;&nbsp;&nbsp;&nbsp; '
                + '<button onclick="ChangePage()" style="cursor: pointer">&nbsp;&nbsp;Go&nbsp;&nbsp;</button> '
            + '</div> '

            + '<button class="ButtonBox" style="grid-area: PrevButton" onclick="PrevPage()"> '
                + '← Previous '
            + '</button> '

            + '<button class="ButtonBox" style="grid-area: NextButton" onclick="NextPage()"> '
                + 'Next → '
            + '</button> '

            + '<div class="box1" style="grid-area: StatusAndGoal"> '
                + ProofList[k1][0][0]
            + '</div> '

            + '<div class="box1" style="grid-area: ExampleStatusAndGoal"> '
                + ProofList[k1][0][1]
            + '</div> '

            + '<div class="box1" style="grid-area: Argument"> '
                + ProofList[k1][0][2]
            + '</div> '

            + '<div class="box1" style="grid-area: ExampleArgument"> '
                + ProofList[k1][0][3]
            + '</div> '
        + '</div> '

        + '<br> '
        + '<div class="RecallBox"></div> '; //(2026/5/2 26:31:15)
}



//const PageNumInput = document.getElementById("PageNum"); //(2026/5/2 20:59:59)

function ChangePage()
{

}

function PrevPage()
{

}

function NextPage()
{

}