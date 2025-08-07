import React from 'react';
import { Link } from 'react-router-dom';

/**
 * A simple SVG icon to provide a visual cue for the "not found" state.
 * You can easily replace this with any other SVG, image, or component library icon.
 */
const LostIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100"
    height="100"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ color: '#94a3b8', marginBottom: '16px' }}
  >
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72" />
  </svg>
);

/**
 * A user-friendly "Not Found" page component.
 * It informs the user that the requested page doesn't exist and provides
 * a clear action to navigate back to the homepage.
 */
const NotFoundPage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <LostIcon />
        <h1 style={styles.title}>404 - Page Not Found</h1>
        <p style={styles.description}>
          Sorry, the page you are looking for could not be found. It might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link to="/" style={styles.button}>
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

/**
 * A simple object for styling the component.
 * For larger applications, you might prefer CSS Modules, Tailwind CSS,
 * or a dedicated CSS-in-JS library like Emotion or styled-components.
 */
const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    backgroundColor: '#f8fafc',
    color: '#1e293b',
    textAlign: 'center',
    padding: '20px',
  },
  content: {
    maxWidth: '600px',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '600',
    color: '#0f172a',
    margin: '0 0 16px 0',
  },
  description: {
    fontSize: '1.125rem',
    color: '#475569',
    lineHeight: '1.6',
    marginBottom: '32px',
  },
  button: {
    display: 'inline-block',
    padding: '14px 28px',
    backgroundColor: '#0f172a',
    color: '#ffffff',
    textDecoration: 'none',
    borderRadius: '8px',
    fontWeight: '500',
    fontSize: '1rem',
    transition: 'background-color 0.2s ease-in-out, transform 0.1s ease',
  },
};

export default NotFoundPage;
