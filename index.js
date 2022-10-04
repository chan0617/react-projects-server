var http=require("http");
var hostname='127.0.0.1';
var port='8080';

const server=http.createServer(function(req,res){
    // 한글사용 노노
    //console.log('request:',req);
    const path=req.url;
    // 요청들어온 경로를 path에 저장
    const method=req.method;
    if(path==='/products'){
        if(method==='GET'){
            res.writeHead(200,{"Content-Type":"application/json"});
            const products =JSON.stringify([{name:"배변패드",price:50000}]);
            //stringify 자바스크립트 형식을 제이슨방식으로 변환시켜준다.
            res.end(products);
        }else if(method==='POST'){
            res.end("POST success");
        }
        res.end('GOOD BOY');
    }
    
    res.end('user Hello');
})

server.listen(port,hostname);
console.log('react-projects-server on');



