import api from './axios';

export const fetchAdminDashboard = async () => {
  const { data } = await api.get('/admin/dashboard');
  return data;
};
export const fetchAllInvestments = async () => {
  const { data } = await api.get('/admin/investments');
   return data;
}