import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';

interface RichTextEditorProps {
    content: string;
    onChange: (content: string) => void;
}

import { Button } from "@/components/ui/button"

const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) {
        return null;
    }

    const buttons = [
        {
            label: 'B',
            action: () => editor.chain().focus().toggleBold().run(),
            isActive: editor.isActive('bold'),
            title: 'Bold'
        },
        {
            label: 'I',
            action: () => editor.chain().focus().toggleItalic().run(),
            isActive: editor.isActive('italic'),
            title: 'Italic'
        },
        {
            label: 'U',
            action: () => editor.chain().focus().toggleUnderline().run(),
            isActive: editor.isActive('underline'),
            title: 'Underline'
        },
        {
            label: 'H1',
            action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
            isActive: editor.isActive('heading', { level: 1 }),
            title: 'Heading 1'
        },
        {
            label: 'H2',
            action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
            isActive: editor.isActive('heading', { level: 2 }),
            title: 'Heading 2'
        },
        {
            label: 'List',
            action: () => editor.chain().focus().toggleBulletList().run(),
            isActive: editor.isActive('bulletList'),
            title: 'Bullet List'
        },
        {
            label: 'Ordered',
            action: () => editor.chain().focus().toggleOrderedList().run(),
            isActive: editor.isActive('orderedList'),
            title: 'Ordered List'
        },
        {
            label: 'Align Left',
            action: () => editor.chain().focus().setTextAlign('left').run(),
            isActive: editor.isActive({ textAlign: 'left' }),
            title: 'Align Left'
        },
        {
            label: 'Align Center',
            action: () => editor.chain().focus().setTextAlign('center').run(),
            isActive: editor.isActive({ textAlign: 'center' }),
            title: 'Align Center'
        },
        {
            label: 'Align Right',
            action: () => editor.chain().focus().setTextAlign('right').run(),
            isActive: editor.isActive({ textAlign: 'right' }),
            title: 'Align Right'
        },
        {
            label: 'Undo',
            action: () => editor.chain().focus().undo().run(),
            isActive: false,
            title: 'Undo'
        },
        {
            label: 'Redo',
            action: () => editor.chain().focus().redo().run(),
            isActive: false,
            title: 'Redo'
        },
    ];

    return (
        <div className="flex flex-wrap gap-1 p-2 border-b border-neutral-700 bg-neutral-800/30">
            {buttons.map((btn, i) => (
                <Button
                    key={i}
                    type="button"
                    onClick={btn.action}
                    title={btn.title}
                    variant={btn.isActive ? "default" : "ghost"}
                    size="sm"
                    className="h-8 px-2"
                >
                    {btn.label}
                </Button>
            ))}
        </div>
    );
};


export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Link.configure({
                openOnClick: false,
            }),
        ],
        content: content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'min-h-[200px] p-4 focus:outline-none text-white [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-4 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mb-3 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4 [&_a]:text-orange-500 [&_a]:underline',
            },
        },
    });

    // Update content when it changes externally (e.g. during edit)
    // But only if it's different to prevent cursor jumps
    if (editor && content !== editor.getHTML() && !editor.isFocused) {
        editor.commands.setContent(content);
    }

    return (
        <div className="w-full bg-neutral-800/50 border border-neutral-700 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-500 transition-all">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
}
