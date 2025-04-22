import { Component, ComponentType, PropsWithChildren, ReactNode } from 'react';
import { FallbackProps } from 'react-error-boundary';

interface Props extends PropsWithChildren {
  onReset?: () => void;
  FallbackComponent: ComponentType<FallbackProps & { children?: ReactNode }>;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundaryWithChildren extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  resetErrorBoundary = () => {
    this.setState({ hasError: false, error: null });
    this.props.onReset?.();
  };

  render() {
    const { hasError, error } = this.state;
    const { FallbackComponent, children } = this.props;

    if (hasError && error) {
      return <FallbackComponent error={error} resetErrorBoundary={this.resetErrorBoundary} children={children} />;
    }

    return children;
  }
}
