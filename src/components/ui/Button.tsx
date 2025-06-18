import { FC, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ className, children, ...props }) => (
  <button className={cn('px-6 py-2 rounded-2xl shadow hover:opacity-90', className)} {...props}>{children}</button>
);
export default Button;