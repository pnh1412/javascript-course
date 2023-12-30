// Export: Export "as"
function sayHi() {
  console.log('facebook Hi');
}
function sayBye() {
  console.log('facebook Bye');
}

// Export “default” name
// export { sayHi as default, sayBye }

export { sayHi, sayBye }