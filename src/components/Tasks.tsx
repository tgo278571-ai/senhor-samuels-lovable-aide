import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckSquare, Plus, Circle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Tasks = () => {
  const tasks = [
    { id: 1, title: "Revisar proposta comercial", priority: "Alta", category: "Trabalho", completed: false },
    { id: 2, title: "Preparar apresentação", priority: "Alta", category: "Trabalho", completed: false },
    { id: 3, title: "Responder e-mails", priority: "Média", category: "Trabalho", completed: false },
    { id: 4, title: "Comprar mantimentos", priority: "Média", category: "Pessoal", completed: false },
    { id: 5, title: "Agendar consulta dentista", priority: "Baixa", category: "Pessoal", completed: true },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Alta":
        return "bg-destructive text-destructive-foreground";
      case "Média":
        return "bg-accent text-accent-foreground";
      case "Baixa":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Tarefas</h1>
          <p className="text-muted-foreground">Organize e acompanhe suas tarefas diárias</p>
        </div>
        <Button className="bg-gradient-to-r from-accent to-accent-glow hover:opacity-90 text-accent-foreground shadow-[var(--shadow-accent)]">
          <Plus className="h-4 w-4 mr-2" />
          Nova Tarefa
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-gradient-to-br from-card to-card/50 border-border shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <CheckSquare className="h-5 w-5 text-accent" />
              Lista de Tarefas
            </CardTitle>
            <CardDescription>Todas as suas tarefas em um só lugar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center gap-4 p-4 rounded-lg transition-[var(--transition-smooth)] cursor-pointer border ${
                  task.completed
                    ? "bg-muted/30 border-border opacity-60"
                    : "bg-muted/50 hover:bg-muted border-border"
                }`}
              >
                <div className={`h-5 w-5 rounded border-2 flex items-center justify-center ${
                  task.completed ? "bg-accent border-accent" : "border-muted-foreground"
                }`}>
                  {task.completed && <CheckSquare className="h-4 w-4 text-accent-foreground" />}
                </div>
                <div className="flex-1">
                  <h3 className={`font-medium ${task.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                    {task.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{task.category}</p>
                </div>
                <Badge className={getPriorityColor(task.priority)}>
                  {task.priority}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-card to-card/50 border-border shadow-[var(--shadow-card)]">
            <CardHeader>
              <CardTitle className="text-foreground">Resumo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Total de Tarefas</span>
                <span className="text-2xl font-bold text-foreground">{tasks.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Concluídas</span>
                <span className="text-2xl font-bold text-accent">
                  {tasks.filter((t) => t.completed).length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Pendentes</span>
                <span className="text-2xl font-bold text-primary">
                  {tasks.filter((t) => !t.completed).length}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary to-primary-glow border-none shadow-[var(--shadow-elegant)] text-primary-foreground">
            <CardHeader>
              <CardTitle>Dica Lovable</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-primary-foreground/90">
                Peça para eu criar listas de tarefas personalizadas ou sugerir prioridades baseadas em sua agenda
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
