"use client";

import { Search, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  toggleFilterTag,
  clearFilterTags,
  setSearchQuery,
} from "@/store/slices/uiSlice";
import { cn } from "@/lib/cn";

const FILTER_TAGS = [
  "Java",
  "Spring Boot",
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "SQL",
  "Node.js",
  "CSS",
  "REST APIs",
  "Algorithms",
];

export default function ProjectFilters() {
  const dispatch = useAppDispatch();
  const activeTags = useAppSelector((s) => s.ui.activeFilterTags);
  const searchQuery = useAppSelector((s) => s.ui.searchQuery);

  return (
    <div className="space-y-4 mb-8">
      {/* Search */}
      <div className="relative">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
        />
        <input
          type="text"
          placeholder="Search projects…"
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          className="w-full pl-9 pr-4 py-2 text-sm bg-surface border border-border rounded-md text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => dispatch(setSearchQuery(""))}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Tag chips */}
      <div className="flex flex-wrap gap-2">
        {activeTags.length > 0 && (
          <button
            onClick={() => dispatch(clearFilterTags())}
            className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-accent text-white"
          >
            Clear <X size={11} />
          </button>
        )}
        {FILTER_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => dispatch(toggleFilterTag(tag))}
            className={cn(
              "font-mono text-xs px-2.5 py-1 rounded-md border transition-colors",
              activeTags.includes(tag)
                ? "bg-accent text-white border-accent"
                : "bg-surface text-muted border-border hover:border-accent hover:text-accent"
            )}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
