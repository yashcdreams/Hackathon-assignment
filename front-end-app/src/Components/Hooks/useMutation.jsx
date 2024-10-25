import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const addPost = async (newPost) => {
  const response = await axios.post("http://localhost:4000", newPost);
  console.log("Response:", response);
  return response.data;
};

function CreatePost() {
  const queryClient = useQueryClient();

  const mutation = useMutation(addPost, {
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
    onError: (error) => {
      console.error("Error adding post:", error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = { title: e.target.elements.title.value };

    if (!newPost.title.trim()) {
      alert("Title is required");
      return;
    }

    mutation.mutate(newPost);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="New Post Title" />
      <button type="submit" disabled={mutation.isLoading}>
        {mutation.isLoading ? "Adding..." : "Add Post"}
      </button>

      {mutation.isError && <p>Error adding post</p>}
      {mutation.isSuccess && <p>Post added successfully!</p>}
    </form>
  );
}

export default CreatePost;
