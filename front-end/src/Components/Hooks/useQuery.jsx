import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchPosts = async () => {
  const { data } = await axios.get("http://localhost:4000");
  return data;
};

function Posts() {
  const { data, error, isLoading } = useQuery(["posts"], fetchPosts);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

export default Posts;
