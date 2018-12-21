/* global Microsoft */
import Service from '@ember/service';
import Ember from 'ember';

export default Service.extend({
  init() {
    console.log('getBingMaps init');
    let src, $meta = Ember.$('meta[name="ember-bing-map-sdk-url"]');
    if ($meta.length) {
      console.log('getBingMaps found meta');
      src = $meta.attr('content');
      $meta.remove();
      this.set('promise', new Ember.RSVP.Promise(function (resolve, reject) {
        window.__emberBingMapLoaded__ = Ember.run.bind(function () {
          // window.__emberBingMapLoaded__ = null;
          console.log('getBingMaps resolved');
          resolve(Microsoft);
        });
        Ember.$.getScript(src + '?callback=__emberBingMapLoaded__').fail(function (jqXhr) {
          // window.__emberBingMapLoaded__ = null;
          reject(jqXhr);
        });
      }));
    }
  },
  promise: null,
  getBingMaps: function () {
    console.log('getBingMaps');
    return this.get('promise').then(()=> {
      console.log('getBingMaps resolved');
      return Microsoft;
    });
  }
})