import { Portfolio } from '@/app/types';
import { clientApi } from '@/app/lib/api';
import PortfolioPageClient from '../../components/portfolio/PortfolioPageClient';

export default async function PortfolioPage() {
  let portfolios: Portfolio[] = [];

  try {
    const data = await clientApi.getPortfoliosPublished();
    portfolios = data || [];
  } catch (error) {
    console.error('Failed to fetch portfolios:', error);
  }

  // Extract unique years & industries from real data for filter options
  const years = ['Tất cả', ...Array.from(new Set(portfolios.map((p) => p.year.toString()))).sort((a, b) => b.localeCompare(a))];
  const industries = ['Tất cả', ...Array.from(new Set(portfolios.map((p) => p.industry).filter(Boolean) as string[])).sort()];

  return <PortfolioPageClient portfolios={portfolios} years={years} industries={industries} />;
}