import { parseEmojiPoint, parsePoint } from "@/utils/helpers";
import React from "react";

const EmojiPoint = ({ point }: { point: string }) => {
  const { emoji, text } = parseEmojiPoint(point) ?? {};
  return (
    <div className="group relative bg-linear-to-br from-gray-200/[0.08] to-gray-400/[0.03] p-4 rounded-2xl border border-gray-500/10 hover:shadow-lg transition-all">
      <div className="  bg-linear-to-r from-gray-500/10 to-transparent  group-hover:opacity-100 transition-opacity rounded-2xl">
        <div className="relative flex items-start gap-3 ">
          <span className="text-lg lg:text-xl shrink-0 pt-1">{emoji}</span>
          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
};

const RegularPoint = ({ point }: { point: string }) => {
  return (
    <div className="group relative bg-linear-to-br from-gray-200/[0.08] to-gray-400/[0.03] p-4 rounded-2xl border border-gray-500/10 hover:shadow-lg transition-all">
      <div className="  bg-linear-to-r from-gray-500/10 to-transparent  group-hover:opacity-100 transition-opacity rounded-2xl">
        <p className="relative text-lg lg:text-xl text-muted-foreground leading-relaxed text-left">
          {point}
        </p>
      </div>
    </div>
  );
};

const ContentSection = ({ points }: { points: string[] }) => {
  return (
    <div className="space-y-4">
      {points.map((point, index) => {
        const { isMainPoint, hasEmoji, isEmpty } = parsePoint(point);

        if (isEmpty) return null;

        if (hasEmoji || isMainPoint) {
          return <EmojiPoint key={index} point={point} />;
        }
        return <RegularPoint key={index} point={point} />;
      })}
    </div>
  );
};

export default ContentSection;
