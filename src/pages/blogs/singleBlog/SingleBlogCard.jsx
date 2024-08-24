import { formatDate } from "../../../utils/formatDate";
import { FaRegStar } from "react-icons/fa";
import edjsHTML from 'editorjs-html';
import { useSelector } from "react-redux";

const edjsParser = edjsHTML();

const SingleBlogCard = ({ blog }) => {
  const { title, description, createdAt, content, author, coverImg, category, rating } = blog || {};
  console.log("Content received:", content);

  const { user } = useSelector((state) => state.auth);
  console.log(user);

  let htmlContent = '';

  if (content) {
    if (typeof content === 'object') {
      try {
        if (content.blocks) {
          // This is likely EditorJS format
          htmlContent = edjsParser.parse(content).join("");
        } else if (content.text) {
          // This is the simpler content format mentioned earlier
          htmlContent = `<h1>${content.text}</h1>`;
          if (content.images) {
            htmlContent += content.images.map(img => `<img src="${img}" alt="Blog image" />`).join('');
          }
        } else {
          htmlContent = '<p>Content format not recognized</p>';
        }
      } catch (error) {
        console.error("Error parsing content:", error);
        htmlContent = '<p>Error parsing content</p>';
      }
    } else if (typeof content === 'string') {
      htmlContent = content;
    } else {
      console.log("Unexpected content type:", typeof content);
      htmlContent = '<p>Unexpected content format</p>';
    }
  } else {
    htmlContent = '<p>No content available</p>';
  }

  return (
    <>
      <div className="bg-white dark:bg-gray-800 p-8">
        <div>
          <h1 className="md:text-4xl text-3xl font-medium mb-4 text-gray-900 dark:text-white">{title}</h1>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            {formatDate(createdAt)} by
            <span className="text-pink-500"> {user?.username || "Unknown author"}</span>
          </p>
        </div>
        <div>
          <img src={coverImg} alt="cover img" className="w-full md:h-[520px] object-cover" />
        </div>
        {/* Blog Details */}
        <div className="mt-8 prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} className="space-y-3 editorjsdiv" />
          <div>
            <span className="text-lg font-medium dark:text-gray-200">{description} <br /> <br /></span>
            <span className="text-lg font-medium text-pink-600 dark:text-pink-500">Rating: </span>
            <span>{rating} (based on 1,000 reviews)</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleBlogCard;
