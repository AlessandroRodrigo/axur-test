import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export const renderWithProviders = (ui: React.ReactElement) => {
  return render(ui, {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  });
};
