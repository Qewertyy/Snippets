import { useEffect, useState, useCallback } from "react";
import { Star, StarFilled } from "./icons";

interface RatingProps {
  defaultValue?: number;
  value?: number;
  readOnly?: boolean;
  onClick?: (rating: number) => void;
  className?: string;
  size?: number;
  showCount?: boolean;
}

export default function Rating({
  defaultValue = 0,
  value,
  readOnly = false,
  onClick,
  className = "",
  size = 20,
  showCount = false
}: RatingProps) {
  const [internalRating, setInternalRating] = useState(defaultValue);
  const [hovered, setHovered] = useState(0);

  const displayedRating = value ?? internalRating;

  useEffect(() => {
    if (value !== undefined) {
      setInternalRating(value);
    }
  }, [value]);

  const handleClick = useCallback((star: number) => {
    if (!readOnly) {
      setInternalRating(star);
      onClick?.(star);
    }
  }, [onClick, readOnly]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, star: number) => {
    if ((e.key === "Enter" || e.key === " ") && !readOnly) {
      e.preventDefault();
      handleClick(star);
    }
  };

  return (
    <div className={`flex flex-row items-center ${className}`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = star <= (hovered || displayedRating);
        return (
          <div
            key={star}
            role={readOnly ? undefined : "button"}
            tabIndex={readOnly ? -1 : 0}
            aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
            className={`pr-1 ${readOnly ? "" : "cursor-pointer"} text-yellow-300 outline-none`}
            onClick={() => handleClick(star)}
            onKeyDown={(e) => handleKeyDown(e, star)}
            onMouseEnter={() => !readOnly && setHovered(star)}
            onMouseLeave={() => !readOnly && setHovered(0)}
          >
            {isFilled ? StarFilled : Star}
          </div>
        );
      })}
      {showCount && (
        <div className="ml-2 text-sm text-gray-600">{displayedRating}/5</div>
      )}
    </div>
  );
}
