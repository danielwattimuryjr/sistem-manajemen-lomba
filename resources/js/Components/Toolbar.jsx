import {
    Bold,
    Strikethrough,
    Italic,
    List,
    ListOrdered,
    Heading,
    Underline,
    Quote,
    Undo,
    Redo,
} from "lucide-react";
import { Button } from "flowbite-react";

const Toolbar = ({ editor, content }) => {
    if (!editor) {
        return null;
    }

    return (
        <Button.Group>
            {/* Heading 1 Toggle Button */}
            <Button
                size={"sm"}
                color={
                    editor.isActive("heading", { level: 1 }) ? "info" : "gray"
                }
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().toggleHeading({ level: 1 }).run();
                }}
            >
                <Heading className="w-4 h-4" />
            </Button>

            {/* Bold Toggle Button */}
            <Button
                size={"sm"}
                color={editor.isActive("bold") ? "info" : "gray"}
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().toggleBold().run();
                }}
            >
                <Bold className="w-4 h-4" />
            </Button>

            {/* Italic Toggle Button */}
            <Button
                size={"sm"}
                color={editor.isActive("italic") ? "info" : "gray"}
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().toggleItalic().run();
                }}
            >
                <Italic className="w-4 h-4" />
            </Button>

            {/* Underline Toggle Button */}
            <Button
                size={"sm"}
                color={editor.isActive("underline") ? "info" : "gray"}
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().toggleUnderline().run();
                }}
            >
                <Underline className="w-4 h-4" />
            </Button>

            {/* Striketrough Toggle Button */}
            <Button
                size={"sm"}
                color={editor.isActive("strike") ? "info" : "gray"}
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().toggleStrike().run();
                }}
            >
                <Strikethrough className="w-4 h-4" />
            </Button>

            {/* Bullet List Toggle Button */}
            <Button
                size={"sm"}
                color={editor.isActive("bulletList") ? "info" : "gray"}
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().toggleBulletList().run();
                }}
            >
                <List className="w-4 h-4" />
            </Button>

            {/* Numbered List Toggle Button */}
            <Button
                size={"sm"}
                color={editor.isActive("orderedList") ? "info" : "gray"}
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().toggleOrderedList().run();
                }}
            >
                <ListOrdered className="w-4 h-4" />
            </Button>

            {/* Undo Button */}
            <Button
                size={"sm"}
                color={"gray"}
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().undo().run();
                }}
            >
                <Undo className="w-4 h-4" />
            </Button>

            {/* Redo Button */}
            <Button
                size={"sm"}
                color={"gray"}
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().redo().run();
                }}
            >
                <Redo className="w-4 h-4" />
            </Button>
        </Button.Group>
    );
};

export default Toolbar;
