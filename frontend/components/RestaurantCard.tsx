import Link from 'next/link';
import { useTranslation } from 'react-i18next';

type Props = {
  r: any;
};

export default function RestaurantCard({ r }: Props) {
  const { t } = useTranslation('common');

  const displayName = r.name_en || r.name_ru || r.name_uz || 'Restaurant';

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden flex">
      <img src={r.images?.[0] || '/placeholder.jpg'} alt={displayName} className="w-40 h-32 object-cover" />
      <div className="p-4 flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold">{displayName}</h3>
            <div className="text-sm text-gray-500">{r.cuisine?.join(', ')}</div>
          </div>
          <div className="text-sm text-gray-600">{r.price_category}</div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="text-sm text-gray-600">{r.has_english_menu ? 'EN menu' : ''}</div>
          <Link href={`/restaurants/${r.id}`}>
            <a className="bg-accent text-white px-3 py-1 rounded">{t('reserve')}</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
