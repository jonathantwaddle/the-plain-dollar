export function PageByline({ date }: { date: string }) {
  return (
    <p className="text-foreground/80 mb-8 pb-4 border-b border-border">
      By <span className="font-semibold text-foreground">Jon Twaddle</span> | Checked by hand on {date}
    </p>
  );
}
