import { useEffect } from "react";
export const useWebsiteTitle = (title) => {
    useEffect(() => {
        document.title = `${title}`;
    }, [title]);

    return null;
}