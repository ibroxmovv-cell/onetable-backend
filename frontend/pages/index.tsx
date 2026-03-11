import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import api from '../lib/api';
import RestaurantCard from '../components/RestaurantCard';
import { useTranslation } from 'react-i18next';

const Home: NextPage = () => {
  const { t } = useTranslation('common');
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [q, setQ] = useState('');

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async (query = '') => {
    const res = await api.get('/v1/restaurants', { params: { q: query } });
    setRestaurants(res.data || []);
  };

  const onSearch = async (e: any) => {
    e.preventDefault();
    fetchList(q);
  };

  return (
    <div className="py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold">OneTable</h1>
        <p className="text-gray-600 mt-2">{t('recommended_for_you')}</p>
      </div>

      <form onSubmit={onSearch} className="mb-6">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('search_placeholder')} className="w-full p-3 rounded border" />
      </form>

      <section className="grid gap-4">
        {restaurants.map((r) => (
          <RestaurantCard key={r.id} r={r} />
        ))}
      </section>
    </div>
  );
};

export default Home;
