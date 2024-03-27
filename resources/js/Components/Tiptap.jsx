import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import Underline from "@tiptap/extension-underline";

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
        editorProps: {
            attributes: {
                class: "focus:ring-2 focus:ring-violet-600 mt-2 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-700 leading-normal",
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
            {error && <div className="text-red-500 mt-1">{error}</div>}
        </div>
    );
};

export default Tiptap;
