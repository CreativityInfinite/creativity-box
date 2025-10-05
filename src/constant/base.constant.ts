import en from '../i18n/locales/en.json';
import zhCN from '../i18n/locales/zh-CN.json';
import zhTW from '../i18n/locales/zh-TW.json';

const defaultLogo = { src: '/logo.svg', alt: 'Creativity Box', title: 'Creativity Box', url: '/' };

type LocaleKey = 'en' | 'zh-CN' | 'zh-TW';
const localeMap: Record<LocaleKey, any> = { en, 'zh-CN': zhCN, 'zh-TW': zhTW };

function getFooterContent(locale: string = 'zh-CN') {
  const messages = localeMap[locale as LocaleKey] || zhCN;
  const year = new Date().getFullYear();
  const tagline: string = messages.footerTagline || '';
  const copyrightTemplate: string = messages.footerCopyright || '';
  const copyright = (copyrightTemplate || '').replace(/YEAR/g, String(year));
  const menuItems: Array<{ title: string; links: Array<{ text: string; url: string }> }> = messages.footerMenuGroups || [];
  const bottomLinks: Array<{ text: string; url: string }> = messages.footerBottomLinks || [];

  return { tagline, copyright, logo: defaultLogo, menuItems, bottomLinks };
}

export { defaultLogo, getFooterContent };
