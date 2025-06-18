import { FC, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({ className, ...props }) => (
  <input className={cn('w-full p-3 bg-background-dark rounded-md border border-secondary', className)} {...props} />
);
export default Input;