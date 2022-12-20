package hash

import (
	"crypto/rand"
	"encoding/base64"
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

func (h hasher) CreateHashFromPassword(password string) (hash string, salt string, err error) {

	salt, err = h.CreateSalt(h.params.saltLength)
	if err != nil {
		return "", "", err
	}

	saltBytes, err := base64.RawStdEncoding.DecodeString(salt)
	if err != nil {
		return "", "", err
	}

	hashBytes := argon2.IDKey(
		[]byte(password),
		saltBytes,
		h.params.iterations,
		h.params.memory,
		h.params.parallelism,
		h.params.keyLength,
	)

	hash = base64.RawStdEncoding.EncodeToString(hashBytes)

	return hash, salt, nil
}

func (h hasher) CreateHashFromPasswordAndSalt(password string, salt string) string {

	saltBytes, err := base64.RawStdEncoding.DecodeString(salt)
	if err != nil {
		saltBytes = []byte(salt)
	}

	hashBytes := argon2.IDKey(
		[]byte(password),
		saltBytes,
		h.params.iterations,
		h.params.memory,
		h.params.parallelism,
		h.params.keyLength,
	)

	hash := base64.RawStdEncoding.EncodeToString(hashBytes)

	return hash
}

func (h hasher) CreateSalt(n uint32) (string, error) {
	b := make([]byte, n)
	_, err := rand.Read(b)
	if err != nil {
		return "", err
	}

	return base64.RawStdEncoding.EncodeToString(b), nil
}
