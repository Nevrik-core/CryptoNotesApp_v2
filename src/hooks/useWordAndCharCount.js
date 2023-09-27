import { useState } from "react";

const useWordAndCharCount = (initialContent = "") => {
    const [content, setContent] = useState(initialContent);
    const [charCount, setCharCount] = useState(initialContent.length);
    const [wordCount, setWordCount] = useState(initialContent.split(/\s/).filter(Boolean).length);

    const handleContentChange = (newContent) => {
        setContent(newContent);
        setCharCount(newContent.length);
        setWordCount(newContent.split(/\s/).filter(Boolean).length);
    };

    return {
        content,
        setContent,
        charCount,
        wordCount,
        handleContentChange
    };
};

export default useWordAndCharCount;