import React from 'react'

import styles from 'styles/Card.module.scss'

export default function Card({
  title = '',
  children,
  disabled = false,
  hasFooter = false,
  btnText = '',
  onBtnClick = () => {}
}) {
  return (
    <section className={styles.card}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.content}>{children}</div>
      {hasFooter && (
        <div className={styles.footer}>
          {btnText && (
            <button
              type="button"
              className={styles.button}
              disabled={disabled}
              onClick={onBtnClick}
            >
              {btnText}
            </button>
          )}
        </div>
      )}
    </section>
  )
}
