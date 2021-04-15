import { getms } from 'utils';

export const expirationList = [
  {
    name: 'Never',
    ms: -1,
  },
  {
    name: '10 mins',
    ms: getms(10, 'm'),
  },
  {
    name: '1 hour',
    ms: getms(1, 'h'),
  },
  {
    name: '1 day',
    ms: getms(1, 'd'),
  },
  {
    name: '1 week',
    ms: getms(1, 'w'),
  },
  {
    name: '2 weeks',
    ms: getms(2, 'w'),
  },
  {
    name: '1 month',
    ms: getms(1, 'M'),
  },
  {
    name: '6 months',
    ms: getms(6, 'M'),
  },
  {
    name: '1 year',
    ms: getms(1, 'y'),
  },
];
