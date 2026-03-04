import { clientApi } from '@/app/lib/api';
import { ConfigSite } from '@/app/types';
import ContactContent from '@/app/components/client/lien-he/ContactContent';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Liên Hệ | Communication Agency',
  description: 'Hãy liên hệ với chúng tôi để được tư vấn và hỗ trợ tốt nhất',
};

export default async function ContactPage() {
  let config: ConfigSite | null = null;

  try {
    config = await clientApi.getConfigSite();
  } catch (error) {
    console.error('Failed to fetch config:', error);
  }

  return <ContactContent config={config} />;
}