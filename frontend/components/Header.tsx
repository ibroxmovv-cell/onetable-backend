import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

export default function Header() {
  const { t, i18n } = useTranslation('common');
  const router = useRouter();

  const changeLang = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <a className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-primary text-white flex items-center justify-center font-bold">OT</div>
            <div className="text-lg font-semibold">OneTable</div>
          </a>
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <button onClick={() => changeLang('uz')} className="text-sm">UZ</button>
            <button onClick={() => changeLang('ru')} className="text-sm">RU</button>
            <button onClick={() => changeLang('en')} className="text-sm">EN</button>
          </div>

          <Link href="/login"><a className="text-sm text-primary">Login</a></Link>
        </div>
      </div>
    </header>
  );
}
