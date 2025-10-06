import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "@/components/Dashboard";
import { ChatAssistant } from "@/components/ChatAssistant";
import { Appointments } from "@/components/Appointments";
import { Tasks } from "@/components/Tasks";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard onNavigate={setActiveSection} />;
      case "chat":
        return <ChatAssistant />;
      case "appointments":
        return <Appointments />;
      case "tasks":
        return <Tasks />;
      case "reminders":
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-foreground mb-4">Lembretes</h2>
            <p className="text-muted-foreground">Seção em desenvolvimento</p>
          </div>
        );
      case "spreadsheets":
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-foreground mb-4">Planilhas</h2>
            <p className="text-muted-foreground">Seção em desenvolvimento</p>
          </div>
        );
      default:
        return <Dashboard onNavigate={setActiveSection} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activeSection={activeSection} onNavigate={setActiveSection} />
      <main className="flex-1 p-8 overflow-y-auto">
        {renderSection()}
      </main>
    </div>
  );
};

export default Index;
