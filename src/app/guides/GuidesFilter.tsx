"use client";

import { useState } from "react";
import { FadeInStagger, FadeInItem } from "@/components/ui/FadeIn";

type Guide = {
  category: string;
  color: string;
  title: string;
  description: string;
  time: string;
};

const filters = ["All", "Implementation", "Clinical AI", "Compliance", "ROI"];

export default function GuidesFilter({ guides }: { guides: Guide[] }) {
  const [active, setActive] = useState("All");

  const visible = active === "All" ? guides : guides.filter((g) => g.category === active);

  const btnStyle = (filter: string) =>
    filter === active
      ? { backgroundColor: "var(--primary)", color: "#fff", border: "none" }
      : {
          backgroundColor: "var(--surface)",
          color: "var(--text-muted)",
          border: "1px solid var(--border)",
        };

  return (
    <div className="flex flex-col lg:flex-row gap-10">
      {/* Desktop sidebar filters */}
      <aside
        className="hidden lg:flex flex-col gap-2 flex-shrink-0"
        style={{ width: "240px", position: "sticky", top: "100px", alignSelf: "flex-start" }}
      >
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActive(filter)}
            aria-pressed={filter === active}
            className="type-body rounded-full py-2.5 px-4 text-left w-full transition-colors cursor-pointer"
            style={btnStyle(filter)}
          >
            {filter}
          </button>
        ))}
        <div
          className="mt-6 rounded-lg p-4"
          style={{ backgroundColor: "var(--primary-subtle)", border: "1px solid var(--border)" }}
        >
          <p className="type-caption" style={{ color: "var(--text-muted)" }}>
            Can&apos;t find what you need? Email us at{" "}
            <a href="mailto:guides@zonov.ai" style={{ color: "var(--primary)" }}>
              guides@zonov.ai
            </a>
          </p>
        </div>
      </aside>

      {/* Mobile filter row */}
      <div
        className="flex lg:hidden overflow-x-auto gap-2 pb-2 -mx-4 px-4"
        style={{ scrollbarWidth: "none" }}
      >
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActive(filter)}
            aria-pressed={filter === active}
            className="type-body rounded-full py-2 px-4 flex-shrink-0 transition-colors cursor-pointer"
            style={btnStyle(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="flex-1 min-w-0">
        {visible.length === 0 ? (
          <p className="type-body" style={{ color: "var(--text-muted)" }}>
            No guides in this category yet.
          </p>
        ) : (
          <FadeInStagger key={active}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {visible.map((guide) => (
                <FadeInItem key={guide.title}>
                  <div className="card flex flex-col h-full hover:shadow-md transition-shadow" style={{ gap: 0 }}>
                    <div className="flex flex-col flex-1 p-6">
                      <span className="type-mono" style={{ color: guide.color }}>
                        {guide.category.toUpperCase()}
                      </span>
                      <h3 className="type-h4 font-semibold mt-2" style={{ color: "var(--text)" }}>
                        {guide.title}
                      </h3>
                      <p className="type-body mt-3 flex-1" style={{ color: "var(--text-muted)" }}>
                        {guide.description}
                      </p>
                    </div>
                    <div
                      className="flex items-center justify-between px-6 pb-6 pt-4"
                      style={{ borderTop: "1px solid var(--border)" }}
                    >
                      <span className="type-caption" style={{ color: "var(--text-muted)" }}>
                        {guide.time}
                      </span>
                      <a href="mailto:guides@zonov.ai?subject=Guide%20request" className="type-caption font-medium" style={{ color: "var(--primary)" }}>
                        Read Guide →
                      </a>
                    </div>
                  </div>
                </FadeInItem>
              ))}
            </div>
          </FadeInStagger>
        )}
      </div>
    </div>
  );
}
