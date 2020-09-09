import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import gsap from 'gsap';
import cn from 'classnames';
import styles from './styles.module.scss';
import DetailView from '../detail-view';

function ListItem({ name, description, user, image }) {
  const rootEl = useRef();
  const articleEl = useRef();
  const detailViewBgEl = useRef();
  const [descriptionText, setDescriptionText] = useState('');
  const [isDetailView, setIsDetailView] = useState(false);

  useEffect(() => {
    // Change descriptionText length based on DetailView visiblity
    // Show full length description when DetailView is visible and
    // trim description when its not.
    let text = description;
    if ((description && description.length > 50) && !isDetailView) {
      text = `${description.substring(0, 50)}...`;
    }
    setDescriptionText(text);
  }, [isDetailView, description]);
  

  function openDetailView() {
    if (isDetailView) return;
    const { top, left } = rootEl.current.getBoundingClientRect();
    gsap.set(articleEl.current, { top, left, x: 0 });
    gsap.to(detailViewBgEl.current, { opacity: 0.9, duration: 0.33 });
    gsap.to(articleEl.current, {
      top: '10%',
      left: '50%',
      x: '-50%',
      maxWidth: '800px',
      maxHeight: '80vh',
      duration: 0.6,
      ease: 'power3.out',
    });
    setIsDetailView(true);
  }

  function closeDetailView() {
    if (!isDetailView) return;
    const { top, left } = rootEl.current.getBoundingClientRect();
    gsap.to(detailViewBgEl.current, { opacity: 0, duration: 0.33 });
    gsap.to(articleEl.current, {
      top,
      left,
      x: '0%',
      maxWidth: '360px',
      maxHeight: '128px',
      duration: 0.3,
      ease: 'sine.out',
      onComplete() {
        gsap.set(articleEl.current, { clearProps: 'transform,left,top' });
        setIsDetailView(false);
      }
    });
  }

  return (
    <li
      ref={rootEl}
      className={styles.container}
    >
      <div
        ref={detailViewBgEl}
        onClick={closeDetailView}
        className={cn(
          styles['detail-view-bg'],
          { [styles['detail-view-bg--is-visible']]: isDetailView },
        )}
      />
      <article
        ref={articleEl}
        onClick={openDetailView}
        className={cn(
          styles.article,
          { [styles['article--is-collapsed']]: !isDetailView },
          { [styles['article--is-expanded']]: isDetailView },
        )}
      >
        <div className={styles['article-header']}>
          <figure className={styles.image}>
            <img
              src={
                image ||
                'https://bulma.io/images/placeholders/128x128.png'
              }
              alt="Images"
            />
          </figure>
          <div className={styles.content}>
            <p>
              <strong>{ name }</strong>
              <small> @{ user }</small>
            </p>
            <p>
              { descriptionText }
            </p>
          </div>
        </div>
        {
          isDetailView && (
            <DetailView repoName={name} ownerLogin={user} />
          )
        }
      </article>
    </li>
  );
}

ListItem.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  user: PropTypes.string,
}

export default ListItem;