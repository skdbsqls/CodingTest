/*
[문제 설명]
한국중학교에 다니는 학생들은 각자 정수 번호를 갖고 있습니다. 
이 학교 학생 3명의 정수 번호를 더했을 때 0이 되면 3명의 학생은 삼총사라고 합니다. 
예를 들어, 5명의 학생이 있고, 각각의 정수 번호가 순서대로 -2, 3, 0, 2, -5일 때, 첫 번째, 세 번째, 네 번째 학생의 정수 번호를 더하면 0이므로 세 학생은 삼총사입니다. 
또한, 두 번째, 네 번째, 다섯 번째 학생의 정수 번호를 더해도 0이므로 세 학생도 삼총사입니다. 
따라서 이 경우 한국중학교에서는 두 가지 방법으로 삼총사를 만들 수 있습니다.

한국중학교 학생들의 번호를 나타내는 정수 배열 number가 매개변수로 주어질 때, 학생들 중 삼총사를 만들 수 있는 방법의 수를 return 하도록 solution 함수를 완성하세요.

[제한사항]
- 3 ≤ number의 길이 ≤ 13
- -1,000 ≤ number의 각 원소 ≤ 1,000
- 서로 다른 학생의 정수 번호가 같을 수 있습니다.
*/

// 조합을 구하는 함수
const getCombinations = (arr, selectNumber) => {
  const results = [];

  if (selectNumber === 1) return arr.map((value) => [value]);

  arr.forEach((fixed, index, origin) => {
    const rest = origin.slice(index + 1);
    const combinations = getCombinations(rest, selectNumber - 1);
    const attached = combinations.map((combination) => [fixed, ...combination]);
    results.push(...attached);
  });

  return results;
};

function solution(number) {
  const result = getCombinations(number, 3); // 배열의 길이가 3인 모든 조합

  let count = 0; // 삼총사의 개수
  for (let i = 0; i < result.length; i++) {
    let sum = result[i].reduce((acc, cur) => acc + cur); // 배열의 길이가 3인 조합의 합
    if (sum === 0) count++; // 0이면 삼총사의 개수 + 1
  }

  return count;
}

// 풀이 2
function solution(number) {
  let count = 0; // 삼총사의 개수

  const combination = (current, start) => {
    // 재귀 종료 조건 (배열의 길이가 3이 되었을 때)
    if (current.length === 3) {
      // 합이 0이면 삼총사의 개수 + 1
      if (current.reduce((acc, cur) => acc + cur) === 0) count++;
      return;
    }

    // number 배열을 돌면서 배열의 길이가 3인 조합을 찾음
    for (let i = start; i < number.length; i++) {
      combination([...current, number[i]], i + 1);
    }
  };

  combination([], 0);
  return count;
}

// 풀이 3
function solution(number) {
  let answer = 0;
  for (let i = 0; i < number.length - 2; i++) {
    for (let j = i + 1; j < number.length - 1; j++) {
      for (let k = j + 1; k < number.length; k++) {
        if (number[i] + number[j] + number[k] === 0) {
          answer++;
        }
      }
    }
  }
  return answer;
}
