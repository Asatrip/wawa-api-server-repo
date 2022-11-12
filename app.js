const express = require("express");

const app = express();

const db = require("./models");

const { Member } = db;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("url should contain /api/..");
});

app.get("/api/members", async (req, res) => {
  const { team } = req.query;
  if (team) {
    const teamMembers = await Member.findAll({ where: { team: team } });
    res.send(teamMembers);
  } else {
    const members = await Member.findAll();
    res.send(members);
  }
});

//아이디값 아이디에 해당부분
app.get("/api/members/:id", async (req, res) => {
  const { id } = req.params;
  const member = await Member.findOne({ where: { id: id } });
  if (member) {
    console.log(member.toJSON());
    res.send(member);
  } else {
    res.status(404).send({ message: "get없다..시바라" });
  }
});

//추가
app.post("/api/members", async (req, res) => {
  const newMember = req.body;
  const member = await Member.create(newMember);
  //const member = Member.build(newMember);  이것도가능ㅎ
  await member.save();
  res.send(member);
});

//수정
app.put("/api/members/:id", async (req, res) => {
  const { id } = req.params;
  const newInfo = req.body;
  const result = await Member.update(newInfo, { where: { id: id } });

  if (result[0]) {
    res.send({ message: `${result[0]} rows(s) affected` });
  } else {
    res.status(404).send({ message: "put 그런id없다 시바라" });
  }
});

//삭제
app.delete("/api/members/:id", async (req, res) => {
  const { id } = req.params;
  const deletedCount = await Member.destroy({ where: { id } });

  if (deletedCount) {
    res.send({ message: `${deletedCount} rows deleted` });
  } else {
    res.status(404).send({ message: "deleted 없다 시바라" });
  }
});
//----------------------------------------------------------
//api 디렉토리
app.get("/api", (req, res) => {
  res.send("<h1>api 꺼져라</h1>");
});

app.get("/18", (req, res) => {
  res.send("<h1>18 꺼져라</h1>");
});

app.get("/18/members", async (req, res) => {
  const { team } = req.query;
  if (team) {
    const teamMembers = await Member.findAll({ where: { team: team } });
    res.send(teamMembers);
  } else {
    const members = await Member.findAll();
    res.send(members);
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("server is listening....");
});
