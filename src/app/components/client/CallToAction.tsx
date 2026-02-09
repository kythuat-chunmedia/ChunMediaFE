import { clientApi } from '@/app/lib/api';
import { ConfigSite } from '@/app/types';
import { MessageCircle, Phone } from 'lucide-react';

export default async function CallToAction() {
    let config: ConfigSite | null = null;

    try {
        config = await clientApi.getConfigSite();
    } catch (error) {
        console.error('Failed to fetch config:', error);
    }

    return (
        <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
            {config?.hotline && (
                <a
                    href={`tel:${config.hotline.replace(/\s/g, '')}`}
                    className="w-14 h-14 bg-teal-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-teal-700 transition-colors"
                    aria-label="Gọi điện"
                >
                    <Phone size={24} />
                </a>
            )}
            {config?.zalo && (
                <a
                    href={`https://zalo.me/${config.zalo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors"
                    aria-label="Chat Zalo"
                >
                    <MessageCircle size={24} />
                </a>
            )}
        </div>
    );
}