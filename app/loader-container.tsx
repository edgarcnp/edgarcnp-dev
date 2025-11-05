'use client';

import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Loader from "@/components/loader";

export default function LoaderContainer() {
    useEffect(() => {
        // Find the already created loader container (created by the script in layout)
        let loaderContainer = document.getElementById('loader-root');

        // If somehow it doesn't exist, create it
        if (!loaderContainer) {
            loaderContainer = document.createElement('div');
            loaderContainer.id = 'loader-root';
            document.body.appendChild(loaderContainer);
        }

        // Create a React root and render the Loader component
        const root = createRoot(loaderContainer);
        root.render(<Loader />);

        // Cleanup function to remove the loader container
        return () => {
            if (loaderContainer && loaderContainer.parentNode) {
                loaderContainer.parentNode.removeChild(loaderContainer);
            }
        };
    }, []);

    return null; // This component doesn't render anything itself
}
