import { FaItalic } from "react-icons/fa"

const ItalicButton = ({ editor }) => {
  return (
    <button
    type="button"
      onClick={() => editor.chain().focus().toggleItalic().run()}
      className={`p-2 rounded ${editor.isActive('italic') ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover:bg-gray-100'}`}
      title="Italic"
    >
     <FaItalic size={20}/>
    </button>
  )
}

export default ItalicButton