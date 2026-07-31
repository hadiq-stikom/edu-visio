import { Header, Footer } from "@/components/Navigation";
import DashboardPage from "@/components/DashboardPage";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <DashboardPage />
      </main>
      <Footer />
    </div>
  );
}
