// Export: Export before declarations
// function
export function getSocialNetworks(social) {
  if(social === 'facebook') return 'https://facebook.com';
  if(social === 'twitter') return 'https://twitter.com';
  if(social === 'instagram') return 'https://instagram.com';
  return 'not found';
}

// variables
export const CONFIG = {
  version: '1.0.1',
  PORT: 4000
}


// Export: Export from declarations
function calculate(a, b) {
  return a + b;
}

const todos = ['todo 1', 'todo 2', 'todo 3'];

export { calculate, todos };

// Export: Export "as"
function sayHi() {
  console.log('Hi');
}
function sayBye() {
  console.log('Bye');
}

export { sayHi, sayBye };
// export { sayHi as sayHiCommon, sayBye  as sayByeCommon };

 /*
    Export default
    - Imports without curly braces look nicer.
    - Can put any name when you use import. 
    - Can’t export  default more than one in 1 file.
  */

export default function getFullName(firstName, lastName) {
  return `${firstName}  - ${lastName}`;
}
