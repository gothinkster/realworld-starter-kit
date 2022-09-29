package hash

import (
	"crypto/rand"
	"golang.org/x/crypto/argon2"
)

type params struct {
	memory      uint32
	iterations  uint32
	parallelism uint8
	saltLength  uint32
	keyLength   uint32
}

type hasher struct {
	params *params
}

func NewHasher() *hasher {
	p := &params{
		memory:      64 * 1024,
		iterations:  3,
		parallelism: 2,
		saltLength:  64,
		keyLength:   32,
	}
	return &hasher{p}
}

func (h hasher) CreateHashFromPassword(password string) (hash []byte, salt []byte, err error) {

	salt, err = h.createSalt(h.params.saltLength)
	if err != nil {
		return nil, nil, err
	}

	hash = argon2.IDKey(
		[]byte(password),
		salt,
		h.params.iterations,
		h.params.memory,
		h.params.parallelism,
		h.params.keyLength,
	)

	return hash, salt, nil
}

func (h hasher) CreateHashFromPasswordAndSalt(password string, salt []byte) []byte {
	hash := argon2.IDKey(
		[]byte(password),
		salt,
		h.params.iterations,
		h.params.memory,
		h.params.parallelism,
		h.params.keyLength,
	)
	return hash
}

func (h hasher) createSalt(n uint32) ([]byte, error) {
	b := make([]byte, n)
	_, err := rand.Read(b)
	if err != nil {
		return nil, err
	}
	return b, nil
}
