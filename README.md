# Conexa React Native Challenge

## Project Features

1. **TanStack Query for Caching**: useQuery para posts y users con caching automático, evitando refetchs innesecarios.

2. **Search functionality**: Search tuvo que ser implementado en el cliente, dado que la API no soporta filtering.

   - Posts: por title o content.
   - Users: por name o email.
   - Search con debounce vía useDebounce

3. **Favorites System**:

   - Persistido con AsyncStorage.
   - Guardamos el post completo porque el endpoint GET /posts/:id de JSONPlaceholder solo devuelve data válida para el post con ID 1, entonces si solo guardamos el postId después no podríamos reconstruir el contenido. En un entorno real lo ideal sería persistir únicamente el ID y pedir los datos al backend cuando sea necesario.
   - Scoped por usuario (cada usuario tiene su lista independiente).

4. **Login Flow**:

   - Persistencia segura con expo-secure-store.
   - Token actual = username (en un sistema real sería JWT)
   - Protected routes usando Expo Router route groups (protected)

5. **Error Handling**:

   - react-error-boundary + ErrorFallback con retry.

6. **UI/UX Optimization**:

   - Client-side pagination con onEndReached porque la API no soporta pagination.
   - Imágenes placeholder de picsum.photos.

## Design Decisions & Patterns

- Atomic Components: UI components separados de business components.
- Provider Pattern: Context para Auth y Favorites.
- File-based Routing con Expo Router.

## Next Steps:

- Agregar Skeleton loading UI
- Mejorar Handling de Formularios: Reemplazar el login actual por react-hook-form y agregar validaciones client-side básicas (email/password requeridos, formato válido, etc.).
- Agregar sistema multi-idioma: Agregar soporte multi-idioma usando react-i18next

## How to run the project

1. **Prerequisites**: Ensure you have Node.js and npm installed.
2. **Install dependencies**: `npm install`
3. **Environment Variables**: Create a `.env` file or ensure `EXPO_PUBLIC_API_URL` is set to `https://jsonplaceholder.org`.
4. **Start the app**: `npx expo start`
5. **Testing**: Run `npm test` to execute unit tests.
