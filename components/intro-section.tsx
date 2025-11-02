import { STATUS_CONFIG } from "@/lib/constants";

// Availability status - change this to switch status indicators
const CURRENT_AVAILABILITY_STATUS = "busy" as const; // Options: "available" | "dnd"

interface IntroSectionProps {
    currentYear: number;
    className?: string;
}

export default function IntroSection({ currentYear, className = "" }: IntroSectionProps) {
    return (
        <header id="intro" className={`min-h-screen flex items-center py-16 sm:py-12 ${className}`}>
            <div className="grid lg:grid-cols-5 gap-8 sm:gap-12 lg:gap-16 w-full">
                <div className="lg:col-span-3 space-y-6 sm:space-y-8">
                    <div className="space-y-3 sm:space-y-2">
                        <div className="text-xs sm:text-sm text-muted-foreground font-mono tracking-wider">PORTFOLIO / {currentYear}</div>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-tight">
                            Edgar
                            <br />
                            <span className="text-muted-foreground">Christian</span>
                        </h1>
                    </div>

                    <div className="space-y-4 sm:space-y-6 max-w-md">
                        <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                            <span className="text-foreground">Embedded Engineer</span> crafting digital experiences at the
                            intersection of
                            <span className="text-foreground"> design</span>,<span className="text-foreground"> technology</span>,
                            and
                            <span className="text-foreground"> user experience</span>.
                        </p>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 ${STATUS_CONFIG[CURRENT_AVAILABILITY_STATUS].color} rounded-full animate-pulse`}></div>
                                {STATUS_CONFIG[CURRENT_AVAILABILITY_STATUS].text}
                            </div>
                            <div>Remote - Indonesia</div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 lg:mt-0">
                    <div className="space-y-4">
                        <div className="text-xs sm:text-sm text-muted-foreground font-mono">CURRENTLY</div>
                        <div className="space-y-2">
                            <div className="text-base sm:text-lg text-foreground">Network Engineer</div>
                            <div className="text-sm sm:text-base text-muted-foreground">@ PT. Efrat Sinergi Indonesia</div>
                            <div className="text-xs text-muted-foreground">2021 — Present</div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="text-xs sm:text-sm text-muted-foreground font-mono">AREA OF EXPERTISE</div>
                        <div className="flex flex-wrap gap-2">
                            {([
                                "Rust",
                                "C/C++",
                                "Python",
                                "Systems Engineering",
                                "Cloud Computing",
                                "Network Engineering",
                                "CCNA",
                                "HCIA",
                                "Embedded System",
                                "IoT",
                                "FPGA",
                            ] as const).map((skill) => (
                                <span
                                    key={skill}
                                    className="px-2 sm:px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-theme"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
