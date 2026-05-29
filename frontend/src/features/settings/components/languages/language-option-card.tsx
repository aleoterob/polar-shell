import { Globe, GlobeCheck } from 'lucide-react';
import type { AppLanguage } from '@/shared/i18n/constants';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Label } from '@/shared/components/ui/label';
import { RadioGroupItem } from '@/shared/components/ui/radio-group';
import { cn } from '@/shared/lib/utils';

interface LanguageOptionCardProps {
  language: AppLanguage;
  label: string;
  inputId: string;
  isActive: boolean;
}

export function LanguageOptionCard({
  language,
  label,
  inputId,
  isActive,
}: LanguageOptionCardProps) {
  return (
    <Card
      className={cn(
        'min-h-9 w-44 bg-transparent py-2 shadow-none ring-1 ring-foreground/10',
        isActive && 'bg-settings-card-active-background',
      )}
    >
      <CardContent className="flex h-full min-h-9 items-center justify-between gap-3 px-4 py-0">
        <Label
          htmlFor={inputId}
          className="flex cursor-pointer items-center gap-2 font-normal"
        >
          {isActive ? (
            <GlobeCheck className="size-4 shrink-0" aria-hidden />
          ) : (
            <Globe className="size-4 shrink-0" aria-hidden />
          )}
          {label}
        </Label>
        <RadioGroupItem value={language} id={inputId} />
      </CardContent>
    </Card>
  );
}
