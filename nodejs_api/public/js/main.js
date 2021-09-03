// JS 코드가 html 문서 어디에 있든 지 상관없이 실행할 수 있도록 하는 조치
// window.load()와 비슷한 역할
document.addEventListener("DOMContentLoaded", () => {
  const api_text_call = document.querySelector("p.api_text");
  const api_text_res = document.querySelector("span.api_text");

  const api_json_call = document.querySelector("p.api_json");
  const api_json_res = document.querySelector("span.api_json");

  // p.api_text가 화면에 있으면
  if (api_text_call) {
    api_text_call.addEventListener("click", (e) => {
      fetch("/api/text")
        //   .then((res) => return res.text()) 원래 이러한 코드인데 화살표 함수에서는 한 줄..?만 있으면 return을 쓰지 않아도 된다!
        .then((res) => res.text())
        .then((result) => {
          console.log(result);
          api_text_res.innerText = result;
        });
    });
  }

  // await는 함수 앞에서만 붙을 수 있다.
  // 브라우저에 따라서 async가 작동이 되지 않을 수도 있다.
  if (api_json_call) {
    // promise 방식으로 실행하기 위하여
    // 1. 동기식으로 실행할 함수들을 감싸는 외부 함수에 async 설정
    api_json_call.addEventListener("click", async (e) => {
      // promise 방식으로 비동기 함수를 동기식으로 실행시키기
      // 각 실행함수 앞에 await 키워드 설정
      const res = await fetch("/api/json");
      const result = await res.json();
      await console.log(result);

      let json_html = `<span> ${result.j_name} </span>`;
      json_html += `<span> ${result.j_addr} </span>`;
      json_html += `<span> ${result.j_tel} </span>`;
      json_html += `<span> ${result.j_age} </span>`;

      api_json_res.innerHTML = json_html;
    });
  }
});
