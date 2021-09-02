const total_pay = {};

const add_order_list = (order_list) => {
  const order_box = document.querySelector("table.order_list tbody");
  let order_tr_list = document.querySelectorAll("table.order_list tbody tr");

  if (order_tr_list) {
    order_tr_list.forEach((tag) => {
      order_box.removeChild(tag);
    });
  }

  total_pay.title = "합계";
  total_pay.b1 = "";
  total_pay.qty = 0;
  total_pay.total = 0;
  total_pay.b2 = "";

  const orders = order_list.map((order, index) => {
    const order_item = [
      order.o_pcode,
      order.tbl_product.p_name,
      order.o_qty,
      order.o_price,
      order.o_qty * order.o_price,
      "X",
    ];

    total_pay.count++;
    total_pay.qty += order.o_qty;
    total_pay.total += order.o_qty * order.o_price;

    const order_td = order_item.map((item) => {
      const td = document.createElement("TD");
      td.innerText = item;
      td.dataset.order_seq = order.o_seq;

      return td;
    });

    const order_tr = document.createElement("TR");
    order_tr.append(...order_td);

    return order_tr;
  });

  document.querySelector("table.order_list tbody").append(...orders);

  const pay_td = Object.keys(total_pay).map((key) => {
    const td = document.createElement("TD");
    td.innerText = total_pay[key];

    return td;
  });

  const pay_tr = document.createElement("TR");
  pay_tr.append(...pay_td);
  order_box.appendChild(pay_tr);
};
