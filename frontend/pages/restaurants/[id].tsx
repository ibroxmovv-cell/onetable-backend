import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import api from '../../lib/api';
import { useTranslation } from 'react-i18next';

const RestaurantPage = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { id } = router.query;
  const [r, setR] = useState<any>(null);

  useEffect(() => {
    if (id) fetch();
  }, [id]);

  const fetch = async () => {
    const res = await api.get(`/v1/restaurants/${id}`);
    setR(res.data);
  };

  if (!r) return <div className="py-8">Loading...</div>;

  const name = r.name_en || r.name_ru || r.name_uz;

  return (
    <div className="py-8">
      <div className="flex gap-6">
        <div className="w-2/3 bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">{name}</h2>
          <div className="mt-4 text-gray-600">{r.description_en || r.description_ru || r.description_uz}</div>

          <div className="mt-4">
            <h4 className="font-medium">Menu preview</h4>
            <ul className="mt-2">
              {(r.menu || []).slice(0, 5).map((m: any) => (
                <li key={m.id} className="py-2 border-b">{m.name_en || m.name_ru || m.name_uz} — {m.price} UZS</li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="w-1/3 space-y-4">
          <div className="bg-white p-4 rounded shadow-sm">
            <div className="text-sm text-gray-500">Price</div>
            <div className="font-semibold mt-1">{r.price_category}</div>
            <div className="mt-3">
              <button className="w-full bg-accent text-white py-2 rounded">{t('reserve')} — 50,000 UZS</button>
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow-sm">
            <div className="text-sm text-gray-500">Location</div>
            <div className="mt-2 text-sm">{r.address}</div>
            <div className="mt-3 h-40 bg-gray-100 flex items-center justify-center">Map preview</div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default RestaurantPage;
