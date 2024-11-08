import {
  IconH2,
  IconBold,
  IconStrikethrough,
  IconItalic,
  IconList,
  IconListNumbers,
} from "@tabler/icons-react"
import { Toggle } from "../ui/toggle"

const ToolBar = ({ editor }) => {
  if (!editor) {
    return null
  }

  return (
    <div className="rounded-md border">
      <Toggle
        pressed={editor.isActive("heading")}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <IconH2 className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <IconBold className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <IconItalic className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={editor.isActive("strike")}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <IconStrikethrough className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <IconList className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <IconListNumbers className="h-4 w-4" />
      </Toggle>
    </div>
  )
}

export default ToolBar
