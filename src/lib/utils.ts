export function cn(...inputs: string[]) {
  return inputs.filter(Boolean).join(' ');
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

export function getSeverityColor(severity: string): string {
  const colors: Record<string, string> = {
    low: 'bg-green-100 text-green-800 border-green-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    high: 'bg-orange-100 text-orange-800 border-orange-200',
    critical: 'bg-red-100 text-red-800 border-red-200',
  };
  return colors[severity] || colors.medium;
}

export function getConfidenceColor(confidence: string): string {
  const colors: Record<string, string> = {
    low: 'bg-neutral-100 text-neutral-700',
    medium: 'bg-blue-100 text-blue-700',
    high: 'bg-green-100 text-green-700',
  };
  return colors[confidence] || colors.medium;
}