import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import type { ReactNode } from "react";
import { getCartSummary } from "../../services/crew/cartService";
import { useUser } from "../userContext";

// Shape of the cart state
interface CartState {
  cartCount: number;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

// Action types
export const CART_ACTIONS = {
  SET_LOADING: "SET_LOADING",
  SET_CART_COUNT: "SET_CART_COUNT",
  SET_ERROR: "SET_ERROR",
  INCREMENT_COUNT: "INCREMENT_COUNT",
  DECREMENT_COUNT: "DECREMENT_COUNT",
  RESET_CART: "RESET_CART",
  UPDATE_CART: "UPDATE_CART",
} as const;

type CartActionType = keyof typeof CART_ACTIONS;

interface CartAction {
  type: CartActionType;
  payload?: any;
}

// Context value type (state + operations)
interface CartContextValue extends CartState {
  addToCart: (quantity?: number) => void;
  removeFromCart: (quantity?: number) => void;
  updateCart: (cartData: any) => void;
  clearCart: () => void;
  refreshCartCount: () => Promise<void>;
}

// Provider props
interface CartProviderProps {
  children: ReactNode;
}

const initialState: CartState = {
  cartCount: 0,
  loading: false,
  error: null,
  lastUpdated: null,
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case CART_ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };

    case CART_ACTIONS.SET_CART_COUNT:
      return {
        ...state,
        cartCount: action.payload,
        loading: false,
        error: null,
        lastUpdated: new Date(),
      };

    case CART_ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };

    case CART_ACTIONS.INCREMENT_COUNT:
      return {
        ...state,
        cartCount: Math.max(0, state.cartCount + (action.payload || 1)),
        lastUpdated: new Date(),
      };

    case CART_ACTIONS.DECREMENT_COUNT:
      return {
        ...state,
        cartCount: Math.max(0, state.cartCount - (action.payload || 1)),
        lastUpdated: new Date(),
      };

    case CART_ACTIONS.RESET_CART:
      return {
        ...state,
        cartCount: 0,
        lastUpdated: new Date(),
      };

    case CART_ACTIONS.UPDATE_CART:
      return {
        ...state,
        cartCount: action.payload?.totalItems || 0,
        lastUpdated: new Date(),
      };

    default:
      return state;
  }
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { user } = useUser();

  // Fetch cart count from API
  const fetchCartCount = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      dispatch({ type: "RESET_CART" });
      dispatch({ type: "SET_LOADING", payload: false });
      return;
    }

    try {
      dispatch({ type: "SET_LOADING", payload: true });

      const response = await getCartSummary();

      if (response.status) {
        dispatch({
          type: "SET_CART_COUNT",
          payload: response.data.totalItems || 0,
        });
      } else {
        dispatch({
          type: "SET_CART_COUNT",
          payload: 0,
        });
      }
    } catch (error) {
      console.error("Error fetching cart count:", error);
      dispatch({
        type: "SET_ERROR",
        payload: "Failed to fetch cart count",
      });
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);

  // Run on mount
  useEffect(() => {
    fetchCartCount();
  }, []);

  // Refresh when user changes
  useEffect(() => {
    fetchCartCount();
  }, [fetchCartCount, user?._id]);

  // Cart operations
  const addToCart = (quantity = 1) =>
    dispatch({ type: "INCREMENT_COUNT", payload: quantity });

  const removeFromCart = (quantity = 1) =>
    dispatch({ type: "DECREMENT_COUNT", payload: quantity });

  const updateCart = (cartData: any) =>
    dispatch({ type: "UPDATE_CART", payload: cartData });

  const clearCart = () => dispatch({ type: "RESET_CART" });

  const contextValue: CartContextValue = {
    ...state,
    addToCart,
    removeFromCart,
    updateCart,
    clearCart,
    refreshCartCount: fetchCartCount,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextValue => {
  const context = useContext(CCartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};