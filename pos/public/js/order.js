document.querySelector("div.menulist").addEventListener("click", (e) => {
  let button = e.target;
  const p_name = button.innerText;
  const p_code = button.dataset.menu_code;

  fetch(`/order/insert?p_code=${p_code}`)
    .then((res) => res.json())
    .then((result) => {
      if (result) {
        let insert_menu = document.querySelector("tbody");
        let add_tr = document.createElement("tr");
        add_tr.id = "code";
        let add_td = document.createElement("td");

        add_tr.innerHTML =
          "<td data-code=" + result.p_code + ">" + result.p_name + "</td>";
        add_tr.innerHTML += "<td class='p_price'>" + result.p_price + "</td>";
        add_tr.innerHTML += "<td> 1 </td>";
        add_tr.innerHTML += "<td>" + result.p_price + "</td>";

        insert_menu.appendChild(add_tr);
      }
    });
});

function total_price() {
  let table = document.querySelector("table.menu_table");
  let total_price = 0;
  let total = document.querySelector("#total");

  console.log("total_price", total_price);

  let tr = document.querySelector("#code");

  // 주문하기 버튼 클릭
  document.querySelector("button.pay").addEventListener("click", (e) => {
    let price = document.querySelector(".p_price").innerText;
    console.log("price!!", price);

    total_price += Number(price);
    console.log("total_price", total_price);

    total.innerHTML = total_price;
  });
}

document.querySelector("button.home").addEventListener("click", () => {
  document.location.href = "/";
});
