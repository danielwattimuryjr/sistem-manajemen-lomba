import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";

const Tiptap = ({ content, onChange, error }) => {
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
            Underline,
        ],
        content,
        editorProps: {
            attributes: {
                class: `mt-2 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-700 leading-normal h-50 overflow-auto ${
                    error && "border-red-500"
                }`,
            },
        },
        onUpdate: ({ editor }) => {
            const content = editor.getHTML();
            onChange(content);
        },
    });

    return (
        <div>
            <Toolbar editor={editor} content={content} />
            <EditorContent editor={editor} />
            {error && <div className="mt-1 text-red-500">{error}</div>}
        </div>
    );
};

export default Tiptap;
