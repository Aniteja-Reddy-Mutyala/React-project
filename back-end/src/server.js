import express from "express";
import { MongoClient, ReturnDocument, ServerApiVersion } from "mongodb";
import admin from "firebase-admin";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)
const credentials = JSON.parse(fs.readFileSync("./credentials.json"));

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});
const app = express();
let db;
async function connectToDB() {
  const uri = "mongodb://127.0.0.1";
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  await client.connect();
  db = client.db("full-stack-react-db");
}
/*const articleInfo=[
    {name:"learn-react", upVotes:0,comments:[]},
    {name:"learn-node",upVotes:0,comments:[]},
    {name:"mongodb",upVotes:0,comments:[]}
]*/
app.use(express.static(path.join(__dirname,'../dist')))
app.use(express.json());
app.get(/^(?!\/api).+/,(req,res)=>{
    res.sendFile(path.join(__dirname,'../dist/index.html'))
})
app.get("/api/articles/:name", async (req, res) => {
  const { name } = req.params;

  const article = await db.collection("articles").findOne({ name });
  res.json(article);
});

app.use(async function (req, res, next)  {
  const { authtoken } = req.headers;
  if (authtoken) {
    const user = await admin.auth().verifyIdToken(authtoken);
    req.user = user;
     next();
  } else {
    res.sendStatus(400);
   
  }
 
});


app.post("/api/articles/:name/upvote", async (req, res) => {
  const { name } = req.params;
  const { uid } = req.user;
  const article = await db.collection("articles").findOne({ name });
  const upVoteIds = article.upVoteIds || [];
  const canUpVote = uid &&!upVoteIds.includes(uid);
  if (canUpVote) {
    const updatedArticle = await db.collection("articles").findOneAndUpdate(
      { name },
      {
        $inc: { upVotes: 1 },
        $push: { upVoteIds: uid },
      },
      {
        returnDocument: "after",
      }
    );
    res.json(updatedArticle);
  }
  else{
    res.sendStatus(403);
  }
});
app.post("/api/articles/:name/downvote", async (req, res) => {
  const { name } = req.params;
  const {uid}=req.user;
  const article= await db.collection("articles").findOne({name});
  const downvoteIds=article.upvoteIds ||[];
  const canDownVote=uid && downvoteIds.includes(uid);
  if (canDownVote){
const updatedArticle = await db.collection("articles").findOneAndUpdate(
    { name },
    {
      $inc: { upVotes: -1 },
      $push:{downvoteIds:uid},
    },
    {
      returnDocument: "after",
    }
  );
  res.json(updatedArticle);
  }
  else{
    res.sendStatus(403)
  }
  
});
app.post("/api/articles/:name/comments", async (req, res) => {
  const { name } = req.params;
  const { postedBy, text } = req.body;
  const newComment = { postedBy, text };
  const updatedArticle = await db.collection("articles").findOneAndUpdate(
    { name },
    {
      $push: { comments: newComment },
    },
    {
      returnDocument: "after",
    }
  );
  res.json(updatedArticle);
});
const port=process.env.PORT ||8000
async function start() {
  await connectToDB();
  app.listen(port, function () {
    console.log("Server is listening to port "+port);
  });
}
start();
