const backup = console.error;

console.error = function filterWarnings(msg) {
  const supressedWarnings = ['Refused to set unsafe header "User-Agent"'];

  if (!supressedWarnings.some(entry => msg.includes(entry))) {
    backup.apply(console, arguments as any);
  }
};

console.error('test');
console.error('Refused to set unsafe header "User-Agent"');

export {}