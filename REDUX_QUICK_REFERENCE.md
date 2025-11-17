# Redux Quick Reference

## Import Hooks

```typescript
// Custom hooks (recommended)
import { useReduxAuth } from '@/hooks/useReduxAuth';
import { useReduxUser } from '@/hooks/useReduxUser';
import { useReduxTheme } from '@/hooks/useReduxTheme';

// Direct Redux hooks
import { useAppDispatch, useAppSelector } from '@/store/hooks';
```

## Auth Operations

```typescript
const { isAuthenticated, token, user, login, logout } = useReduxAuth();

// Login
login(userData, authToken);

// Logout
logout();

// Check auth
if (isAuthenticated) { /* ... */ }
```

## User Operations

```typescript
const { user, userProfile, updateUserData, patchUser, updateProfile } = useReduxUser();

// Full update
updateUserData({ id: '1', name: 'John', email: 'john@example.com' });

// Partial update
patchUser({ name: 'Jane' });

// Update profile
updateProfile(profileData);
```

## Theme Operations

```typescript
const { theme, changeTheme, toggleTheme } = useReduxTheme();

// Change theme
changeTheme('dark');

// Toggle theme
toggleTheme();

// Use theme
<div className={theme === 'dark' ? 'dark-mode' : 'light-mode'}>
```

## Direct Dispatch

```typescript
import { useAppDispatch } from '@/store/hooks';
import { setUser } from '@/store/slices/userSlice';
import { setAuth } from '@/store/slices/authSlice';
import { setTheme } from '@/store/slices/themeSlice';

const dispatch = useAppDispatch();

dispatch(setUser(userData));
dispatch(setAuth({ token: 'abc123' }));
dispatch(setTheme('dark'));
```

## Selectors

```typescript
import { useAppSelector } from '@/store/hooks';

const user = useAppSelector((state) => state.user.user);
const theme = useAppSelector((state) => state.theme.theme);
const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
```

## Creating New Slice

```typescript
// 1. Copy _template.ts
// 2. Rename and modify
// 3. Add to store/index.ts

import yourReducer from './slices/yourSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  theme: themeReducer,
  yourSlice: yourReducer, // Add here
});

// 4. Add to whitelist if persistence needed
whitelist: ['user', 'theme', 'yourSlice']
```

## Context to Redux Migration

### Before (Context)
```typescript
import { useAuth } from '@/context/authContext';
const { isAuthenticated, setIsAuthenticated } = useAuth();
```

### After (Redux)
```typescript
import { useReduxAuth } from '@/hooks/useReduxAuth';
const { isAuthenticated, login, logout } = useReduxAuth();
```

## Common Patterns

### Loading State
```typescript
const [loading, setLoading] = useState(false);

const fetchData = async () => {
  setLoading(true);
  try {
    const data = await api.getData();
    updateUserData(data);
  } finally {
    setLoading(false);
  }
};
```

### Conditional Rendering
```typescript
const { user } = useReduxUser();

if (!user) return <Login />;
return <Dashboard user={user} />;
```

### Protected Routes
```typescript
const { isAuthenticated } = useReduxAuth();

<Route 
  path="/dashboard" 
  element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
/>
```
