/**
 * Utility functions for Relocation Matrix
 */

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatPercentage = (value: number): string => {
  return `${Math.round(value)}%`;
};

export const calculateScore = (
  weights: Record<string, number>,
  criteria: Record<string, number>
): number => {
  let score = 0;
  const superWeighted = ['purchasing_power', 'language_barrier', 'career_opportunities', 'visa_ease'];

  Object.entries(weights).forEach(([key, weight]) => {
    const criteriaScore = criteria[key] || 5;
    const isSuper = superWeighted.includes(key);
    const multiplier = isSuper ? 10 : 1;
    score += (criteriaScore * weight * multiplier) / 10;
  });

  return Math.round(score);
};

export const calculateMatchPercent = (score: number, maxScore: number = 590): number => {
  const percent = (score / maxScore) * 100;
  return Math.max(0, Math.min(100, percent));
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy:', error);
    return false;
  }
};

export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export const generateShareToken = (): string => {
  return `share_${Math.random().toString(36).substring(2, 9)}`;
};

export const getInitialWeights = () => ({
  safety: 5,
  quality_of_life: 5,
  education: 3,
  climate: 3,
  tech_hub: 5,
  passport_strength: 3,
  citizenship_time: 2,
  cost_of_living: 5,
  healthcare: 4,
  tax_rate: 4,
  tech_salaries: 10,
  expat_community: 3,
  economic_future: 4,
  purchasing_power: 10,
  language_barrier: 10,
  career_opportunities: 10,
  visa_ease: 10,
});

export const getCriteriaLabel = (key: string): string => {
  const labels: Record<string, string> = {
    safety: '🛡️ Safety',
    quality_of_life: '🏡 Quality of Life',
    education: '🎓 Education',
    climate: '☀️ Climate',
    tech_hub: '🏢 Tech Hub',
    passport_strength: '🛂 Passport Strength',
    citizenship_time: '⏱️ Citizenship Time',
    cost_of_living: '💰 Cost of Living',
    healthcare: '🏥 Healthcare',
    tax_rate: '📊 Tax Rate',
    tech_salaries: '💻 Tech Salaries',
    expat_community: '🌐 Expat Community',
    economic_future: '📈 Economic Future',
    purchasing_power: '💎 Purchasing Power',
    language_barrier: '🗣️ Language Barrier',
    career_opportunities: '👔 Career Opportunities',
    visa_ease: '✈️ Visa/Relocation Ease',
  };
  return labels[key] || key;
};
