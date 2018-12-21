import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  bingMapService: service(),
  init() {
    this._super();
    console.log('bing-map init');
    return this.get('bingMapService').getBingMaps().then(Microsoft => {
      this.set('didInitialize', true);
      this.set('microsoft', Microsoft);
    });
  }
});