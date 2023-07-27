import { useEffect } from "react";
export const useWebsiteTitle = (title) => {
    useEffect(() => {
        document.title = `${title} - WebsiteName`;
    }, [title]);

    return null;
}