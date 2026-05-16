// Simple integrity check test (run with Node.js + crypto)
const crypto = require('crypto');

function sha256(data) {
  return crypto.createHash('sha256').update(data).digest('hex');
}

test('SHA-256 produces consistent hash', () => {
  const input = 'test-data';
  const hash1 = sha256(input);
  const hash2 = sha256(input);
  expect(hash1).toBe(hash2);
  expect(hash1).toBe('916f0027a575074ce72a331777c3478d6513f786a591bd892da1a577bf2335f9');
});

test('Hash changes with input modification', () => {
  const original = sha256('original');
  const modified = sha256('original!');
  expect(original).not.toBe(modified);
});