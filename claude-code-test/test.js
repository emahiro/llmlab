function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

function testAdd() {
  const result = add(2, 3);
  if (result === 5) {
    console.log('✓ add test passed');
  } else {
    console.log('✗ add test failed');
  }
}

function testMultiply() {
  const result = multiply(3, 4);
  if (result === 12) {
    console.log('✓ multiply test passed');
  } else {
    console.log('✗ multiply test failed');
  }
}

function runTests() {
  console.log('Running tests...');
  testAdd();
  testMultiply();
  console.log('Tests completed');
}

runTests();