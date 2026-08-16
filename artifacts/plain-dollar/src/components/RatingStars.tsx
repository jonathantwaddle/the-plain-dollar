export function RatingStars({ rating }: { rating: number }) {
  const rounded = Math.round(rating * 2) / 2;
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rounded)) {
      stars.push(
        <span key={i} className="text-accent text-lg" aria-hidden="true">★</span>
      );
    } else if (i === Math.ceil(rounded) && rounded % 1 !== 0) {
      stars.push(
        <span key={i} className="text-accent text-lg opacity-60" aria-hidden="true">★</span>
      );
    } else {
      stars.push(
        <span key={i} className="text-muted-foreground/30 text-lg" aria-hidden="true">☆</span>
      );
    }
  }

  return (
    <div className="flex items-center gap-2" aria-label={`Rating: ${rating} out of 5.0`}>
      <span className="font-medium text-lg leading-none">{rating.toFixed(1)}</span>
      <div className="flex items-center leading-none" title={`${rating} out of 5.0`}>
        {stars}
      </div>
    </div>
  );
}
