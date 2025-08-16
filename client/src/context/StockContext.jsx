import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from "react";

const StockContext = createContext();

const initialState = {
  stocks: {},
  selectedStock: null,
  watchlist: [],
  portfolio: [],
  loading: false,
  error: null,
  lastUpdated: null,
  realTimeData: {},
  connectionStatus: "disconnected",
};

const stockReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };

    case "SET_STOCKS":
      return {
        ...state,
        stocks: { ...state.stocks, ...action.payload },
        loading: false,
        error: null,
        lastUpdated: new Date().toISOString(),
      };

    case "SET_SELECTED_STOCK":
      return { ...state, selectedStock: action.payload };

    case "ADD_TO_WATCHLIST":
      return {
        ...state,
        watchlist: [
          ...state.watchlist.filter((s) => s !== action.payload),
          action.payload,
        ],
      };

    case "REMOVE_FROM_WATCHLIST":
      return {
        ...state,
        watchlist: state.watchlist.filter((s) => s !== action.payload),
      };

    case "UPDATE_REAL_TIME_DATA":
      return {
        ...state,
        realTimeData: {
          ...state.realTimeData,
          [action.payload.symbol]: action.payload.data,
        },
      };

    case "SET_CONNECTION_STATUS":
      return { ...state, connectionStatus: action.payload };

    case "ADD_TO_PORTFOLIO":
      return {
        ...state,
        portfolio: [...state.portfolio, action.payload],
      };

    case "REMOVE_FROM_PORTFOLIO":
      return {
        ...state,
        portfolio: state.portfolio.filter((p) => p.id !== action.payload),
      };

    default:
      return state;
  }
};

export const StockProvider = ({ children }) => {
  const [state, dispatch] = useReducer(stockReducer, initialState);

  const setLoading = useCallback((loading) => {
    dispatch({ type: "SET_LOADING", payload: loading });
  }, []);

  const setError = useCallback((error) => {
    dispatch({ type: "SET_ERROR", payload: error });
  }, []);

  const setStocks = useCallback((stocks) => {
    dispatch({ type: "SET_STOCKS", payload: stocks });
  }, []);

  const setSelectedStock = useCallback((stock) => {
    dispatch({ type: "SET_SELECTED_STOCK", payload: stock });
  }, []);

  const addToWatchlist = useCallback((symbol) => {
    dispatch({ type: "ADD_TO_WATCHLIST", payload: symbol });
  }, []);

  const removeFromWatchlist = useCallback((symbol) => {
    dispatch({ type: "REMOVE_FROM_WATCHLIST", payload: symbol });
  }, []);

  const updateRealTimeData = useCallback((symbol, data) => {
    dispatch({ type: "UPDATE_REAL_TIME_DATA", payload: { symbol, data } });
  }, []);

  const setConnectionStatus = useCallback((status) => {
    dispatch({ type: "SET_CONNECTION_STATUS", payload: status });
  }, []);

  const value = {
    ...state,
    setLoading,
    setError,
    setStocks,
    setSelectedStock,
    addToWatchlist,
    removeFromWatchlist,
    updateRealTimeData,
    setConnectionStatus,
  };

  return (
    <StockContext.Provider value={value}>{children}</StockContext.Provider>
  );
};

export const useStock = () => {
  const context = useContext(StockContext);
  if (!context) {
    throw new Error("useStock must be used within a StockProvider");
  }
  return context;
};
