// DOMContentLoaded event 설정 시 JS 코드가 HTML의 어떤 부분에 있어도 상관없이 작동된다.
document.addEventListener("DOMContentLoaded", () => {
  const main_section = document.querySelector("section.main");

  // section.main이 없는 page에서 script 오류가 나는 것을 방지하기 위한 코드
  if (main_section) {
    main_section.addEventListener("click", (e) => {
      const target = e.target;

      // index.pug의 table layout click 설정
      if (target.tagName === "DIV" && target.className.includes("table")) {
        const table_id = target.dataset.table_id;
        // alert(table_id + " 선택됨");

        // pathVariable 사용
        document.location.href = `/pos/order/${table_id}`;
      }
    });
  }
});
