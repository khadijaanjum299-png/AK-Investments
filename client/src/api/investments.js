import api from './axios';

export const investInPlan = async (planId, amount) => {
  const { data } = await api.post('/investments/my', {
    planId,
    amount,
  });

  return data;
};
