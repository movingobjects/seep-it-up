// Allow CSS custom properties (e.g. `--col-count`) in style props
declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}

export {};
