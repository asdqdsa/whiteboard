import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/shared/ui/kit/card';

export function AuthLayout({
  form,
  title,
  description,
  footerText,
}: {
  form: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  footerText: React.ReactNode;
}) {
  return (
    <main className="flex flex-col items-center pt-[200px]">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription className="text-xs">{description}</CardDescription>
        </CardHeader>
        <CardContent>{form}</CardContent>
        <CardFooter>
          <p className="text-muted-foreground [&_a]:text-primary text-xs [&_a]:underline">{footerText}</p>
        </CardFooter>
      </Card>
    </main>
  );
}
