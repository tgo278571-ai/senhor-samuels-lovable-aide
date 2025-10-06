import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

export const ChatAssistant = () => {
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([
    {
      role: "assistant",
      content: "Olá, Senhor Samuel! Sou a Lovable, sua assistente pessoal. Como posso ajudá-lo hoje? Posso organizar sua agenda, criar listas, gerar planilhas ou qualquer outra coisa que precise.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const streamChat = async (userMessages: Array<{ role: string; content: string }>) => {
    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: userMessages }),
      });

      if (resp.status === 429) {
        toast({
          title: "Limite excedido",
          description: "Muitas requisições. Tente novamente em alguns instantes.",
          variant: "destructive",
        });
        return;
      }

      if (resp.status === 402) {
        toast({
          title: "Créditos necessários",
          description: "Adicione créditos para continuar usando a IA.",
          variant: "destructive",
        });
        return;
      }

      if (!resp.ok || !resp.body) throw new Error("Falha ao conectar com a IA");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let streamDone = false;
      let assistantContent = "";

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              setMessages((prev) => {
                const lastMsg = prev[prev.length - 1];
                if (lastMsg?.role === "assistant" && prev.length > 1) {
                  return prev.map((m, i) => 
                    i === prev.length - 1 ? { ...m, content: assistantContent } : m
                  );
                }
                return [...prev, { role: "assistant", content: assistantContent }];
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
    } catch (e) {
      console.error("Erro no chat:", e);
      toast({
        title: "Erro",
        description: "Não foi possível conectar com a IA. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    const newMessages = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    await streamChat(newMessages);
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Chat com Lovable</h1>
        <p className="text-muted-foreground">Sua assistente pessoal inteligente</p>
      </div>

      <Card className="h-[600px] flex flex-col bg-gradient-to-br from-card to-card/50 border-border shadow-[var(--shadow-elegant)]">
        <CardHeader className="border-b border-border">
          <CardTitle className="text-foreground">Assistente Pessoal</CardTitle>
          <CardDescription>Pronta para organizar seu dia e responder suas perguntas</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-6 space-y-4" ref={scrollRef}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.role === "user"
                    ? "bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-[var(--shadow-accent)]"
                    : "bg-muted text-foreground"
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted text-foreground rounded-lg p-4 flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">Lovable está pensando...</span>
              </div>
            </div>
          )}
        </CardContent>
        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Digite sua mensagem para Lovable..."
              disabled={isLoading}
              className="flex-1 bg-background border-border"
            />
            <Button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-gradient-to-r from-accent to-accent-glow hover:opacity-90 text-accent-foreground shadow-[var(--shadow-accent)]"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </Card>

      <Card className="bg-gradient-to-br from-card to-card/50 border-border shadow-[var(--shadow-card)]">
        <CardHeader>
          <CardTitle className="text-foreground">Exemplos do que posso fazer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="p-3 rounded-lg bg-muted/50 hover:bg-muted cursor-pointer transition-[var(--transition-smooth)]">
            <p className="text-sm text-foreground">"Lovable, organize minha rotina de amanhã"</p>
          </div>
          <div className="p-3 rounded-lg bg-muted/50 hover:bg-muted cursor-pointer transition-[var(--transition-smooth)]">
            <p className="text-sm text-foreground">"Lovable, me lembre de pagar a conta de luz dia 10"</p>
          </div>
          <div className="p-3 rounded-lg bg-muted/50 hover:bg-muted cursor-pointer transition-[var(--transition-smooth)]">
            <p className="text-sm text-foreground">"Lovable, faça uma planilha de controle financeiro"</p>
          </div>
          <div className="p-3 rounded-lg bg-muted/50 hover:bg-muted cursor-pointer transition-[var(--transition-smooth)]">
            <p className="text-sm text-foreground">"Lovable, monte uma lista de compras"</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
