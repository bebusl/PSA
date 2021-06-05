const http = require("http");
const app = require("./app");
const User = require("./models/@main");
const consumer = require("./kafka/consumer");
const analysis_consumer=require("./kafka/analysis-consumer")
const crawl_producer=require("./kafka/crawl-producer")
const { SERVER_PORT } = require("./env");


const server = http.createServer(app);

const io = require("socket.io")(server,{
  cors : {
    origin:["http://localhost:3000"],
    methods:["GET","POST"]
  }
});



io.on("connection", function (socket) {
  console.log("connected");

  crawl_producer.init()  

  socket.on('send message',({searchItem})=>{
    const msg=searchItem
    console.log("크롤러 프로듀서 생성", searchItem)
    crawl_producer.sendMessage(msg)
  })

  socket.on("disconnect", function () {
    console.log("disconnected", socket.id);
  });
});


server.listen(+SERVER_PORT);
server.on("listening", () => {
  const addr = server.address();
  console.log(`Server running on ${addr.address}:${addr.port}`);
});
