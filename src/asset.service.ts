import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class AssetService {
  locale = 'en';

  constructor(private http: Http) {}

  get(key: string | string[], locale = ''): any {
    if (locale === '') {
      locale = this.locale;
    }

    return this.http.get(`assets/${locale}.json`).map((assets) => {
      let asset = {};

      if (Array.isArray(key)) {
        for (let k of key) {
          asset[k] = this.getAssetFromKey(k, assets.json());
        }
      } else {
        asset = this.getAssetFromKey(key, assets.json());
      }
      return asset;
    });
  }

  private getAssetFromKey(assetKey: string, asset = {}): any {
    for (let key of assetKey.split('.')) {
      if (asset[key]) {
        asset = asset[key];
      } else {
        asset = assetKey;
        break;
      }
    }

    return asset;
  }

  setLocale(locale: string): void {
    if (locale) {
      this.locale = locale;
    }
  }
}
