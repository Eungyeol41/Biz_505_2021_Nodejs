const fontNames = [
  "맑은 고딕",
  "궁서",
  "굴림",
  "바탕체",
  "돋움체",
  "Arial",
  "Arial Black",
  "Comic Sans MS",
  "Courier New",
];

const fontSizes = [
  "8",
  "9",
  "10",
  "12",
  "14",
  "16",
  "18",
  "20",
  "25",
  "30",
  "40",
  "50",
  "65",
  "72",
  "81",
  "100",
  "121",
  "144",
];

const toolbar = [
  ["style", ["bold", "italic", "underline"]],
  ["font", ["fontname", "fontsize"]],
  ["design", ["height", "color"]],
  ["para", ["ul", "ol", "paragraph"]],
  ["Misc", ["undo", "codeview", "redo"]],
];

// JQuery를 사용하여 summernote 적용하기
$(function () {
  $("#b_text").summernote({
    callbacks: {
      // 이미지를 업로드 할 때

      onImageUpload: (files) => {
        fileUpfetch(files);
      },
      lang: "ko-KR",
      toolbar,
      fontNames: fontNames,
      fontsize: fontSizes,
      placeholder: "내용을 입력해주세요",
      width: "60%",
      height: "300px",
      // summernote를 사용할 때 설정하는 event 핸들러

      /**
       * summernote 입력창에 이미지를 drag-and-drop 할 때 발생하는 event
       *
       * summernote 입력창에 이미지를 drag&drop을 하면
       * 	입력창에 바로 이미지를 추가하면서 글을 작성할 수 있다.
       *
       * 이런 식으로 이미지를 추가하면 작성되는 글 내용에 이미지가 encoding된 코드로 변경이 되고
       * 	글 내용의 크기가 어마어마하게 커져버림.
       * DB에 해당 내용을 저장하려면 BLOB, CLOB type으로 칼럼을 만들고 저장하는 방법이 있다.
       * 하지만, 일반적으로 Web Server Application에서는
       * 	한꺼번에 대량의 Text를 업로드하는 것을 허용하지 않는다.
       * 또한, BLOB, CLOB type의 칼럼을 가진 table은 굉장히 용량이 커져서 무거워지고
       * 	text 검색 등을 하기가 어려워진다.
       *
       * MySQL에서는 가급적 BLOB 등 보다는
       * 	Text type이나 BARCHAR(4000)와 같은 type 이하로만 칼럼을 설정할 것을 권장한다.
       *
       * 때문에 이미지가 포함된 데이터는 실제로 서버로 업로드가 안 되고 DB table에도 저장할 수 없다고 생각하고
       * 	App을 개발, 설계하는 것이 좋다.
       *
       * summernote 창에 이미지를 올리면 순간적으로 가로채기를 하여 먼저 이미지를 서버로 올리고
       * 	올려진 이미지에 대한 경로만 text에 담아서 간단한 내용으로 업로드를 수행하도록 한다.
       *
       * summernote에 onImageUpload 이벤트를 설정하여 note 창에 이미지를 올리면
       * 	가로채서 ajax로 이미지를 먼저 올리도록 custermizing을 수행한다.
       *
       *
       * onImageUpload 이벤트가 발생하면 drop한 이미지들의 정보와 summernote 자신(객체)의 정보를 함수에 전달한다.
       *
       * 우리가 선언한 fileUpfetch()함수에 drop한 파일정보를 files에 담아 정보를 전달하면서 실행된다.
       */
    },
  });
});
