import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import {
  App,
  AppHandler,
  AppInformation
} from '@narik/micro-frontends-infrastructure';
import { VueAppHostComponent } from './vue-app-host/vue-app-host.component';

@Injectable()
export class VueAppHandler extends AppHandler {
  private readonly handlerKey = 'vue-app';
  readonly order = 0;

  constructor(private router: Router) {
    super();
  }

  canHandle(app: AppInformation): boolean {
    return app.handle.type === this.handlerKey;
  }

  initialize(
    app: AppInformation<
      any,
      { type: string; module: string; path?: string },
      any
    >,
    loadedApp: any,
    parameters: { [key: string]: any },
    injector: Injector
  ): Promise<App> {
    this.router.config.push({
      path: app.handle.path ?? app.key,
      component: VueAppHostComponent,
      data: {
        app,
      },
    });
    return Promise.resolve({});
  }

  activate(
    app: AppInformation<
      any,
      { type: string; creator: string; path?: string },
      any
    >,
    loadedApp: any,
    parameters: { [key: string]: any },
    injector: Injector
  ) {
    const vueApp = loadedApp[app.handle.creator]();
    return Promise.resolve(vueApp);
  }
}
