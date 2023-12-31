/*
[문제 설명]
프로그래머스 팀에서는 기능 개선 작업을 수행 중입니다. 각 기능은 진도가 100%일 때 서비스에 반영할 수 있습니다.
또, 각 기능의 개발속도는 모두 다르기 때문에 뒤에 있는 기능이 앞에 있는 기능보다 먼저 개발될 수 있고, 이때 뒤에 있는 기능은 앞에 있는 기능이 배포될 때 함께 배포됩니다.
먼저 배포되어야 하는 순서대로 작업의 진도가 적힌 정수 배열 progresses와 각 작업의 개발 속도가 적힌 정수 배열 speeds가 주어질 때 각 배포마다 몇 개의 기능이 배포되는지를 return 하도록 solution 함수를 완성하세요.

[제한 사항]
- 작업의 개수(progresses, speeds배열의 길이)는 100개 이하입니다.
- 작업 진도는 100 미만의 자연수입니다.
- 작업 속도는 100 이하의 자연수입니다.
- 배포는 하루에 한 번만 할 수 있으며, 하루의 끝에 이루어진다고 가정합니다. 예를 들어 진도율이 95%인 작업의 개발 속도가 하루에 4%라면 배포는 2일 뒤에 이루어집니다.
*/

// 풀이 1
function solution(progresses, speeds) {
  // 남은 진도율 구하기
  let remains = [];
  for (const progress of progresses) {
    remains.push(100 - progress);
  }

  // 배포까지 걸리는 일수 구하기
  let days = [];
  for (let i = 0; i < remains.length; i++) {
    for (let j = 0; j < speeds.length; j++) {
      if (i === j) {
        const day = Math.ceil(remains[i] / speeds[j]);

        // 배포까지 걸리는 일수 삽입
        days.push(day);
      }
    }
  }

  // 정답 구하기
  let answer = [];
  let maxDay = days[0];
  let count = 1;
  for (let i = 1; i < days.length; i++) {
    if (maxDay < days[i]) {
      maxDay = days[i];
      answer.push(count);
      count = 1;
    } else {
      count++;
    }
  }
  answer.push(count);
  return answer;
}

// 풀이 2
function solution(progresses, speeds) {
  let answer = [0];

  let days = progresses.map((progress, index) =>
    Math.ceil((100 - progress) / speeds[index])
  );

  let maxDay = days[0];
  for (let i = 0, j = 0; i < days.length; i++) {
    if (days[i] <= maxDay) {
      answer[j]++;
    } else {
      maxDay = days[i];
      answer[++j] = 1;
    }
  }
  return answer;
}
