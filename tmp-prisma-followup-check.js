const { prisma } = require('./lib/db');
console.log('typeof prisma', typeof prisma);
console.log('prisma instanceof Object', prisma instanceof Object);
console.log('has followUp property', Object.prototype.hasOwnProperty.call(prisma, 'followUp'));
console.log('followUp', prisma.followUp);
console.log('keys with follow', Object.keys(prisma).filter((k) => k.toLowerCase().includes('follow')));
console.log('keys length', Object.keys(prisma).length);
prisma.$disconnect();
