import { FC, ReactNode } from 'react';
import { cn } from '@/lib/utils';

const Card: FC<{ children: ReactNode; className?: string }> = ({ children, className }) => (
   <div
     className={cn(
       // translucent backdrop
       'backdrop-blur-lg bg-white/10 dark:bg-black/30 border border-white/20',
       // keep your rounding, padding and drop-shadow
       'rounded-2xl p-6 shadow-lg',
       className
     )}
   >
     {children}
   </div>
 );
export default Card;