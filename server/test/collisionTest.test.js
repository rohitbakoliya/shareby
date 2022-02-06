import { getNanoId, getUID } from '../services/UIdGenerator';

function collisionTest(fun, iterations = 1e6) {
  const track = new Set();
  let count = -1;

  console.time('Collision test');

  while (++count < iterations) {
    track.add(fun());
  }

  console.timeEnd('Collision test');
  console.log('Total iterations:', iterations);
  console.log('Total collisions:', iterations - track.size);
  console.log('Total unique ids:', track.size);
}

collisionTest(getUID);
collisionTest(getNanoId);
