import React from 'react';
import styles from './Header.module.scss';

function Header() {
  return (
    <header className={styles.header} data-testid="header">
      <nav className={styles.nav}>
        <div className={styles.navLeft}>
          <a className={styles.title} href="#">
            Task Management Dashboard
          </a>
        </div>
        <div className={styles.navRight}>
          <a className={styles.navLink} href="#about">About</a>
          <a className={styles.navLink} href="#contact">Contact</a>
        </div>
      </nav>
    </header>
  );
}

export default Header;
