import { INestApplication } from '@nestjs/common';

export class NestApplication {
  private static _app: INestApplication;

  static setApplications(app: INestApplication) {
    this._app = app;
  }

  static getApplication() {
    return this._app;
  }
}
