import React from 'react'

import styles from './Card.module.scss'

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
      <h2 className={styles.card__title}>{title}</h2>
      <div className={styles.card__content}>{children}</div>
      {hasFooter && (
        <div className={styles.card__footer}>
          {btnText && (
            <button
              type="button"
              className={styles.card__button}
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
