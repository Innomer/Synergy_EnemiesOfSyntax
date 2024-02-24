"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import type { FC, ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

const ReactQueryClientProvider: FC<LayoutProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryClientProvider;
