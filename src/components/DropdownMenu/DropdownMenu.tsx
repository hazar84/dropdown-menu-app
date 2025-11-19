import React from 'react';
import { useDropdown } from '@/hooks/useDropdown';
import { getPositionStyles } from '@/utils/position';
import type { DropdownMenuProps } from '@/types/dropdown';
import styles from './DropdownMenu.module.css';

const DropdownMenu: React.FC<DropdownMenuProps> = ({ 
  trigger, 
  items, 
  className = '' 
}) => {
  const { 
    isOpen, 
    position, 
    triggerRef, 
    contentRef, 
    toggle, 
    close 
  } = useDropdown();

  const handleItemClick = (onClick: () => void): void => {
    onClick();
    close();
  };

  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggle();
    } else if (event.key === 'Escape' && isOpen) {
      close();
    }
  };

  return (
    <div className={`${styles.dropdown} ${className}`}>
      <div 
        ref={triggerRef}
        className={styles.trigger}
        onClick={toggle}
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {trigger}
      </div>
      
      {isOpen && (
        <div
          ref={contentRef}
          className={styles.content}
          style={getPositionStyles(position)}
          role="menu"
        >
          {items.map((item) => (
            <button
              key={item.id}
              className={styles.item}
              onClick={() => handleItemClick(item.onClick)}
              type="button"
              role="menuitem"
            >
              {item.icon && (
                <span className={styles.icon}>{item.icon}</span>
              )}
              <span className={styles.label}>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;