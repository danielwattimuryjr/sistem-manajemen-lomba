import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import ToolBar from "./toolBar"

const Tiptap = ({ description, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: true,
          HTMLAttributes: {
            class: "list-disc pl-4",
          },
        },
        orderedList: {
          keepAttributes: true,
          keepMarks: true,
          HTMLAttributes: {
            class: "list-decimal pl-8",
          },
        },
        heading: {
          HTMLAttributes: {
            class: "text-xl font-bold",
            level: 1,
          },
        },
      }),
    ],
    content: description,
    editorProps: {
      attributes: {
        class: `rounded-md border h-[150px] overflow-auto bg-background px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-input`,
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    },
  })
  return (
    <div className="space-y-2">
      <ToolBar editor={editor} />
      <EditorContent
        editor={editor}
        className="prose prose-neutral prose-sm leading-none"
      />
    </div>
  )
}

export default Tiptap
