import { Button } from '@/shared/ui/kit/button';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from '@/shared/ui/kit/form';
import { Input } from '@/shared/ui/kit/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignup } from '../model/use-signup';

const loginSchema = z
  .object({
    email: z.string({ required_error: 'Email is required' }).email('Invalid email address'),
    password: z
      .string({ required_error: 'Password is required' })
      .min(4, 'Password must be at least 4 characters long'),
    confirmPassword: z.string({
      required_error: 'Confirm Password is required',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords must match',
  });

export function SignupForm({ submitText }: { submitText: string }) {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const { signup, isPending, errorMessage } = useSignup();

  const onSubmit = form.handleSubmit(signup);

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>email</FormLabel>
              <FormControl>
                <Input className="rounded-xs" placeholder="name@mail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>password</FormLabel>
              <FormControl>
                <Input type="password" className="rounded-xs" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>confirm password</FormLabel>
              <FormControl>
                <Input type="password" className="rounded-xs" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {!!errorMessage && <p className="text-destructive text-sm">{errorMessage.message}</p>}
        <Button disabled={isPending} type="submit">
          {submitText}
        </Button>
      </form>
    </Form>
  );
}
