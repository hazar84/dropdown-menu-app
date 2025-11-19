import { useState, useRef, useEffect, useCallback } from 'react';
import type { Position } from '@/types/dropdown';

let activeDropdown: (() => void) | null = null;

export const useDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<Position>('bottom-right');
  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !contentRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const contentHeight = 200;
    const contentWidth = 260;

    const spaceBelow = viewportHeight - triggerRect.bottom;
    const spaceAbove = triggerRect.top;
    const spaceRight = viewportWidth - triggerRect.right;
    const spaceLeft = triggerRect.left;

    let newPosition: Position;

    if (spaceBelow >= contentHeight || spaceBelow >= spaceAbove) {
      if (spaceRight >= contentWidth || spaceRight >= spaceLeft) {
        newPosition = 'bottom-right';
      } else {
        newPosition = 'bottom-left';
      }
    } else {
      if (spaceRight >= contentWidth || spaceRight >= spaceLeft) {
        newPosition = 'top-right';
      } else {
        newPosition = 'top-left';
      }
    }

    setPosition(newPosition);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    if (activeDropdown === close) {
      activeDropdown = null;
    }
  }, []);

  const toggle = useCallback(() => {
    setIsOpen(prev => {
      const newState = !prev;
      
      if (newState) {
        if (activeDropdown && activeDropdown !== close) {
          activeDropdown();
        }
        activeDropdown = close;
        setTimeout(calculatePosition, 0);
      } else {
        if (activeDropdown === close) {
          activeDropdown = null;
        }
      }
      
      return newState;
    });
  }, [close, calculatePosition]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        triggerRef.current && 
        !triggerRef.current.contains(event.target as Node) &&
        contentRef.current && 
        !contentRef.current.contains(event.target as Node)
      ) {
        close();
      }
    };

    const handleScroll = () => {
      if (isOpen) {
        calculatePosition();
        
        if (triggerRef.current) {
          const rect = triggerRef.current.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
          if (!isVisible) {
            close();
          }
        }
      }
    };

    const handleResize = () => {
      if (isOpen) {
        calculatePosition();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('scroll', handleScroll, true);
      window.addEventListener('resize', handleResize);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen, close, calculatePosition]);

  useEffect(() => {
    return () => {
      if (activeDropdown === close) {
        activeDropdown = null;
      }
    };
  }, [close]);

  return {
    isOpen,
    position,
    triggerRef,
    contentRef,
    toggle,
    close,
  };
};