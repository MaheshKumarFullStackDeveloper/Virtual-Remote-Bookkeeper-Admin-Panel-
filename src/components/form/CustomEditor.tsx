"use client";


import React, { useEffect, useState, } from "react";
import Editor, {
    BtnBold,
    BtnItalic,
    createButton,
    HtmlButton,
    Toolbar
} from 'react-simple-wysiwyg';
type ContentEditableEvent = {
    target: {
        value: string;
        name?: string;
    };
};
type AddProps = {
    oldValue: string;
    updatedValue: (updatedValue: string) => void;
};



export default function CustomEditor({ oldValue, updatedValue }: AddProps): React.JSX.Element {
    const [contentvalue, setContentvalue] = useState<string>('<b>HTML</b>');

    useEffect(() => {
        console.log("oldValue updated:", oldValue);

        setContentvalue(oldValue)
    }, [oldValue]); // Runs whenever selectedSection changes



    const onChange = (e: ContentEditableEvent) => {

        setContentvalue(e.target.value)
        updatedValue(e.target.value)
    }


    const BtnUnderline = createButton('Underline', 'U̲', 'underline');
    const BtnStrikeThrough = createButton('Strikethrough', 'S̶', 'strikeThrough');

    const BtnAlignLeft = createButton('Align left', '⇤', 'justifyLeft');
    const BtnAlignCenter = createButton('Align center', '≡', 'justifyCenter');
    const BtnAlignRight = createButton('Align right', '⇥', 'justifyRight');
    const BtnOrderedList = createButton('Numbered list', '1.', 'insertOrderedList');
    const BtnUnorderedList = createButton('Bullet list', '•', 'insertUnorderedList');
    const BtnRemoveFormat = createButton('Clear formatting', '✖', 'removeFormat');
    const BtnH1 = createButton('Heading 1', 'H1', () => document.execCommand('formatBlock', false, '<h1>'));
    const BtnH2 = createButton('Heading 2', 'H2', () => document.execCommand('formatBlock', false, '<h2>'));
    const BtnH3 = createButton('Heading 3', 'H3', () => document.execCommand('formatBlock', false, '<h3>'));
    const BtnH4 = createButton('Heading 4', 'H4', () => document.execCommand('formatBlock', false, '<h4>'));
    const BtnH5 = createButton('Heading 5', 'H5', () => document.execCommand('formatBlock', false, '<h5>'));
    const BtnH6 = createButton('Heading 6', 'H6', () => document.execCommand('formatBlock', false, '<h6>'));

    const BtnCreateLink = () => {
        const handleClick = () => {
            const url = prompt('Enter the URL');
            if (url) {
                document.execCommand('createLink', false, url);
            }
        };

        return (
            <button type="button" onClick={handleClick} title="Insert link">
                🔗
            </button>
        );
    };




    return (<>
        <Editor value={contentvalue} onChange={onChange}>
            <Toolbar>
                <BtnH1 />
                <BtnH2 />
                <BtnH3 />
                <BtnH4 />
                <BtnH5 />
                <BtnH6 />
                <BtnBold />
                <BtnItalic />
                <BtnUnderline />
                <BtnStrikeThrough />
                <BtnCreateLink />
                <BtnAlignLeft />
                <BtnAlignCenter />
                <BtnAlignRight />
                <BtnOrderedList />
                <BtnUnorderedList />
                <BtnRemoveFormat />
                <HtmlButton />


            </Toolbar>

        </Editor>

    </>)

}