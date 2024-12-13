  import { useState, useEffect } from 'react';

  // Custom hook để gọi API Appwrite
  const useAppwrite = (apiCall: Function, deps: any[] = [], immediate: boolean = true) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
      if (immediate) {
        fetchData();
      }
    }, deps); // Chạy lại khi dependencies thay đổi

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await apiCall(...deps);
        setData(response);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    return { data, loading, error };
  };

  export default useAppwrite;
