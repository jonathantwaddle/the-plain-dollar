interface AdSlotProps {
  variant: 'leaderboard' | 'sidebar' | 'inline';
  adCode?: string;
  className?: string;
}

const dimensions: Record<AdSlotProps['variant'], { width: number; height: number }> = {
  leaderboard: { width: 728, height: 90 },
  sidebar: { width: 300, height: 250 },
  inline: { width: 468, height: 60 },
};

export function AdSlot({ variant, adCode, className = '' }: AdSlotProps) {
  const { width, height } = dimensions[variant];

  return (
    <div
      className={`ad-slot ${variant === 'leaderboard' ? 'hidden sm:flex' : 'flex'} ${className}`}
      style={{ width, height, maxWidth: '100%' }}
      data-ad-slot={variant}
      data-testid={`ad-slot-${variant}`}
    >
      {adCode ? (
        <div dangerouslySetInnerHTML={{ __html: adCode }} />
      ) : (
        <span>Advertisement</span>
      )}
    </div>
  );
}
