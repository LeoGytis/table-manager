"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import Chart from "./components/Chart";
import "./globals.css";

export default function Home() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <div className="mx-8">
        {/* <DataTable /> */}
        <Chart />
      </div>
    </QueryClientProvider>
  );
}
