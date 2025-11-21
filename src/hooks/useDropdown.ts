import { useState, useRef, useEffect, useCallback } from 'react';
import type { Position } from '@/types/dropdown';

export const useDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<Position>('bottom-right');
  const [wasVisible, setWasVisible] = useState(false); // Для отслеживания повторного открытия
  
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

  // Простые функции управления состоянием
  const close = useCallback(() => setIsOpen(false), []);
  const open = useCallback(() => setIsOpen(true), []);

  // Упрощенный toggle без глобальной переменной
  const toggle = useCallback(() => {
    if (isOpen) {
      close();
    } else {
      open();
      setTimeout(calculatePosition, 0);
    }
  }, [isOpen, close, open, calculatePosition]);

  useEffect(() => {
    // Функция проверки видимости триггера
    const checkTriggerVisibility = () => {
      if (!triggerRef.current) return false;
      const rect = triggerRef.current.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    };

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

    // Исправленный обработчик скролла с функционалом "отображать снова"
    const handleScroll = () => {
      const isCurrentlyVisible = checkTriggerVisibility();
      
      if (isOpen) {
        calculatePosition();
        
        // Закрываем если триггер скрылся из viewport
        if (!isCurrentlyVisible) {
          close();
          setWasVisible(true); // Запоминаем что был открыт для повторного открытия
        }
      } else {
        // ОТКРЫВАЕМ СНОВА если триггер появился и ранее был открыт
        if (isCurrentlyVisible && wasVisible) {
          open();
          setWasVisible(false); // Сбрасываем флаг
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
    } else {
      // Слушаем скролл даже когда закрыт для функционала повторного открытия
      window.addEventListener('scroll', handleScroll, true);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen, close, open, calculatePosition, wasVisible]); // Добавлена зависимость wasVisible

  return {
    isOpen,
    position,
    triggerRef,
    contentRef,
    toggle,
    close,
    open, // Добавлена функция open для тестов
  };
};