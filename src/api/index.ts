// Export the enhanced API client
export { default as api } from './client';

// Export query client
export { queryClient } from './queryClient';

// Export services
export { default as AuthApi } from './services/auth';
export { default as CategoryApi } from './services/category';

// Export hooks
export { useAuth } from '../hooks/useAuth';
export { useCategories, useCategory } from '../hooks/useCategory';