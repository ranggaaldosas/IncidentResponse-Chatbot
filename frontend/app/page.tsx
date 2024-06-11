import Header from "@/app/components/header";
import ChatSection from "./components/chat-section";

export default function Home() {
  return (
    <main className="flex min-h-screen background-gradient">
      <div className="w-1/4 flex flex-col items-center p-4">
        <Header />
      </div>
      <div className="flex-grow flex flex-col items-center gap-10 p-24">
        <ChatSection />
      </div>
    </main>
  );
}
