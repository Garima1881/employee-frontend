import { useState } from 'react';
import axios from '../api/axios'; 
import { toast } from 'react-hot-toast';

export function useDeleteEmployee() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const deleteEmployee = async (id: string) => {
    setLoading(true);
    setError('');
    try {
      await axios.delete(`/employees/${id}`);
      toast.success('Employee deleted successfully');
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to delete employee');
      toast.error('Failed to delete employee');
      throw err; 
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteEmployee,
    loading,
    error,
  };
}
