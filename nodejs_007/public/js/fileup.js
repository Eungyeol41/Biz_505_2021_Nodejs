// JS 함수 선언
const fileUpfetch = (files) => {
  // ajax(fetch)를 사용하여 파일을 서버로 전송하기
  // ( ajax 사용 시 함수에서 함수로 전달한다. )

  // JS의 FormData 클래스를 사용하여 객체 생성
  const formData = new FormData();

  // 업로드하려는 파일들 중 첫 번째 파일 정보 저장..
  // 2. 생성된 formData 객체에 upFile이라는 변수를 생성하면서 summernote로부터 받은 파일들 중 첫 번째 파일에 대한 정보를 저장한다.
  formData.append("upFile", files[0]);

  fetch("/file/fileUp", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((result) => {
      $("#b_text").summernote("insertImage", "/images/" + result.fileName);
      console.log(result);
    });
};

const fileUpAjax = (files, editor) => {
  const formData = new FormData();
  formData.append("file", files[0]);

  // jquery의 ajax 함수를 사용하여 file Upload 하기
  $.ajax({
    url: "/file/fileUp",
    data: formData,
    type: "POST",
    processData: false,
    contentType: false,
  });
};
