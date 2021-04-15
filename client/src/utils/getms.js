import moment from 'moment';

export const getms = (duration, key) => moment.duration(duration, key).asMilliseconds();
