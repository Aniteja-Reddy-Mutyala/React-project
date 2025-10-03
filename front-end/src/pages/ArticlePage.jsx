import { useParams, useLoaderData,Link } from "react-router-dom";
import articles from "../article-content";
import CommentsList from "../CommentsList";
import AddCommentForm from "../AddCommentform";
import axios from 'axios'
import { useState } from "react";
import useUser from "../useUser";
export default function ArticlePage() {
    const { isLoading,user}=useUser();
  const { name } = useParams();
  const { upVotes:initialUpvotes, comments:initialComments } = useLoaderData();
  const [upVotes,setUpvotes]=useState(initialUpvotes)
  const[comments,setComments]=useState(initialComments)

  const article = articles.find((a) => a.name === name);
  async function onUpVoteClicked(){
    const token=user && await user.getIdToken();
    const headers=token?{authtoken:token}:{}
   const response= await axios.post('/api/articles/'+name+'/upvote',null,{headers})
   const updatedArticle=response.data;
   setUpvotes(updatedArticle.upVotes)
  }
  async function onDownvoteClicked(){
    const token=user && await user.getIdToken();
    const headers=token?{authtoken:token}:{}
    const response=await axios.post('/api/articles/'+name+'/downvote',null,{headers})
    const updatedArticle=response.data
    setUpvotes(updatedArticle.upVotes)
  }
  async function onAddComment({nameText,commentText}) {
    const token=user && await user.getIdToken();
    const headers= token?{authtoken:token}:{}
    const response=await axios.post('/api/articles/'+name+'/comments',{
        postedBy:nameText,
        text:commentText
    },{headers})
    const updatedArticle=response.data
    
    setComments(updatedArticle.comments)
    
    
  }
  return (
    <>
      <h1>{article.title} </h1>
      <p>This article has {upVotes} upvotes! </p>
      {user &&<button onClick={onUpVoteClicked}>Upvote</button>}
      {user &&<button onClick={onDownvoteClicked}>Downvote</button>}

      {article.content.map((p) => (
        <p key={p}>{p}</p>
      ))}
      {user?<AddCommentForm onAddComment={onAddComment}/>:<Link to="/login">Log in to comment</Link>}

      <CommentsList comments={comments}/>
    </>
  );
}
export async function loader({ params }) {
  const response = await axios.get("/api/articles/" + params.name);
  const { upVotes, comments } = response.data;
  return { upVotes, comments };
}
