import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const generateKey = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const segments = [7, 7, 7];
  
  return segments
    .map(length => 
      Array.from({ length }, () => 
        chars[Math.floor(Math.random() * chars.length)]
      ).join('')
    )
    .join('-');
};

export default function Index() {
  const [currentKey, setCurrentKey] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [count, setCount] = useState(0);
  const { toast } = useToast();

  const handleGenerate = () => {
    const newKey = `MPRU-${generateKey()}`;
    setCurrentKey(newKey);
    setHistory(prev => [newKey, ...prev.slice(0, 9)]);
    setCount(prev => prev + 1);
  };

  const copyToClipboard = (key: string) => {
    navigator.clipboard.writeText(key);
    toast({
      title: "Скопировано!",
      description: "Ключ скопирован в буфер обмена",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.1),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(217,70,239,0.1),transparent_50%)]" />
      
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-3xl mb-6 shadow-lg">
            <Icon name="Key" size={40} className="text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Генератор Ключей
          </h1>
          <p className="text-lg text-muted-foreground">
            Создавайте уникальные ключи одним нажатием
          </p>
        </div>

        <Card className="mb-8 border-2 shadow-2xl animate-scale-in backdrop-blur-sm bg-white/90">
          <CardContent className="pt-12 pb-12">
            {currentKey ? (
              <div className="space-y-6 animate-fade-in">
                <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-2xl p-8 border-2 border-primary/20">
                  <div className="flex items-center justify-between gap-4">
                    <code className="text-2xl md:text-3xl font-bold font-mono text-primary break-all">
                      {currentKey}
                    </code>
                    <Button
                      size="lg"
                      variant="ghost"
                      onClick={() => copyToClipboard(currentKey)}
                      className="shrink-0 hover:bg-primary/10 hover:scale-110 transition-transform"
                    >
                      <Icon name="Copy" size={24} />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-center gap-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="CheckCircle" size={20} className="text-primary" />
                    <span className="text-sm font-medium">Сгенерировано: {count}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Icon name="Sparkles" size={48} className="text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground text-lg">
                  Нажмите кнопку для генерации ключа
                </p>
              </div>
            )}

            <Button
              size="lg"
              onClick={handleGenerate}
              className="w-full mt-8 h-16 text-xl font-semibold bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-all hover:scale-105 shadow-lg"
            >
              <Icon name="Sparkles" size={24} className="mr-2" />
              Генерировать Ключ
            </Button>
          </CardContent>
        </Card>

        {history.length > 0 && (
          <Card className="border-2 shadow-xl animate-slide-up backdrop-blur-sm bg-white/90">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <Icon name="History" size={20} className="text-primary" />
                <h2 className="text-xl font-bold">История</h2>
              </div>
              
              <div className="space-y-2">
                {history.map((key, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-4 p-4 bg-gradient-to-r from-muted/50 to-muted/30 rounded-xl hover:from-muted/70 hover:to-muted/50 transition-all group"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <code className="font-mono text-sm md:text-base text-foreground/80 break-all">
                      {key}
                    </code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(key)}
                      className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/10"
                    >
                      <Icon name="Copy" size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}