import React, { useState } from 'react';
import DropdownMenu from '@/components/DropdownMenu/DropdownMenu';
import styles from './Layout.module.css';

const Layout: React.FC = () => {
  const [lastAction, setLastAction] = useState<string>('');

  const menuItems = [
    {
      id: 'social',
      label: 'Подсилился в социальных сетях',
      onClick: () => setLastAction('Социальные сети')
    },
    {
      id: 'edit',
      label: 'Редактировать страницу',
      onClick: () => setLastAction('Редактирование')
    },
    {
      id: 'delete',
      label: 'Удалить страницу',
      onClick: () => setLastAction('Удаление')
    }
  ];

  const ButtonTrigger = ({ text }: { text: string }) => (
    <button className={styles.buttonTrigger} type="button">
      {text}
    </button>
  );

  const IconTrigger = () => (
    <div className={styles.iconTrigger}>
      <span>⋮</span>
    </div>
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Dropdown Menu Demo</h1>
        {lastAction && (
          <div className={styles.actionInfo}>
            Последнее действие: <strong>{lastAction}</strong>
          </div>
        )}
      </header>
      
      <div className={styles.sections}>
        <section className={styles.section}>
          <h2>Left Position</h2>
          <div className={styles.dropdownContainer}>
            <DropdownMenu
              trigger={<ButtonTrigger text="Left Menu" />}
              items={menuItems}
            />
          </div>
        </section>

        <section className={styles.section}>
          <h2>Center Position</h2>
          <div className={styles.dropdownContainer}>
            <DropdownMenu
              trigger={<ButtonTrigger text="Center Menu" />}
              items={menuItems}
            />
          </div>
        </section>

        <section className={styles.section}>
          <h2>Right Position</h2>
          <div className={styles.dropdownContainer}>
            <DropdownMenu
              trigger={<IconTrigger />}
              items={menuItems}
            />
          </div>
        </section>
      </div>

      <div className={styles.scrollContent}>
        <h3>Scroll Area</h3>
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className={styles.scrollItem}>
            Scroll item {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Layout;