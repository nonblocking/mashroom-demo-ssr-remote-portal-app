declare module 'webpack-hot-middleware' {
  const middleware: any;
  export interface Options {
    [key: string]: any;
  }

  export default middleware;
}
