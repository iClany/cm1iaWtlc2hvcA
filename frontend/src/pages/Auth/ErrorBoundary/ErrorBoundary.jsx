import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './ErrorBoundary.module.css';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorBoundaryContainer}>
          <div className={styles.errorBoundaryCard}>
            <h2>Что-то пошло не так</h2>
            <p>
              К сожалению, произошла ошибка. Пожалуйста, попробуйте перезагрузить страницу
              или вернуться на главную.
            </p>
            <Link to="/">
              <button>Вернуться на главную</button>
            </Link>
            {process.env.NODE_ENV === 'development' && (
              <div className={styles.errorDetails}>
                <details>
                  <summary>Подробности ошибки</summary>
                  {this.state.error && this.state.error.toString()}
                  <br />
                  {this.state.errorInfo?.componentStack}
                </details>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
} 