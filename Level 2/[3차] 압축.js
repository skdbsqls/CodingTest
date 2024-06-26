/*
[문제 설명]
신입사원 어피치는 카카오톡으로 전송되는 메시지를 압축하여 전송 효율을 높이는 업무를 맡게 되었다. 메
시지를 압축하더라도 전달되는 정보가 바뀌어서는 안 되므로, 압축 전의 정보를 완벽하게 복원 가능한 무손실 압축 알고리즘을 구현하기로 했다.

어피치는 여러 압축 알고리즘 중에서 성능이 좋고 구현이 간단한 LZW(Lempel–Ziv–Welch) 압축을 구현하기로 했다. 
LZW 압축은 1983년 발표된 알고리즘으로, 이미지 파일 포맷인 GIF 등 다양한 응용에서 사용되었다.

LZW 압축은 다음 과정을 거친다.

 1. 길이가 1인 모든 단어를 포함하도록 사전을 초기화한다.
 2. 사전에서 현재 입력과 일치하는 가장 긴 문자열 w를 찾는다.
 3. w에 해당하는 사전의 색인 번호를 출력하고, 입력에서 w를 제거한다.
 4. 입력에서 처리되지 않은 다음 글자가 남아있다면(c), w+c에 해당하는 단어를 사전에 등록한다.
 5. 단계 2로 돌아간다.

압축 알고리즘이 영문 대문자만 처리한다고 할 때, 사전은 다음과 같이 초기화된다. 사전의 색인 번호는 정수값으로 주어지며, 1부터 시작한다고 하자.

예를 들어 입력으로 KAKAO가 들어온다고 하자.

 1. 현재 사전에는 KAKAO의 첫 글자 K는 등록되어 있으나, 두 번째 글자까지인 KA는 없으므로, 첫 글자 K에 해당하는 색인 번호 11을 출력하고, 다음 글자인 A를 포함한 KA를 사전에 27 번째로 등록한다.
 2. 두 번째 글자 A는 사전에 있으나, 세 번째 글자까지인 AK는 사전에 없으므로, A의 색인 번호 1을 출력하고, AK를 사전에 28 번째로 등록한다.
 3. 세 번째 글자에서 시작하는 KA가 사전에 있으므로, KA에 해당하는 색인 번호 27을 출력하고, 다음 글자 O를 포함한 KAO를 29 번째로 등록한다.
 4. 마지막으로 처리되지 않은 글자 O에 해당하는 색인 번호 15를 출력한다.

이 과정을 거쳐 다섯 글자의 문장 KAKAO가 4개의 색인 번호 [11, 1, 27, 15]로 압축된다.

[입력 형식]
입력으로 영문 대문자로만 이뤄진 문자열 msg가 주어진다. msg의 길이는 1 글자 이상, 1000 글자 이하이다.

[출력 형식]
주어진 문자열을 압축한 후의 사전 색인 번호를 배열로 출력하라.
*/

function solution(msg) {
  const indexs = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  let result = []; // 압축한 후의 사전 색인 번호
  let w = ""; // 현재 입력
  let c = ""; // 다음 글자

  for (let i = 0; i < msg.length; i++) {
    w = msg[i]; // 현재 입력 글자 추가
    c = msg[i + 1]; // 다음 글자 추가

    // 현재 입력 글자 + 다음 글자가 사전에 등록되어 있지 않은 경우
    if (!indexs.includes(w + c)) {
      let index = indexs.indexOf(w) + 1; // 현재 입력 글자의 색인 번호를 찾아서

      result.push(index); // 결과에 입력
      indexs.push(w + c); // 현재 입력 글자 + 다음 글자 사전에 등록
    }
    // 현재 입력 글자 + 다음 글자가 사전에 등록되어 있는 경우
    else {
      // 현재 입력 글자 + 다음 + 다음 (어디까지 등록되어 있는지 찾기)
      while (indexs.includes(w + c)) {
        w = w + c;
        c = msg[++i + 1];
      }
      let index = indexs.indexOf(w) + 1; // 등록되어 있는 글자의 색인 번호를 찾아서

      result.push(index); // 결과에 입력
      indexs.push(w + c); // 다음 글자 추가해서 사전에 등록
    }
  }

  return result;
}
