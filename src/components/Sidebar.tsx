import { LayoutDashboard, Calendar, CheckSquare, Bell, FileSpreadsheet, MessageSquare, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export const Sidebar = ({ activeSection, onNavigate }: SidebarProps) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "chat", label: "Chat Lovable", icon: MessageSquare },
    { id: "appointments", label: "Compromissos", icon: Calendar },
    { id: "tasks", label: "Tarefas", icon: CheckSquare },
    { id: "reminders", label: "Lembretes", icon: Bell },
    { id: "spreadsheets", label: "Planilhas", icon: FileSpreadsheet },
  ];

  return (
    <aside className="w-64 min-h-screen bg-gradient-to-b from-sidebar to-sidebar/95 border-r border-sidebar-border shadow-[var(--shadow-elegant)] p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-sidebar-foreground mb-1">Lovable</h2>
        <p className="text-sm text-sidebar-foreground/70">Assistente Pessoal</p>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <Button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-[var(--transition-smooth)]",
                isActive && "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground shadow-[var(--shadow-accent)]"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Button>
          );
        })}
      </nav>

      <div className="absolute bottom-6 left-6 right-6">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-[var(--transition-smooth)]"
        >
          <Settings className="h-5 w-5" />
          Configurações
        </Button>
      </div>
    </aside>
  );
};
