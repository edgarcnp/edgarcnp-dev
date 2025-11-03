// Navigation constants with proper typing
export const NAVIGATION_SECTIONS = ["intro", "work", "thoughts", "footer"] as const;

export type SectionName = typeof NAVIGATION_SECTIONS[number];

export interface NavigationConfig {
    readonly SECTIONS: readonly SectionName[];
    readonly SECTION_NAMES: {
        readonly [K in SectionName]: string;
    };
}

export const NAVIGATION: NavigationConfig = {
    SECTIONS: NAVIGATION_SECTIONS,
    SECTION_NAMES: {
        intro: "Home",
        work: "Work",
        thoughts: "Thoughts",
        footer: "Contact",
    } as const,
} as const;

// Availability status constants
export const AVAILABILITY_STATUS = {
    AVAILABLE: "available",
    BUSY: "busy",
    DND: "dnd",
} as const;

export type AvailabilityStatus = typeof AVAILABILITY_STATUS[keyof typeof AVAILABILITY_STATUS];

// Status configuration with proper typing
export type StatusConfig = {
    readonly [K in AvailabilityStatus]: {
        readonly color: string;
        readonly text: string;
    };
};

export const STATUS_CONFIG: StatusConfig = {
    available: {
        color: "bg-green-500",
        text: "Available for work"
    },
    busy: {
        color: "bg-yellow-500",
        text: "Busy with projects"
    },
    dnd: {
        color: "bg-red-500",
        text: "Not available"
    }
};
