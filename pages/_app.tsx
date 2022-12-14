import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { useState } from "react";
import Layout from "../components/Layout";
import useHasHydrated from "../hooks/useHasHydrated";
import "../styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient());
  const hasHydrated = useHasHydrated();

  return (
    <QueryClientProvider client={queryClient}>
      {hasHydrated && (
        <Hydrate state={pageProps.dehydratedState}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Hydrate>
      )}
    </QueryClientProvider>
  );
};
export default App;
