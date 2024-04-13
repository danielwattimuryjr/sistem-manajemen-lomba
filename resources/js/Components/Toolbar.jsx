import { Button } from "flowbite-react";
import {
    Bold,
    Heading,
    Italic,
    List,
    ListOrdered,
    Redo,
    Strikethrough,
    Underline,
    Undo,
} from "lucide-react";

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
                <Heading className="h-4 w-4" />
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
                <Bold className="h-4 w-4" />
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
                <Italic className="h-4 w-4" />
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
                <Underline className="h-4 w-4" />
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
                <Strikethrough className="h-4 w-4" />
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
                <List className="h-4 w-4" />
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
                <ListOrdered className="h-4 w-4" />
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
                <Undo className="h-4 w-4" />
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
                <Redo className="h-4 w-4" />
            </Button>
        </Button.Group>
    );
};

export default Toolbar;
