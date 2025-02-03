"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import DataTable from "./components/DataTable";
import "./globals.css";

export default function Home() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <div className="mx-20">
        <DataTable />
      </div>
    </QueryClientProvider>
  );
}
