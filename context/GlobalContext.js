// GlobalContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';

// Định nghĩa kiểu dữ liệu cho GlobalContext
const GlobalContext = createContext();

// Hook sử dụng GlobalContext
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(true);
  const [employee_id, setEmployeeId] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Lấy thông tin người dùng khi ứng dụng khởi chạy
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser(); // Gọi API hoặc lấy từ local storage
        if (currentUser) {
          setIsLogged(true);
          setEmployeeId(currentUser.employee_id || null);
          setToken(currentUser.token || null);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        loading,
        employee_id,
        setEmployeeId,
        token,
        setToken,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalProvider;
