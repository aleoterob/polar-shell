import { motion } from 'framer-motion';
import { ArrowBigRight } from 'lucide-react';
import {
  arrowAnimate,
  arrowTransition,
} from '@/features/welcome/animations/arrow-animation';

export function AnimatedArrow() {
  return (
    <motion.span
      animate={arrowAnimate}
      transition={arrowTransition}
      className="inline-flex shrink-0 text-foreground"
      aria-hidden
    >
      <ArrowBigRight className="size-4" strokeWidth={2} />
    </motion.span>
  );
}
