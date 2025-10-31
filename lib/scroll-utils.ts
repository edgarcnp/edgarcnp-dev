/**
 * Smooth scroll utility functions
 */

export interface SmoothScrollOptions {
    duration?: number;
    easing?: (t: number) => number;
}

/**
 * Custom easing function for smooth scrolling
 */
const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

/**
 * Smooth scroll to an element
 * @param element - The target element to scroll to
 * @param options - Scroll options including duration and easing function
 */
export const smoothScrollTo = (
    element: HTMLElement,
    options: SmoothScrollOptions = {}
): void => {
    const { duration = 600, easing = easeInOutCubic } = options;

    const startPosition = window.scrollY;
    const targetPosition = element.offsetTop;
    const distance = targetPosition - startPosition;

    // Early return if no distance to scroll
    if (Math.abs(distance) < 1) return;

    let start: number | null = null;

    const animation = (currentTime: number) => {
        if (start === null) start = currentTime;
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = easing(progress);

        window.scrollTo({
            top: startPosition + distance * ease,
            behavior: 'auto'
        });

        if (progress < 1) {
            requestAnimationFrame(animation);
        }
    };

    requestAnimationFrame(animation);
};
