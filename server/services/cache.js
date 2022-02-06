import cache from 'memory-cache';

// * need to take care of max-size of cache
class MemCache {
  duration;
  cache;
  maxSize;
  constructor() {
    this.cache = new cache.Cache();
    this.duration = 2 * 60;
    this.maxSize = 1000;
  }

  set(key, data, duration = this.duration) {
    if (this.cache.size() === this.maxSize) {
      this.flush();
    }

    this.cache.put(key, data, duration * 1000);
  }

  get(key) {
    const data = this.cache.get(key);
    if (data) {
      return data;
    }
    return null;
  }

  del(keys) {
    this.cache.del(keys);
  }

  flush() {
    this.cache.clear();
  }
}

export const recentKey = '__recent__';

export const getAccessKey = url => '__access__' + url;

export const memCache = new MemCache();
