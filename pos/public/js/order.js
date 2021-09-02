document.querySelector("div.list").addEventListener("click", (e) => {
  let button = e.target;
  const p_name = button.innerText;
  const p_code = button.dataset.code;

  fetch(`/order/insert?p_code=${p_code}`)
    .then((res) => res.json())
    .then((result) => {
      if (result) {
        // 이렇게 하니까 합계 위 쪽 부분에 메뉴가 하나씩 추가됨.
        let insert_menu = document.querySelector("tbody");
        let add_tr = document.createElement("tr");
        // tr 태그에 code라는 id값 추가
        add_tr.id = "code";
        let add_td = document.createElement("td");

        // tr tag 아래에 td tag를 만들어서 이름, 가격, 수량 등을 추가함.
        add_tr.innerHTML = "<td data-code=" + result.p_code + ">" + result.p_name + "</td>";
        add_tr.innerHTML += "<td class='p_price'>" + result.p_price + "</td>";
        add_tr.innerHTML += "<td>" + 1 + "</td>";
        add_tr.innerHTML += "<td>" + result.p_price + "</td>";

        insert_menu.appendChild(add_tr);

        // 아래에서 별도로 만든 함수 추가!
        total_price();
      }
    });
});

// 헷갈려서 따로 함수로 만들어 봄.
function total_price() {
  let table = document.querySelector("table.menu_table");
  let total_price = 0;
  console.log("total_price", total_price);

  let tr = document.querySelector("#code");
  console.log("길이!", tr.length);

  // 주문하기 버튼 클릭
  document.querySelector("button.order").addEventListener("click", (e) => {
    // 아래의 코드는 length 값이 undefined로 떠서 임의로 i의 범위를 지정해서 코드 확인함.
    //- for(let i = 0; i < 3; i++) {
    // for문 돌렸을 때나 안 돌렸을 때 모두 처음의 값만 추가됨..
    let price = document.querySelector(".p_price").innerText;
    console.log("price!!", price);

    // for문 돌리면 price의 첫 번째 값만 계속해서 추가되고
    // 돌리지 않으면 추가가 되지 않음. (반복하지 않기 때문에!)
    total_price += Number(price);
    console.log("total_price", total_price);
    //- }

    // td#total로 만들어놓은 곳에 위에서 계산해놓은 total_price 값 넣어줌.
    total.innerHTML = total_price;
  });
}
