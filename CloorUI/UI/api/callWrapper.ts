// @ts-ignore
import * as Fetch from "whatwg-fetch";
import config from "./config";
import { BaseAPI, Configuration, Middleware, ResponseContext } from "./src";

export type ApiConstructor<T extends BaseAPI> = new (config: Configuration) => T;

const unauthenticatedResponseHandlerMiddleware: Middleware = {
  post: async (context: ResponseContext): Promise<Response | void> => {
    if (context.response.status === 401) {
      console.warn("Received 401 from API, redirecting to login service"); // tslint:disable-line no-console
      if (document.location) {
        window.localStorage.setItem("token", "")
        document.location.href = "/";
      }
    }
  },
};

const call = <T extends BaseAPI>(api: ApiConstructor<T>): T => {
  return new api(
    new Configuration({
      fetchApi: Fetch.fetch,
      basePath: config.basePath,
      middleware: [unauthenticatedResponseHandlerMiddleware],
    }),
  );
};

export { call };