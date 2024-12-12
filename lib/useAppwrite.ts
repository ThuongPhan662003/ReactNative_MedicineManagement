import { Alert } from "react-native";
import { useEffect, useState } from "react";

const useAppwrite = <T>(fn: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null); // Thêm hỗ trợ kiểu dữ liệu generic
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fn();
      setData(res);
    } catch (error: any) {
      Alert.alert("Error", error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, loading, refetch };
};

export default useAppwrite;
