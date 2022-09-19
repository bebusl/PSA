import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

console.log("====================READY====================");

io.on("connection", (socket) => {
  console.log("WEB SOCKET SERVER ON", new Date().toString());

  socket.on("send message", ({ searchItem }) => {
    console.log("Test", searchItem);
    const posreal = [
      "소재",
      "길이감",
      "배송",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "마감",
    ];

    const negreal = ["배송", "마감", "질", "소재"];

    setTimeout(() => {
      console.log("TIMEOUT");
      io.emit("keywords", posreal, negreal); //posreal, negreal 두번째 세번째 인자로 전달.
    }, 1000);

    // posreal, negreal => 희희
  });

  socket.on("selected keywords", ({ searchItem, likeword, hateword }) => {
    //productlists =>   const { _id, name, price, imageUrl, posKeywords, negKeywords, allKeywords } = product;
    const productlist = [
      {
        _id: 1,
        name: "에밀로 키높이 레이스업 지퍼 앵클 여성 워커 부츠 4cm",
        price: "34800",
        imageUrl:
          "https://shopping-phinf.pstatic.net/main_2152901/21529018518.20211007005933.jpg?type=f640",
        posKeywords: ["마감", "질", "배송"],
        negKeywords: ["배송"],
        allKeywords: ["굿"],
      },
      {
        _id: 2,
        name: "아이보리 키높이 여성 워커 캐주얼 통굽 구두 봄코디",
        price: "18670",
        imageUrl:
          "https://shopping-phinf.pstatic.net/main_3213431/32134313472.20220502191950.jpg?type=f640",
        posKeywords: ["마감", "질", "배송"],
        negKeywords: ["배송"],
        allKeywords: ["굿"],
      },
      {
        _id: 3,
        name: "닥터마틴 여성 10홀 제이든 하이 워커 25565001",
        price: "225460",
        imageUrl:
          "https://shopping-phinf.pstatic.net/main_3167094/31670947053.20220408103427.jpg?type=f640",
        posKeywords: ["마감", "질", "배송"],
        negKeywords: ["배송"],
        allKeywords: ["굿"],
      },
      {
        _id: 4,
        name: "탠디 여성 워커부츠 M17708 C-953",
        price: "111530",
        imageUrl:
          "https://shopping-phinf.pstatic.net/main_2915997/29159975938.20220126111013.jpg?type=f640",
        posKeywords: ["마감", "질", "배송"],
        negKeywords: ["배송"],
        allKeywords: ["굿"],
      },
      {
        _id: 5,
        name: "고세 Gby고세 여성 워커 러스트 G104528 3",
        price: "62640",
        imageUrl:
          "https://shopping-phinf.pstatic.net/main_3400509/34005095640.20220811155806.jpg?type=f640",
        posKeywords: ["마감", "질", "배송"],
        negKeywords: ["배송"],
        allKeywords: ["굿"],
      },
      {
        _id: 6,
        name: "성수동 수제화 여자 가죽 워커 부츠 5cm",
        price: "70000",
        imageUrl:
          "https://shopping-phinf.pstatic.net/main_8342123/83421239826.jpg?type=f140",
        posKeywords: ["마감", "질", "배송"],
        negKeywords: ["배송"],
        allKeywords: ["굿"],
      },
      {
        _id: 7,
        name: "닥터마틴 여성 10홀 워커 1490 버지니아 22524001",
        price: "189000",
        imageUrl:
          "https://shopping-phinf.pstatic.net/main_3171015/31710150597.20220410230420.jpg?type=f640",
        posKeywords: ["마감", "질", "배송"],
        negKeywords: ["배송"],
        allKeywords: ["굿"],
      },
      {
        _id: 8,
        name: "여자워커 가죽 스웨이드 여성 워커 부츠 SB-000074943",
        price: "42000",
        imageUrl:
          "https://shopping-phinf.pstatic.net/main_2099384/20993848416.20200115022055.jpg?type=f640",
        posKeywords: ["마감", "질", "배송"],
        negKeywords: ["배송"],
        allKeywords: ["굿"],
      },
      {
        _id: 9,
        name: "여성 워커부츠 스웨이드 OJ1295",
        price: "20000",
        imageUrl:
          "https://shopping-phinf.pstatic.net/main_2944735/29447351356.20220316033643.jpg?type=f640",
        posKeywords: ["마감", "질", "배송"],
        negKeywords: ["배송"],
        allKeywords: ["굿"],
      },
      {
        _id: 10,
        name: "스업 부츠 여성 워커 착한구두 AL632",
        price: "15990",
        imageUrl:
          "https://shopping-phinf.pstatic.net/main_2152901/21529018518.20211007005933.jpg?type=f640",
        posKeywords: ["마감", "질", "배송"],
        negKeywords: ["배송"],
        allKeywords: ["굿"],
      },
      {
        _id: 11,
        name: "에밀로 키높이 레이스업 지퍼 앵클 여성 워커 부츠 4cm",
        price: "34800",
        imageUrl:
          "https://shopping-phinf.pstatic.net/main_2152901/21529018518.20211007005933.jpg?type=f640",
        posKeywords: ["마감", "질", "배송"],
        negKeywords: ["배송"],
        allKeywords: ["굿"],
      },
      {
        _id: 12,
        name: "아이보리 키높이 여성 워커 캐주얼 통굽 구두 봄코디",
        price: "18670",
        imageUrl:
          "https://shopping-phinf.pstatic.net/main_3213431/32134313472.20220502191950.jpg?type=f640",
        posKeywords: ["마감", "질", "배송"],
        negKeywords: ["배송"],
        allKeywords: ["굿"],
      },
      {
        _id: 13,
        name: "닥터마틴 여성 10홀 제이든 하이 워커 25565001",
        price: "225460",
        imageUrl:
          "https://shopping-phinf.pstatic.net/main_3167094/31670947053.20220408103427.jpg?type=f640",
        posKeywords: ["마감", "질", "배송"],
        negKeywords: ["배송"],
        allKeywords: ["굿"],
      },
      {
        _id: 14,
        name: "탠디 여성 워커부츠 M17708 C-953",
        price: "111530",
        imageUrl:
          "https://shopping-phinf.pstatic.net/main_2915997/29159975938.20220126111013.jpg?type=f640",
        posKeywords: ["마감", "질", "배송"],
        negKeywords: ["배송"],
        allKeywords: ["굿"],
      },
      {
        _id: 15,
        name: "고세 Gby고세 여성 워커 러스트 G104528 3",
        price: "62640",
        imageUrl:
          "https://shopping-phinf.pstatic.net/main_3400509/34005095640.20220811155806.jpg?type=f640",
        posKeywords: ["마감", "질", "배송"],
        negKeywords: ["배송"],
        allKeywords: ["굿"],
      },
      {
        _id: 16,
        name: "성수동 수제화 여자 가죽 워커 부츠 5cm",
        price: "70000",
        imageUrl:
          "https://shopping-phinf.pstatic.net/main_8342123/83421239826.jpg?type=f140",
        posKeywords: ["마감", "질", "배송"],
        negKeywords: ["배송"],
        allKeywords: ["굿"],
      },
      {
        _id: 17,
        name: "닥터마틴 여성 10홀 워커 1490 버지니아 22524001",
        price: "189000",
        imageUrl:
          "https://shopping-phinf.pstatic.net/main_3171015/31710150597.20220410230420.jpg?type=f640",
        posKeywords: ["마감", "질", "배송"],
        negKeywords: ["배송"],
        allKeywords: ["굿"],
      },
      {
        _id: 18,
        name: "여자워커 가죽 스웨이드 여성 워커 부츠 SB-000074943",
        price: "42000",
        imageUrl:
          "https://shopping-phinf.pstatic.net/main_2099384/20993848416.20200115022055.jpg?type=f640",
        posKeywords: ["마감", "질", "배송"],
        negKeywords: ["배송"],
        allKeywords: ["굿"],
      },
      {
        _id: 19,
        name: "여성 워커부츠 스웨이드 OJ1295",
        price: "20000",
        imageUrl:
          "https://shopping-phinf.pstatic.net/main_2944735/29447351356.20220316033643.jpg?type=f640",
        posKeywords: ["마감", "질", "배송"],
        negKeywords: ["배송"],
        allKeywords: ["굿"],
      },
      {
        _id: 20,
        name: "스업 부츠 여성 워커 착한구두 AL632",
        price: "15990",
        imageUrl:
          "https://shopping-phinf.pstatic.net/main_2152901/21529018518.20211007005933.jpg?type=f640",
        posKeywords: ["마감", "질", "배송"],
        negKeywords: ["배송"],
        allKeywords: ["굿"],
      },
    ];
    io.emit("productlist", productlist); // product list 두번째 인자로 전달
  });
});

io.on("disconnect", (reason) => {
  console.log("socket disconnected. reason : ", reason);
});

httpServer.listen(7000);
