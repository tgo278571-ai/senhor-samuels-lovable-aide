import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Plus } from "lucide-react";

export const Appointments = () => {
  const appointments = [
    { id: 1, title: "Reunião com equipe", date: "Hoje", time: "14:00", category: "Trabalho", color: "bg-primary" },
    { id: 2, title: "Consulta médica", date: "Amanhã", time: "10:30", category: "Pessoal", color: "bg-accent" },
    { id: 3, title: "Apresentação de projeto", date: "Sex, 10/01", time: "15:00", category: "Trabalho", color: "bg-primary" },
    { id: 4, title: "Jantar com família", date: "Sáb, 11/01", time: "19:30", category: "Pessoal", color: "bg-accent" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Compromissos</h1>
          <p className="text-muted-foreground">Gerencie sua agenda e compromissos</p>
        </div>
        <Button className="bg-gradient-to-r from-accent to-accent-glow hover:opacity-90 text-accent-foreground shadow-[var(--shadow-accent)]">
          <Plus className="h-4 w-4 mr-2" />
          Novo Compromisso
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-gradient-to-br from-card to-card/50 border-border shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Calendar className="h-5 w-5 text-primary" />
              Próximos Compromissos
            </CardTitle>
            <CardDescription>Todos os compromissos agendados</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-[var(--transition-smooth)] cursor-pointer border border-border"
              >
                <div className={`h-12 w-1 rounded-full ${appointment.color}`} />
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{appointment.title}</h3>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {appointment.date}
                    </span>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {appointment.time}
                    </span>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-background text-xs font-medium text-foreground">
                  {appointment.category}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-card to-card/50 border-border shadow-[var(--shadow-card)]">
            <CardHeader>
              <CardTitle className="text-foreground">Calendário</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-square bg-muted/30 rounded-lg flex items-center justify-center">
                <Calendar className="h-16 w-16 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary to-primary-glow border-none shadow-[var(--shadow-elegant)] text-primary-foreground">
            <CardHeader>
              <CardTitle>Dica Lovable</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-primary-foreground/90">
                Use o chat para adicionar compromissos rapidamente. Basta dizer "Lovable, marque uma reunião para amanhã às 14h"
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
