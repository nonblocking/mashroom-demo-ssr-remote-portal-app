// Declare modules without existing TypeScript definitions

declare module '*.scss';

declare module '*.svg' {
  const content: string;
  export default content;
}
