import { Link } from "react-router-dom"
export default function ArticlesList({articles}){
        return (
            <>
            {articles.map(p=>(
        <Link key={p.name}to={'/articles/' +p.name}>
            <h3>{p.title}</h3>
        <p>{p.content[0].substring(0,150)}</p>
        </Link>
    ))}
            </>
        )
    
}