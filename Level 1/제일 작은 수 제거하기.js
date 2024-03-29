/*
[문제 설명]
정수를 저장한 배열, arr 에서 가장 작은 수를 제거한 배열을 리턴하는 함수, solution을 완성해주세요. 
단, 리턴하려는 배열이 빈 배열인 경우엔 배열에 -1을 채워 리턴하세요. 

예를들어 arr이 [4,3,2,1]인 경우는 [4,3,2]를 리턴 하고, [10]면 [-1]을 리턴 합니다.

[제한 조건]
- arr은 길이 1 이상인 배열입니다.
- 인덱스 i, j에 대해 i ≠ j이면 arr[i] ≠ arr[j] 입니다.
*/

// 풀이 1
function solution(arr) {
  if (arr.length === 1) {
    return (arr = [-1]); // 배열의 요소가 하나일 떼
  } else {
    let min = Math.min(...arr); // 배열에서 최솟값 찾기
    arr.splice(arr.indexOf(min), 1); // 최솟값의 인덱스를 찾아서 해당 요소 삭제
  }

  return arr;
}

// 풀이 2
function solution(arr) {
  let min = Math.min(...arr); // 최솟값 찾기
  return arr.length === 1 ? [-1] : arr.filter((v) => v !== min); // filter를 활용하여 최솟값이 아닌 요소만 남기기
}
