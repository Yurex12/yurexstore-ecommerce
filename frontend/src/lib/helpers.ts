export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatPercentage = (percentage: number): string => {
  const abs = Math.abs(percentage);
  return `${percentage >= 0 ? '+' : '-'}${abs.toFixed(1)}%`;
};

export function calculatePercentageChange(current: number, previous: number) {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
}
