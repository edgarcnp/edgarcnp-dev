interface Post {
    readonly title: string;
    readonly excerpt: string;
    readonly date: string;
    readonly readTime: string;
}

interface ThoughtsSectionProps {
    className?: string;
}

const POSTS: readonly Post[] = [
    {
        title: "The Future of Web Development",
        excerpt: "Exploring how AI and automation are reshaping the way we build for the web.",
        date: "Dec 2024",
        readTime: "5 min",
    },
    {
        title: "Design Systems at Scale",
        excerpt: "Lessons learned from building and maintaining design systems across multiple products.",
        date: "Nov 2024",
        readTime: "8 min",
    },
    {
        title: "Performance-First Development",
        excerpt: "Why performance should be a first-class citizen in your development workflow.",
        date: "Oct 2024",
        readTime: "6 min",
    },
    {
        title: "The Art of Code Review",
        excerpt: "Building better software through thoughtful and constructive code reviews.",
        date: "Sep 2024",
        readTime: "4 min",
    },
] as const;

export default function ThoughtsSection({ className = "" }: ThoughtsSectionProps) {
    return (
        <section
            id="thoughts"
            className={`min-h-screen flex items-center py-12 sm:py-16 ${className}`}
        >
            <div className="w-full space-y-8 sm:space-y-12 lg:space-y-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-light">Recent Thoughts</h2>

                <div className="grid gap-4 sm:gap-6 lg:gap-8 lg:grid-cols-2">
                    {POSTS.map((post) => (
                        <article
                            key={`${post.date}-${post.title}`}
                            className="group p-4 sm:p-6 lg:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-theme hover:shadow-lg cursor-pointer"
                        >
                            <div className="h-full flex flex-col">
                                <div className="flex-1 space-y-3 sm:space-y-4">
                                    <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                                        <span>{post.date}</span>
                                        <span>{post.readTime}</span>
                                    </div>

                                    <h3 className="text-base sm:text-lg lg:text-xl font-medium group-hover:text-foreground transition-theme">
                                        {post.title}
                                    </h3>

                                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{post.excerpt}</p>
                                </div>

                                <div className="flex items-center gap-1 text-sm text-muted-foreground group-hover:text-foreground transition-all duration-300 mt-4 sm:mt-6 pt-2 sm:pt-3">
                                    <span>Read more</span>
                                    <svg
                                        className="w-4 h-4 transform translate-x-0 group-hover:translate-x-2 transition-transform duration-300 ease-out"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
