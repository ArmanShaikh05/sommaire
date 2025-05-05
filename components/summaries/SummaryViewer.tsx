"use client";

import { useState } from "react";
import { Card } from "../ui/card";
import NavigationControls from "./NavigationControls";
import ProgressBar from "./ProgressBar";
import { parsedSection } from "@/utils/helpers";
import ContentSection from "./ContentSection";

const SectionTitle = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-col gap-2 mb-6 sticky top-0 pt-2 pb-4 bg-background/80 backdrop-blur-xl z-10 text-black">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl text-center flex items-center justify-center gap-2 font-bold text-black">
        {title}
      </h2>
    </div>
  );
};

const SummaryViewer = ({ summary }: { summary: string }) => {
  const [currentSection, setCurrentSection] = useState(0);

  const sections = summary
    .split("\n# ")
    .map((section) => section.trim())
    .filter(Boolean)
    .map(parsedSection);
  console.log(sections);

  const handleNext = () =>
    setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));

  const handlePrevious = () =>
    setCurrentSection((prev) => Math.max(prev - 1, 0));

  return (
    <Card className="relative px-2 h-[500px] sm:h-[600px] lg:h-[700px] w-full xl:w-[600px] overflow-hidden bg-linear-to-br from-background via-background/95 to-rose-500/5 backdrop-blur-lg shadow-2xl rounded-3xl border border-rose-500/10">
      <ProgressBar sections={sections} currentSection={currentSection} />

      <div className="h-full overflow-y-auto scrollbar-hide pt-12 sm:pt-16 pb-20 sm:pb-24">
        <div className="px-4 sm:px-6">
          <SectionTitle title={sections[currentSection]?.title || ""} />
          <ContentSection points={sections[currentSection]?.points || []} />
        </div>
      </div>

      <NavigationControls
        currentSection={currentSection}
        totalSections={sections.length}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onSectionSelect={setCurrentSection}
      />
    </Card>
  );
};

export default SummaryViewer;
