// fetch를 사용하여 server에 데이터를 요청하기 위해 별도의 함수를 선언
const order_input = (table_id, menu_id) => {
  // path varriable 방식으로 menu_id 값을 URL에 포함하여 getter 요청하기

  /**
   * 만약 3번 테이블에 5번 메뉴를 추가하려고 Request를 한다면
   * 'localhost:3000/order/3/input/5'와 같은 URL을 만들어 서버로 Request한다.
   * 이런 식으로 만드는 URL 방식을 RESTfull 요청 이라고 한다.
   */
  fetch(`/pos/order/${table_id}/input/${menu_id}`)
    .then((res) => res.json())
    .then((result) => console.log(result));
};

document.addEventListener("DOMContentLoaded", () => {
  // 현재 화면이 열리면(주문화면이 열리면) table_id 값을 추출하기 위하여
  // article.order_list에서 dataset을 추출하여 변수에 담기
  const order_article = document.querySelector("article.order_list");
  const table_id = order_article.dataset.table_id;

  // article.product_list의 div.menu가 클릭되면 할 일 지정
  const product_article = document.querySelector("article.product_list");

  // product_article이 있으면
  if (product_article) {
    product_article.addEventListener("click", (e) => {
      const target = e.target;

      // index.pug의 table layout click 설정
      if (target.tagName === "DIV" && target.className.includes("menu")) {
        const menu_id = target.dataset.menu_id;
        // alert(menu_id + " 선택");

        // document.location.href = `/pos/order/input/${menu_id}`;

        // fetch 전송을 위한 함수 호출
        order_input(table_id, menu_id);
      }
    });
  }
});
