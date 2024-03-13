import { startApp, setupApp, destroyApp } from 'wujie';
type WujieOptions = Parameters<typeof startApp>[0];
type AppInfo = Omit<WujieOptions, 'el'>;
const isDEV = process.env.NODE_ENV === 'development';
const appInfo: AppInfo[] = [
  {
    name: 'mini-program-theme',
    url: isDEV ? 'http://localhost:8080' : 'https://www.baidu.com',
  },
];

const createMicroApp = (
  name: string,
  el: string | HTMLElement,
  extraOptions?: WujieOptions
) => {
  const app = appInfo.find((item) => item.name === name);
  if (app) {
    startApp({
      ...app,
      ...(extraOptions || {}),
      el,
    });
  } else {
    console.warn('no such app');
  }
};
const removeMicroApp = (name: string) => {
  destroyApp(name);
};

export { createMicroApp, removeMicroApp };
