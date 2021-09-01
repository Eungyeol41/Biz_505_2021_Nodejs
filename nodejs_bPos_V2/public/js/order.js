// fetch를 통해서 되돌려받은 주문리스트를 왼쪽의 주문리스트에 표시하기
const add_order_list = (order_list) => {
  const order_box = document.querySelector("article.order_list");

  // 리스트가 중복되어 표시되는 것을 방지하기 위하여 기존의 div.order_list가 있는 지 확인하고
  // div.order_list를 가져와서 전체를 article.order_list로부터 삭제하기
  let order_div_list = document.querySelectorAll("div.order_list");
  // order_list가 있으면 list를 삭제한다.
  if (order_div_list) {
    // order_list가 forEach를 반복하면서 order_tag에 담기고 order_box에 있는 order_tag를 하나씩 지운다...?
    order_div_list.forEach((order_tag) => {
      order_box.removeChild(order_tag);
    });
  }

  const total_pay = { count: 0, total: 0 };

  const orders = order_list.map((order, index) => {
    // div.order_list 생성
    order_div_list = document.createElement("div");
    order_div_list.classList.add("order_list");

    // div.menu_id 생성
    const menu_id = document.createElement("div");
    menu_id.classList.add("menu_id");
    menu_id.innerText = order.to_pcode;

    // div.menu_name 생성
    const menu_name = document.createElement("div");
    menu_name.classList.add("menu_name");
    menu_name.innerText = order.tbl_product.p_name;

    // div.menu_qty 생성
    const menu_qty = document.createElement("div");
    menu_qty.classList.add("menu_qty");
    menu_qty.innerText = order.to_qty;

    // div.menu_price 생성
    const menu_price = document.createElement("div");
    menu_price.classList.add("menu_price");
    menu_price.innerText = order.to_price;

    const to_total = order.to_qty * order.to_price;
    const menu_total = document.createElement("div");
    menu_total.classList.add("menu_total");
    menu_total.innerText = to_total;

    total_pay.count++;
    total_pay.total += to_total;

    // 메뉴 삭제
    const menu_delete = document.createElement("div");
    menu_delete.classList.add("menu_delete");
    menu_delete.innerText = "X";
    menu_delete.dataset.order_seq = order.to_seq;

    order_div_list.appendChild(menu_id);
    order_div_list.appendChild(menu_name);
    order_div_list.appendChild(menu_qty);
    order_div_list.appendChild(menu_price);
    order_div_list.appendChild(menu_total);
    order_div_list.appendChild(menu_delete);

    // order_box.appendChild(order_div_list);
    return order_div_list;
  });
  order_box.append(...orders);

  const total_html = `<div class="order_list">
						<div>합계</div>
						<div>${total_pay.count}</div>
						<div>${total_pay.total}</div>
					</div>`;
  order_box.innerHTML += total_html;

  const pay_button_html = `<div class="order_list pay_box">
						  	<button class="btn_cash">현금 결제</button>
							<button class="btn_card">카드 결제</button>
						</div>`;
  order_box.innerHTML += pay_button_html;
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
      //   add_order_list(result.order_list);
      getOrders(table_id);
    });
};

// 주문서 화면이 열릴 때 서버로부터 table에 주문내역이 있으면 가져와서 보여라
const getOrders = (table_id) => {
  fetch(`/pos/getorder/${table_id}`)
    .then((res) => res.json())
    .then((result) => add_order_list(result));
};

document.addEventListener("DOMContentLoaded", () => {
  // 현재 화면이 열리면(주문화면이 열리면) table_id 값을 추출하기 위하여
  // article.order_list에서 dataset을 추출하여 변수에 담기
  const order_article = document.querySelector("article.order_list");
  const table_id = order_article.dataset.table_id;

  const pay_box = document.querySelector("div.pay_box");

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
        // getOrders(table_id);
      }
    });
  }

  if (order_article) {
    order_article.addEventListener("click", (e) => {
      const target = e.target;

      if (target.tagName === "DIV" && target.className.includes("menu_delete")) {
        const order_seq = target.dataset.order_seq;
        // alert(order_seq);

        if (confirm("주문 메뉴를 삭제할까요?")) {
          fetch(`/pos/order/${order_seq}/delete`)
            // router에서 res.send()로 문자열을 보냈기 때문에 res.text() 함수를 사용
            // .then((res) => { return res.text() })
            .then((res) => res.text())
            .then((result) => {
              if (result === "OK!") {
                getOrders(table_id);
              }
            });
        }
      }
    });
  }

  // 화면이 열릴 때 자동으로 실행될 코드
  getOrders(table_id);

  // button box에 click event 설정하고 button 클릭 시 결제 처리를 수행하려고 함.
  // button box 포함하여 button을 동적으로 생성했다
  // 동적으로 생성된 tag들은 자체적으로 event를 수신하지 못한다.
  // 아래의 event 핸들러는 div.button_box가 만들어지기 전에 선언되고 OS에게 알려진 코드
  // div.button_box가 아직 만들어지지 않은 상태에서 선언된 event 핸들러는 OS가 알아서 무시해버림.
  if (pay_box) {
    pay_box.addEventListener("click", (e) => {
      const button = e.target;
      if (button.className.includes("btn_cash")) {
        alert("현금 결제");
      } else {
        alert("카드 결제");
      }
    });
  }

  // 동적으로 생성된 tag에 event 핸들링을 하기 위해서 처음에 아예 전체 HTML  문서 자체에 click event를 설정
  // document에 click event를 설정하고 실제 tag가 생성된 후에 event를 버블링 할 수 있도록 설정하는 방법
  document.addEventListener("click", (e) => {
    const button = e.target;
    if (button.tagName === "BUTTON") {
      if (button.className.includes("btn_cash")) {
        alert("현금 결제");
        const modal = document.querySelector("div.modal");
        modal.style.display = "block";
      } else if (button.className.includes("btn_card")) {
        alert("카드 결제");
      }
    }
  });
});
