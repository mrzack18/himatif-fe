import { useEffect } from 'react';

const useDocumentTitle = (title: string) => {
    useEffect(() => {
        const originalTitle = document.title;
        document.title = `${title} - HIMATIF ITG`;

        return () => {
            document.title = originalTitle;
        };
    }, [title]);
};

export default useDocumentTitle;
