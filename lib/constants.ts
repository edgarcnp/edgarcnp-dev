// Navigation constants
export const NAVIGATION = {
    SECTIONS: ["intro", "work", "thoughts", "footer"] as const,
    SECTION_NAMES: {
        intro: "Home",
        work: "Work",
        thoughts: "Thoughts",
        footer: "Contact",
    } as const,
    SCROLL_DELAY: 300,
    SCROLL_DURATION: 600,
} as const;

// Availability status constants
export const AVAILABILITY_STATUS = {
    AVAILABLE: "available",
    BUSY: "busy",
    DND: "dnd",
} as const;

export type AvailabilityStatus = keyof typeof AVAILABILITY_STATUS;

// Status configuration
export const STATUS_CONFIG = {
    [AVAILABILITY_STATUS.AVAILABLE]: {
        color: "bg-green-500",
        text: "Available for work"
    },
    [AVAILABILITY_STATUS.BUSY]: {
        color: "bg-yellow-500",
        text: "Busy with projects"
    },
    [AVAILABILITY_STATUS.DND]: {
        color: "bg-red-500",
        text: "Not available"
    }
} as const;
