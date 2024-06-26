/*
[문제 설명]
길이가 같은 배열 A, B 두개가 있습니다. 각 배열은 자연수로 이루어져 있습니다.
배열 A, B에서 각각 한 개의 숫자를 뽑아 두 수를 곱합니다. 이러한 과정을 배열의 길이만큼 반복하며, 두 수를 곱한 값을 누적하여 더합니다. 
이때 최종적으로 누적된 값이 최소가 되도록 만드는 것이 목표입니다. (단, 각 배열에서 k번째 숫자를 뽑았다면 다음에 k번째 숫자는 다시 뽑을 수 없습니다.)

예를 들어 A = [1, 4, 2] , B = [5, 4, 4] 라면

 - A에서 첫번째 숫자인 1, B에서 첫번째 숫자인 5를 뽑아 곱하여 더합니다. (누적된 값 : 0 + 5(1x5) = 5)
 - A에서 두번째 숫자인 4, B에서 세번째 숫자인 4를 뽑아 곱하여 더합니다. (누적된 값 : 5 + 16(4x4) = 21)
 - A에서 세번째 숫자인 2, B에서 두번째 숫자인 4를 뽑아 곱하여 더합니다. (누적된 값 : 21 + 8(2x4) = 29)

즉, 이 경우가 최소가 되므로 29를 return 합니다.
배열 A, B가 주어질 때 최종적으로 누적된 최솟값을 return 하는 solution 함수를 완성해 주세요.

[제한사항]
- 배열 A, B의 크기 : 1,000 이하의 자연수
- 배열 A, B의 원소의 크기 : 1,000 이하의 자연수
*/

// 오답 (시간 초과)
function solution(A, B) {
  let mul = []; // 최솟값 X 최댓값 배열

  while (A.length > 0) {
    let min = Math.min(...A); // A 배열의 최솟값
    let max = Math.max(...B); // B 배열의 최댓값

    mul.push(min * max);

    // 각 배열에서 최솟값과 최댓값 삭제
    A.splice(A.indexOf(min), 1);
    B.splice(B.indexOf(max), 1);
  }

  let answer = 0; // 구하고자 하는 최솟값

  // 누적된 최솟값 구하기
  for (let i = 0; i < mul.length; i++) {
    answer += mul[i];
  }

  return answer;
}

// 정답
function solution(A, B) {
  let answer = 0; // 구하고자 하는 최솟값

  A.sort((a, b) => a - b); // 오름차순 정렬
  B.sort((a, b) => b - a); // 내림차순 정렬

  for (let i = 0; i < A.length; i++) {
    answer += A[i] * B[i]; // 배열 A의 최솟값 * 배열 B의 최댓값
  }

  return answer;
}

// 정답 (reduce 활용하기)
function solution(A, B) {
  A.sort((a, b) => a - b); // 오름차순 정렬
  B.sort((a, b) => b - a); // 내림차순 정렬

  return A.reduce((acc, cur, index) => acc + cur * B[index], 0);
}
