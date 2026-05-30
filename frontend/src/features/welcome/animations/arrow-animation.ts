import type { TargetAndTransition, Transition } from 'framer-motion';

export const arrowAnimate: TargetAndTransition = {
  x: [0, 4, 0],
};

export const arrowTransition: Transition = {
  duration: 1.6,
  ease: 'easeInOut',
  repeat: Infinity,
};
