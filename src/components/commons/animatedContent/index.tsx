import { Transition, Variants, motion, useInView } from 'framer-motion';
import React from 'react';

type AnimatedContentProps = {
  children: React.ReactNode;
  defaultVariants?: Variants;
  variants?: Variants;
  transition?: Transition;
};

const initialDefaultVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

export default function AnimatedContent({
  children,
  defaultVariants = initialDefaultVariants,
  variants,
  transition = { type: 'spring' },
}: AnimatedContentProps): JSX.Element {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const finalVariants = variants || defaultVariants;

  const finalTransition = {
    type: 'spring',
    ...transition,
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={finalVariants}
      transition={finalTransition}
    >
      {children}
    </motion.div>
  );
}
