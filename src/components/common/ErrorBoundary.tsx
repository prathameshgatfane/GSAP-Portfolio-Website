import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Portfolio runtime error:', error, errorInfo);
  }

  private handleReload = (): void => {
    window.location.reload();
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            padding: '2rem',
            textAlign: 'center',
            gap: '1rem',
          }}
        >
          <h2 style={{ fontSize: '2rem', color: '#FFFFFF' }}>
            Something went wrong
          </h2>
          <p style={{ color: '#a1a1aa', maxWidth: '420px' }}>
            An unexpected rendering issue occurred. Reload the page to restore the portfolio.
          </p>
          <button
            type="button"
            onClick={this.handleReload}
            style={{
              backgroundColor: '#AC58E9',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '9999px',
              padding: '0.75rem 1.5rem',
              cursor: 'pointer',
              fontSize: '0.95rem',
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
