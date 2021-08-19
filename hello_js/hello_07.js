let 주소록 = [
  { 이름: "홍길동", 전화: "1111", 주소: "서울시", 나이: 33 },
  { 이름: "이몽룡", 전화: "1112", 주소: "익산시", 나이: 21 },
  { 이름: "성춘향", 전화: "1113", 주소: "서울시", 나이: 18 },
];
console.table(주소록);

주소록.forEach((주소) => {
  if (주소.이름 === "이몽룡") {
    console.log(주소);
  }
});

let MZ세대 = 주소록.filter((주소) => {
  return 주소.나이 < 30;
});
console.table(MZ세대);

// 주소록 객체배열에 생년 칼럼을 추가하고 데이터를 포함하여 생년월일 배열을 만들기
let 생년월일 = 주소록.map((주소) => {
  return { ...주소, 생년: 2021 - 주소.나이 + 1 };
});
console.table(생년월일);

/**
 * 전개 연산자 spread 연산자
 *
 * 배열, 객체를 복사 연산 수행할 때 자기 자신의 전체를 나타내는 연산자
 *
 */
let 주소 = { 이름: "홍길동", 전화: "111", 나이: 33 };
// 주소 객체에 새로운 요소를 추가하여 새로운 객체로 복제하고자 할 때
let 새객체 = 주소;
새객체.생년 = 1999;
console.table(새객체);

// 일단 주소 객체 전체를 펼쳐두고(spread)
// 새로운 생년 요소를 추가하고 값을 2000으로 설정한 후
// 그 결과를 새객체2에 저장
let 새객체2 = { ...주소, 생년: 2001 };
console.table(새객체2);

// 주소객체의 이름 요소의 값을 이몽룡으로 변경하고 새객체3에 저장하라
let 새객체3 = { ...주소, 이름: "이몽룡" };
console.table(주소);
console.table(새객체3);
