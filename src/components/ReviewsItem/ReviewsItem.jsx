export default function ReviewsItem({ review, expanded, toggleExpand }) {
  const id = review.id || review.created_at;
  const author = review.author_details?.name || review.author || "Anonymous";
  const date = review.created_at ? new Date(review.created_at).toLocaleDateString() : "";
  const rating = review.author_details?.rating ?? null;

  return (
    <div className="card-body p-4">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="shrink-0">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold bg-[#241a12] text-[#ffd7a8]">
            {author.split(" ").map(s => s[0]).slice(0,2).join("")}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div>
              <div className="text-sm font-semibold text-[#ffb347] text-left">{author}</div>
              <div className="text-xs text-[#d9d4cc] text-left">{date}</div>
            </div>

            {rating !== null && (
              <div>
                <span className="px-2 py-0.5 text-xs font-medium rounded-md bg-[rgba(255,179,71,0.06)] text-[#f97316] border-[1px_solid_rgba(205,142,55,0.12)]">
                  {rating} / 10
                </span>
              </div>
            )}
          </div>

          {/* Review text */}
          <div>
            <p
              className={`text-sm text-[#e3e0dc] text-left transition-all duration-300 cursor-pointer ${
                expanded.has(id) ? "" : "line-clamp-4"
              } whitespace-pre-wrap`}
              onClick={() => toggleExpand(id)}
            >
              {review.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
