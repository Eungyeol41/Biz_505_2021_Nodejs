## nodejs + express 프로젝트 생성 후 할 일

### 1. dependency upgrade

npm install cookie-parser
npm install debug
npm install ejs
npm install express
npm install http-errors
npm install morgan

### 2. mysql 프로젝트에서 필요한 dependency

npm install mysql2
npm install sequelize
npm install moment

## 3. sequelize를 사용한 MySQL DB 생성하기

sequelize init

## 4. sequelize를 사용하여 자동으로 Table create 하기

    sequelize("테이블 이름", {   테이블 칼럼 구조들   })

테이블 이름을 단수로 지정하면 실제 테이블 이름은 복수로 설정되어 만들어진다.

table 생성 ( 시 실제 테이블 이름 )

- tbl_bbs : tbl_bbs
- tbl_replay : tbl_replays
- tbl_reply : tbl_replies

## 5. table과 table을 associate(연관)하여 SELECT를 했을 때

    View에서 처리하는 방법

findOne()을 실행하면서 include로 연관된 list를 포함한다
View에서는 부모 table이 단수 구조이기에 VO.변수 형식으로 출력하고 include된 list는 VO.실제 테이블 이름 list를 forEach로 반복하면서 값을 추출하여 사용해야 한다.

# pug view 만들기

## 보간법

- pug template를 사용하여 서버로부터 전달된 데이터를 rendering하도록 표현하는 문법

- 일반적으로 tag와 함께 : div=변수명
- #{}를 사용하는 방법 : div #{변수명}
- !{}를 사용하는 방법 : div !{변수명}
  변수에 포함된 데이터(문자열)에 HTML Tag가 포함되어 있고 view 화면에서 HTML Tag를 적용하여 보여주고 싶을 때
