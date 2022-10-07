const express = require("express");
const cors = require("cors");
const app = express();
const models = require("./models");
const multer = require("multer");
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

const port = process.env.PORT || 8080;// ||조건부 연산자사용 포트번호가 8080일때써라라는뜻
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.get("/banners", (req, res) => {
  models.Banner.findAll({ limit: 2 })
    .then((result) => {
      res.send({
        banners:result,
      })
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("에러가 발생했습니다")
    });
});
app.get("/products", (req, res) => {
  //  조회부분 구현
  // models.Product.findAll({ limit: 1 }) //상품갯수
  models.Product.findAll({
    order: [["createdAt", "DESC"]], //ASCio 오름차순 보통많이씀
    attributes: ["id", "name", "price", "description", "imageUrl", "createdAt"],
  })

    .then((result) => {
      res.send({
        product: result,
      });
    })
    .catch((error) => {
      console.error(error);
      res.send("에러발생");
    });
});

app.get("/products/:id", (req, res) => {
  const params = req.params;
  const { id } = params;
  models.Product.findOne({
    where: { id: id }, //,키값계속해서 쓰면됨
  })
    .then((result) => {
      console.log("product:", result);
      res.send({ product: result });
    })
    .catch((error) => {
      console.error();
      res.status(400).send("상품조회시 에러가 발생했습니다");
    });
});

app.post("/image", upload.single("image"), (req, res) => {
  const file = req.file;
  console.log(file);
  res.send({
    imageUrl: file.path,
  });
});

app.post("/products", (req, res) => {
  const body = req.body;
  const { name, price, seller, description, imageUrl } = body;
  if (!name || !price || !seller || !description) {
    res.send("모든 필드를 입력해주세요");
  }
  models.Product.create({ name, price, seller, description, imageUrl })
    .then((result) => {
      console.log("상품생성결과", result);
      res.send({ result });
    })
    .catch((error) => {
      console.error(error);
      res.status(400).send("상품업로드에 문제가 발생하였습니다");
    });
});

app.post("/login", (req, res) => {
  res.send("로그인해주세요");
});

app.listen(port, () => {
  console.log("망고샵의 서버가 돌아가고 있습니다.");
  models.sequelize
    .sync()
    .then(() => {
      console.log("🎃DB연결성공");
    })
    .catch((err) => {
      console.error(err);
      console.log("✂DB연결실패");
      process.exit();
    });
});
