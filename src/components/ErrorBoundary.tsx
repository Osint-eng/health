import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, ShieldAlert } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[Arogya Voice ErrorBoundary caught error]:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  private handleClearStorage = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch {}
    this.handleReset();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800 mx-auto">
              <ShieldAlert className="w-8 h-8 text-amber-700" />
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-bold text-slate-900">
                Application Recovered
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                A display error occurred. Your health safety protocols and stored data are preserved.
              </p>
            </div>

            {this.state.error && (
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-left text-xs font-mono text-slate-700 overflow-x-auto max-h-24">
                {this.state.error.message}
              </div>
            )}

            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={this.handleReset}
                className="flex-1 inline-flex items-center justify-center space-x-2 px-4 py-2.5 bg-teal-800 hover:bg-teal-900 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload Page</span>
              </button>

              <button
                type="button"
                onClick={this.handleClearStorage}
                className="flex-1 inline-flex items-center justify-center space-x-2 px-4 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
              >
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Reset Cache</span>
              </button>
            </div>

            <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-100">
              For acute medical emergencies, immediately dial <strong>108</strong> (Ambulance) or <strong>112</strong>.
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
