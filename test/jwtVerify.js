'use strict'

const assert = require('assert')
const lib = require('../src/lib')
const { describe, it } = require('mocha')
const {
  expectError, JWT_INVALID, CLIENT_ID,
  AUD, PEM_PUB_KEY, JWT_EXPIRED, JWT_VALID,
  JWT_VALID_RS384, JWK_PUBLIC_KEY
} = require('./test-helpers')

describe('jwtVerify()', function () {
  describe('PEM public key', function () {
    it('Should return a parsed JWT when valid', function () {
      const decodedJWT = lib.jwtVerify(JWT_VALID, PEM_PUB_KEY)
      assert(decodedJWT.payload)
      assert(decodedJWT.header)
      assert.strictEqual(decodedJWT.payload.client_id, CLIENT_ID)
      assert.strictEqual(decodedJWT.payload.iss, CLIENT_ID)
      assert.strictEqual(decodedJWT.payload.aud, AUD)
    })

    it('Should fail when incorrect PublicKey', function () {
      assert.throws(
        () => lib.jwtVerify(JWT_VALID, 'hola'),
        expectError('Error', '[jwtVerify] not supported argument')
      )
    })

    it('Should fail when no jwt passed', function () {
      assert.throws(
        () => lib.jwtVerify(undefined, PEM_PUB_KEY),
        expectError('Error', '[jwtVerify] Field jwt should be of type string')
      )
    })

    it('Should fail when no pubkey passed', function () {
      assert.throws(
        () => lib.jwtVerify('Notvalidated'),
        expectError('Error', '[jwtVerify] Field pubKey should be of type string,object')
      )
    })

    it('Should fail when jwt is not a string', function () {
      assert.throws(
        () => lib.jwtVerify(234567, PEM_PUB_KEY),
        expectError('Error', '[jwtVerify] Field jwt should be of type string')
      )
    })

    it('Should fail when pubKey is not a string', function () {
      assert.throws(
        () => lib.jwtVerify('Notvalidated', 2763763763),
        expectError('Error', '[jwtVerify] Field pubKey should be of type string,object')
      )
    })

    it('Should fail when expired jwt', function () {
      assert.throws(
        () => lib.jwtVerify(JWT_EXPIRED, PEM_PUB_KEY),
        expectError('Error', '[jwtVerify] Invalid JWT')
      )
    })

    it('Should fail when not valid signature jwt', function () {
      assert.throws(
        () => lib.jwtVerify(JWT_INVALID, PEM_PUB_KEY),
        expectError('Error', '[jwtVerify] Invalid JWT')
      )
    })

    it('Should fail validation when alg not match', function () {
      assert.throws(
        () => lib.jwtVerify(JWT_VALID, PEM_PUB_KEY, 'NOALG'),
        expectError('Error', '[jwtVerify] Invalid JWT')
      )
    })

    it('Should validate with not default alg', function () {
      const decodedJWT = lib.jwtVerify(JWT_VALID_RS384, PEM_PUB_KEY, 'RS384')
      assert(decodedJWT.payload)
      assert(decodedJWT.header)
      assert.strictEqual(decodedJWT.payload.client_id, CLIENT_ID)
      assert.strictEqual(decodedJWT.payload.iss, CLIENT_ID)
      assert.strictEqual(decodedJWT.payload.aud, AUD)
    })
  })

  describe('JWK public key', function () {
    it('Should return a parsed JWT when valid', function () {
      const decodedJWT = lib.jwtVerify(JWT_VALID, JWK_PUBLIC_KEY)
      assert(decodedJWT.payload)
      assert(decodedJWT.header)
      assert.strictEqual(decodedJWT.payload.client_id, CLIENT_ID)
      assert.strictEqual(decodedJWT.payload.iss, CLIENT_ID)
      assert.strictEqual(decodedJWT.payload.aud, AUD)
    })

    it('Should fail when incorrect PublicKey', function () {
      assert.throws(
        () => lib.jwtVerify(JWT_VALID, 'hola'),
        expectError('Error', '[jwtVerify] not supported argument')
      )
    })

    it('Should fail when no jwt passed', function () {
      assert.throws(
        () => lib.jwtVerify(undefined, JWK_PUBLIC_KEY),
        expectError('Error', '[jwtVerify] Field jwt should be of type string')
      )
    })

    it('Should fail when no pubkey passed', function () {
      assert.throws(
        () => lib.jwtVerify('Notvalidated'),
        expectError('Error', '[jwtVerify] Field pubKey should be of type string,object')
      )
    })

    it('Should fail when jwt is not a string', function () {
      assert.throws(
        () => lib.jwtVerify(234567, JWK_PUBLIC_KEY),
        expectError('Error', '[jwtVerify] Field jwt should be of type string')
      )
    })

    it('Should fail when pubKey is not a string', function () {
      assert.throws(
        () => lib.jwtVerify('Notvalidated', 2763763763),
        expectError('Error', '[jwtVerify] Field pubKey should be of type string,object')
      )
    })

    it('Should fail when expired jwt', function () {
      assert.throws(
        () => lib.jwtVerify(JWT_EXPIRED, JWK_PUBLIC_KEY),
        expectError('Error', '[jwtVerify] Invalid JWT')
      )
    })

    it('Should fail when not valid signature jwt', function () {
      assert.throws(
        () => lib.jwtVerify(JWT_INVALID, JWK_PUBLIC_KEY),
        expectError('Error', '[jwtVerify] Invalid JWT')
      )
    })

    it('Should fail validation when alg not match', function () {
      assert.throws(
        () => lib.jwtVerify(JWT_VALID, JWK_PUBLIC_KEY, 'NOALG'),
        expectError('Error', '[jwtVerify] Invalid JWT')
      )
    })

    it('Should validate with not default alg', function () {
      const decodedJWT = lib.jwtVerify(JWT_VALID_RS384, JWK_PUBLIC_KEY, 'RS384')
      assert(decodedJWT.payload)
      assert(decodedJWT.header)
      assert.strictEqual(decodedJWT.payload.client_id, CLIENT_ID)
      assert.strictEqual(decodedJWT.payload.iss, CLIENT_ID)
      assert.strictEqual(decodedJWT.payload.aud, AUD)
    })
  })
})
