import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, CheckSquare, Bell, FileSpreadsheet, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardProps {
  onNavigate: (section: string) => void;
}

export const Dashboard = ({ onNavigate }: DashboardProps) => {
  const quickStats = [
    { label: "Compromissos Hoje", value: "3", icon: Calendar, color: "text-primary" },
    { label: "Tarefas Pendentes", value: "7", icon: CheckSquare, color: "text-accent" },
    { label: "Lembretes Ativos", value: "5", icon: Bell, color: "text-primary" },
    { label: "Planilhas", value: "4", icon: FileSpreadsheet, color: "text-accent" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Bem-vindo, Senhor Samuel</h1>
        <p className="text-muted-foreground">Aqui está um resumo da sua agenda e tarefas</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat) => (
          <Card key={stat.label} className="bg-gradient-to-br from-card to-card/50 border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-[var(--transition-smooth)]">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-card to-card/50 border-border shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Calendar className="h-5 w-5 text-primary" />
              Próximos Compromissos
            </CardTitle>
            <CardDescription>Seus compromissos para hoje e amanhã</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-[var(--transition-smooth)]">
              <div>
                <p className="font-medium text-foreground">Reunião com equipe</p>
                <p className="text-sm text-muted-foreground">Hoje, 14:00</p>
              </div>
              <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-[var(--transition-smooth)]">
              <div>
                <p className="font-medium text-foreground">Consulta médica</p>
                <p className="text-sm text-muted-foreground">Amanhã, 10:30</p>
              </div>
              <div className="h-2 w-2 rounded-full bg-primary" />
            </div>
            <Button onClick={() => onNavigate("appointments")} variant="outline" className="w-full mt-2">
              Ver Todos os Compromissos
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/50 border-border shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <CheckSquare className="h-5 w-5 text-accent" />
              Tarefas Prioritárias
            </CardTitle>
            <CardDescription>Tarefas que requerem sua atenção</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-[var(--transition-smooth)]">
              <div className="h-4 w-4 rounded border-2 border-accent" />
              <span className="text-foreground">Revisar proposta comercial</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-[var(--transition-smooth)]">
              <div className="h-4 w-4 rounded border-2 border-accent" />
              <span className="text-foreground">Preparar apresentação</span>
            </div>
            <Button onClick={() => onNavigate("tasks")} variant="outline" className="w-full mt-2">
              Ver Todas as Tarefas
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-br from-primary to-primary-glow border-none shadow-[var(--shadow-elegant)] text-primary-foreground">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Converse com Lovable
          </CardTitle>
          <CardDescription className="text-primary-foreground/80">
            Sua assistente pessoal está pronta para ajudar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-primary-foreground/90">
            Peça para organizar sua agenda, criar listas, gerar planilhas ou qualquer outra tarefa que precise.
          </p>
          <Button 
            onClick={() => onNavigate("chat")} 
            variant="secondary"
            className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          >
            Abrir Chat com Lovable
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
