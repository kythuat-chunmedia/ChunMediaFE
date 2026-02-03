// components/header/Header.tsx (KHÔNG 'use client')

import HeaderClient from '../components/layout/HeaderClient';
import { clientApi } from '@/app/lib/api';

export default async function Header() {
  const [configSite, menus] = await Promise.all([
    clientApi.getConfigSite(),
    clientApi.getMenusHeader(),
  ]);

  return (
    <HeaderClient
      configSite={configSite}
      menus={menus.filter(m => m.title.toLowerCase().trim() !== 'trang chủ')}
    />
  );
}
