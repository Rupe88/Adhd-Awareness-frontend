import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import List from "@editorjs/list";
import Header from "@editorjs/header";
import EditorJS from "@editorjs/editorjs";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchBlogByIdQuery, useUpdateBlogMutation } from "../../../redux/features/blogs/blogsApi";

const UpdatePost = () => {
  const { id } = useParams();
  const { data: blog = {}, error, isLoading, refetch } = useFetchBlogByIdQuery(id);
  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const [coverImg, setCoverImg] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [updateBlog] = useUpdateBlogMutation();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    let editor;
    if (blog.post) {
      editor = new EditorJS({
        holder: "editorjs",
        onReady: () => {
          editorRef.current = editor;
        },
        autofocus: true,
        tools: {
          header: {
            class: Header,
            inlineToolbar: true,
          },
          list: {
            class: List,
            inlineToolbar: true,
          },
        },
        data: blog.post.content
      });
    }

    return () => {
      if (editor && typeof editor.destroy === "function") {
        editor.destroy();
      }
      editorRef.current = null;
    };
  }, [blog]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const content = await editorRef.current.save();
      const updatedPost = {
        title: title || blog.post.title,
        coverImg: coverImg || blog.post.coverImg,
        category,
        content,
        description: metaDescription || blog.post.description,
        author: user?._id,
        rating: rating || blog.post.rating,
      };
      console.log(updatedPost);
      const response = await updateBlog({ id, ...updatedPost }).unwrap();
      console.log(response);
      alert("Blog is Updated Successfully!");
      refetch();
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      setMessage("Failed to submit post, please try again!");
    }
  };

  return (
    <div className="bg-white md:p-8 p-2">
      <h2 className="text-2xl font-semibold">Edit or Update Post</h2>
      <form onSubmit={handleSubmit} className="space-y-5 pt-8">
        {/* Blog Title */}
        <div>
          <label className="text-semibold text-xl">Blog Title:</label>
          <input
            defaultValue={blog?.post?.title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Ex: Marina del Rey"
            className="w-full inline-block bg-gray-200 px-5 py-3 focus:outline-none"
          />
        </div>
        {/* Blog Details */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div className="md:w-2/3 w-full">
            <p className="font-semibold text-xl mb-5">Content Section</p>
            <p className="text-xs italic">Write Your Post Below Here..</p>
            <div id="editorjs"></div>
          </div>
          <div className="md:w-1/3 w-full border p-5 space-y-5">
            <p className="text-xl font-semibold">Choose Blog Format</p>
            <div>
              <label className="text-semibold">Blog Cover:</label>
              <input
                defaultValue={blog?.post?.coverImg}
                onChange={(e) => setCoverImg(e.target.value)}
                type="text"
                placeholder="https://unsplash.com/image1.jpg.."
                className="w-full inline-block bg-gray-200 px-5 py-3 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-semibold">Blog Category:</label>
              <input
                defaultValue={blog?.post?.category}
                onChange={(e) => setCategory(e.target.value)}
                type="text"
                placeholder="/health/mental-health/adhd.."
                className="w-full inline-block bg-gray-200 px-5 py-3 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-semibold">Meta Description:</label>
              <textarea
                cols={4}
                rows={4}
                defaultValue={blog?.post?.description}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Write Your Blog Meta Description"
                className="w-full inline-block bg-gray-200 px-5 py-3 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-semibold">Rating:</label>
              <input
                defaultValue={blog?.post?.rating}
                onChange={(e) => setRating(e.target.value)}
                type="number"
                className="w-full inline-block bg-gray-200 px-5 py-3 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-semibold">Author:</label>
              <input
                disabled
                value={user.username}
                type="text"
                placeholder={`{user.username} (not editable)`}
                className="w-full inline-block bg-gray-200 px-5 py-3 focus:outline-none"
              />
            </div>
          </div>
        </div>
        {message && <p className="text-red-600">{message}</p>}
        <button disabled={isLoading} type="submit" className="w-full mt-5 bg-pink-500 hover:bg-pink-400 font-medium py-3 rounded-md">Update Blog Text</button>
      </form>
    </div>
  );
};

export default UpdatePost;
