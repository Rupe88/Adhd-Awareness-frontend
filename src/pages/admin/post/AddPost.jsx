import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import List from "@editorjs/list";
import Header from "@editorjs/header";
import EditorJS from "@editorjs/editorjs";
import { useNavigate } from "react-router-dom";
import { usePostBlogMutation } from "../../../redux/features/blogs/blogsApi";

const AddPost = () => {
  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const [coverImg, setCoverImg] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [postBlog, { isLoading }] = usePostBlogMutation();

  const { user } = useSelector((state) => state.auth);
  console.log(user);
  const navigate = useNavigate();

  useEffect(() => {
    const editor = new EditorJS({
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
    });

    return () => {
      // Attempt to call editor.destroy if it exists, but handle potential errors gracefully
      try {
        editor.destroy();
      } catch (error) {
        console.warn("Editor.destroy is not supported:", error);
        // Implement custom cleanup logic here if necessary
      }

      editorRef.current = null;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const content = await editorRef.current.save();
      const newPost = {
        title,
        coverImg,
        content,
        category,
        description: metaDescription,
        author: user?._id,
        rating,
      };

      const response = await postBlog(newPost).unwrap();
      console.log(response);
      alert("Blog is Posted Successfully!");
      navigate("/");
    } catch (error) {
      console.log(error);
      setMessage("Failed to submit post, please try again!");
    }
  };

  return (
    <div className="bg-white md:p-8 p-2">
      <h2 className="text-2xl font-semibold">Create A New Blog Post</h2>
      <form onSubmit={handleSubmit} className="space-y-5 pt-8">
        {/* */}
        <div>
          <label className="text-semibold text-xl">Blog Title:</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Ex: Marina del Rey"
            className="w-full inline-block bg-gray-200 px-5 py-3 focus:outline-none"
          />
        </div>
        {/*blog details */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          {/* left side */}
          <div className="md:w-2/3 w-full">
            <p className="font-semibold text-xl mb-5">Content Section</p>
            <p className="text-xs italic">Write Your Post Below Here..</p>
            <div id="editorjs"></div>
          </div>

          {/* right side */}
          <div className="md:w-1/3 w-full border p-5 space-y-5">
            <p className="text-xl font-semibold">Choose Blog Format</p>
            {/* images */}
            <div>
              <label className="text-semibold ">Blog Cover:</label>
              <input
                value={coverImg}
                onChange={(e) => setCoverImg(e.target.value)}
                type="text"
                placeholder="https://unsplash.com/image1.jpg.."
                className="w-full inline-block bg-gray-200 px-5 py-3 focus:outline-none"
              />
            </div>

            {/* category */}
            <div>
              <label className="text-semibold">Blog Category:</label>
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                type="text"
                placeholder="/health/mental-health/adhd.."
                className="w-full inline-block bg-gray-200 px-5 py-3 focus:outline-none"
              />
            </div>

            {/* meta description */}
            <div>
              <label className="text-semibold">Meta Description:</label>
              <textarea
                cols={4}
                rows={4}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                type="text"
                placeholder="Write Your Blog Meta Description"
                className="w-full inline-block bg-gray-200 px-5 py-3 focus:outline-none"
              />
            </div>

            {/* ratings */}
            <div>
              <label className="text-semibold">Rating:</label>
              <input
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                type="number"
                className="w-full inline-block bg-gray-200 px-5 py-3 focus:outline-none"
              />
            </div>

            {/* author */}
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
        <button disabled={isLoading} type="submit" className="w-full mt-5 bg-pink-500 hover:bg-pink-400 font-medium py-3 rounded-md">Add New Blog</button>
      </form>
    </div>
  );
};

export default AddPost;