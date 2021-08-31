// fetch를 통해서 되돌려받은 주문리스트를 왼쪽의 주문리스트에 표시하기
const add_order_list = (menu_list) => {
  const order_box = document.querySelector("article.order_list");

  // 리스트가 중복되어 표시되는 것을 방지하기 위하여 기존의 div.order_list가 있는 지 확인하고
  // div.order_list를 가져와서 전체를 article.order_list로부터 삭제하기
  let order_list = document.querySelectorAll("div.order_list");
  // order_list가 있으면 list를 삭제한다.
  if (order_list) {
    // order_list가 forEach를 반복하면서 order_tag에 담기고 order_box에 있는 order_tag를 하나씩 지운다...?
    order_list.forEach((order_tag) => {
      order_box.removeChild(order_tag);
    });
  }

  const orders = menu_list.map((menu, index) => {
    // div.order_list 생성
    order_list = document.createElement("div");
    order_list.classList.add("order_list");

    // div.menu_id 생성
    const menu_id = document.createElement("div");
    menu_id.classList.add("menu_id");
    menu_id.innerText = menu.to_pcode;

    // div.menu_name 생성
    const menu_name = document.createElement("div");
    menu_name.classList.add("menu_name");
    // menu_name.innerText = menu.p_name;

    // div.menu_qty 생성
    const menu_qty = document.createElement("div");
    menu_qty.classList.add("menu_qty");
    menu_qty.innerText = 1;

    // div.menu_price 생성
    const menu_price = document.createElement("div");
    menu_price.classList.add("menu_price");
    menu_price.innerText = menu.to_price;

    order_list.appendChild(menu_id);
    order_list.appendChild(menu_name);
    order_list.appendChild(menu_qty);
    order_list.appendChild(menu_price);

    // order_box.appendChild(order_list);
    return order_list;
  });
  order_box.append(...orders);
};

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
    .then((result) => {
      add_order_list(result.order_list);
    });
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

  // 주문서 화면이 열릴 때 서버로부터 table에 주문내역이 있으면 가져와서 보여라
  fetch(`/pos/getorder/${table_id}`)
    .then((res) => res.json())
    .then((result) => {
      add_order_list(result);
    });
});
