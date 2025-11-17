# Redux Migration Guide

## Overview
This guide provides a foundation for migrating from Context API to Redux Toolkit with persistence.

## Current Implementation

### Core Redux Setup (Completed)
- ✅ Redux Toolkit installed
- ✅ Redux Persist configured
- ✅ Store structure created
- ✅ Dev tools enabled

### Migrated State (Completed)
1. **Auth State** (`store/slices/authSlice.ts`)
   - `isAuthenticated`
   - `token`

2. **User State** (`store/slices/userSlice.ts`)
   - `user`
   - `userProfile`

3. **Theme State** (`store/slices/themeSlice.ts`)
   - `theme` (persisted)

### Custom Hooks (Completed)
- `useReduxAuth()` - Auth operations
- `useReduxUser()` - User operations
- `useReduxTheme()` - Theme operations

## Migration Strategy

### Phase 1: Core State (COMPLETED)
Replace Context providers with Redux:
- ✅ AuthContext → authSlice
- ✅ UserContext → userSlice
- ✅ ThemeContext → themeSlice

### Phase 2: Domain-Specific State (TODO)
Create slices for:
- [ ] Toast/Notifications
- [ ] Cart
- [ ] Booking
- [ ] Order
- [ ] Invoice
- [ ] Inventory
- [ ] Service
- [ ] Supplier
- [ ] Calendar
- [ ] Transaction
- [ ] Accommodation

### Phase 3: Cleanup (TODO)
- [ ] Remove old Context files
- [ ] Update all component imports
- [ ] Test persistence
- [ ] Update documentation

## Usage Examples

### Auth
```typescript
import { useReduxAuth } from '@/hooks/useReduxAuth';

const { isAuthenticated, user, login, logout } = useReduxAuth();

// Login
login(userData, token);

// Logout
logout();
```

### User
```typescript
import { useReduxUser } from '@/hooks/useReduxUser';

const { user, userProfile, updateUserData, patchUser } = useReduxUser();

// Update user
updateUserData(newUserData);

// Partial update
patchUser({ firstName: 'John' });
```

### Theme
```typescript
import { useReduxTheme } from '@/hooks/useReduxTheme';

const { theme, changeTheme, toggleTheme } = useReduxTheme();

// Change theme
changeTheme('dark');

// Toggle theme
toggleTheme();
```

### Direct Redux Access
```typescript
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setUser } from '@/store/slices/userSlice';

const dispatch = useAppDispatch();
const user = useAppSelector((state) => state.user.user);

dispatch(setUser(userData));
```

## Creating New Slices

### Template
```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface YourState {
  // Define state shape
}

const initialState: YourState = {
  // Initial values
};

const yourSlice = createSlice({
  name: 'yourSlice',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<any>) => {
      // Update state
    },
    clearData: (state) => {
      // Reset state
    },
  },
});

export const { setData, clearData } = yourSlice.actions;
export default yourSlice.reducer;
```

### Register in Store
```typescript
// store/index.ts
import yourReducer from './slices/yourSlice';

const rootReducer = combineReducers({
  // ... existing reducers
  yourSlice: yourReducer,
});

// Add to whitelist if persistence needed
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'theme', 'yourSlice'],
};
```

## Persistence

### Persisted State
- `user` - User data persists across sessions
- `theme` - Theme preference persists

### Non-Persisted State
- `auth` - Token managed via cookies

### Adding Persistence
Add slice name to whitelist in `store/index.ts`:
```typescript
whitelist: ['user', 'theme', 'newSlice']
```

## Best Practices

1. **Use Custom Hooks**: Prefer `useReduxAuth()` over direct dispatch
2. **Type Safety**: Always define TypeScript interfaces for state
3. **Immutability**: Redux Toolkit uses Immer, write "mutable" code
4. **Selectors**: Create reusable selectors for complex state access
5. **Async Logic**: Use Redux Toolkit's `createAsyncThunk` for API calls

## Testing

### Test Store Setup
```typescript
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

const testStore = configureStore({
  reducer: rootReducer,
});

<Provider store={testStore}>
  <YourComponent />
</Provider>
```

## Troubleshooting

### State Not Persisting
- Check whitelist in `persistConfig`
- Verify localStorage is available
- Clear browser storage and retry

### Type Errors
- Ensure `RootState` is exported from store
- Use `useAppSelector` instead of `useSelector`
- Use `useAppDispatch` instead of `useDispatch`

### DevTools Not Working
- Check `devTools: import.meta.env.DEV` in store config
- Install Redux DevTools browser extension

## Next Steps

1. Update components to use Redux hooks
2. Remove Context provider wrappers
3. Create slices for domain-specific state
4. Add async thunks for API operations
5. Implement selectors for derived state
