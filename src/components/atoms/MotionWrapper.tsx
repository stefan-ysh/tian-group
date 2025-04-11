'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import { motion } from 'framer-motion';

export interface MotionWrapperProps {
  children: ReactNode;
  className?: string;
  initial?: any;
  animate?: any;
  transition?: any;
  whileHover?: any;
  [key: string]: any; // 允许其他属性
}

const MotionWrapper = ({ children, ...props }: MotionWrapperProps) => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) {
    return <div {...props}>{children}</div>;
  }
  
  return <motion.div {...props}>{children}</motion.div>;
};

export default MotionWrapper; 