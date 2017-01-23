import Ember from 'ember';

import BaseAdapter from 'ember-metrics/metrics-adapters/base';
import canUseDOM from 'ember-metrics/utils/can-use-dom';
import {without} from 'ember-metrics/utils/object-transforms';


export default BaseAdapter.extend({
  toStringExtension() {
    return 'FacebookPixel';
  },

  init() {
    const id = this.get('config.id');

    Ember.assert(
        `[ember-metrics] You must pass a valid \`id\` to the ${this.toString()} adapter`, id
    );

    if (canUseDOM) {
        /* jshint ignore:start */
        !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
        n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
            document,'script','//connect.facebook.net/en_US/fbevents.js');
        /* jshint ignore:end */
        window.fbq('init', id);
    }
  },

  trackEvent(options={}) {
    const event = options.event;
    const props = without(options, 'event');

    if (Object.keys(props).length > 0) {
      window.fbq('track', event, props);
    } else {
      window.fbq('track', event);
    }
  },

  trackCustom(options={}) {
    const event = options.event;
    const props = without(options, 'event');
    if (Object.keys(props).length > 0) {
      window.fbq('trackCustom', event, props);
    } else {
      window.fbq('trackCustom', event);
    }
  },

  trackPage(options={}) {
    if (Object.keys(options).length > 0) {
      window.fbq('track', 'PageView', options);
    } else {
      window.fbq('track', 'PageView');
    }
  },

  willDestroy() {
    Ember.$('script[src$="fbevents.js"]').remove();
    delete window.fbq;
  }
});
