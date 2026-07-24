import { Header, Footer } from "@/components/Navigation";
import DashboardPage from "@/components/DashboardPage";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<div className="flex-1 flex items-center justify-center">Loading...</div>}>
          <DashboardPage />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
