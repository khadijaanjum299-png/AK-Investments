import api from './axios';

export const fetchPlans = async () => {
  try {
    const { data } = await api.get('/plans');
    return data;
  } catch (error) {
    console.error('Failed to fetch plans', error);
    return [];
  }
};
