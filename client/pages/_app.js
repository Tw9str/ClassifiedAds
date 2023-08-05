import "@/styles/globals.css";
import "tailwindcss/tailwind.css";
import Layout from "@/components/common/Layout";
import { useRouter } from "next/router";
import rootReducer from "@/state/authSlice";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const persistConfig = { key: "root", storage, version: 1 };

  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });

  if (router.pathname.startsWith("/dashboard")) {
    return <Component {...pageProps} />;
  }
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>
  );
}
