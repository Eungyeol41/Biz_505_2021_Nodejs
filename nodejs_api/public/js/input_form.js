const form_data_send = async () => {
  const form = document.querySelector("form");
  // form의 input box의 모든 정보를 FormData 객체로 생성
  const form_data = new FormData(form);
  // FormData에서 input 요소(Entries)만 추출하여 별도의 객체로 생성
  const entries_data = Object.fromEntries(form_data.entries());

  const fetch_option = {
    method: "POST",
    body: JSON.stringify(entries_data),
    headers: { "Content-Type": "application/json" },
  };

  const res = await fetch("/bbs/write", fetch_option);
  const result = await res.json();
  console.log(result);
  await bbs_list_view(result); // input.js에 선언되어 있음 -> input.html에 js script 추가할 때 순서가 바뀌면 안 된다!!!!
};

document.addEventListener("DOMContentLoaded", () => {
  const btn_send = document.querySelector("button.btn_save_form");
  if (btn_send) {
    btn_send.addEventListener("click", () => {
      form_data_send();
    });
  }
});
