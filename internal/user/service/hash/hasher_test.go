package hash

import (
	"fmt"
	"testing"
)

// TestCreateSaltUnique проверяет что соль всегдя уникальная
func TestCreateSaltUnique(t *testing.T) {
	h := NewHasher()
	results := make(map[string]bool, 100)
	for i := 0; i < 100; i++ {
		b, err := h.createSalt(20)
		if err != nil {
			t.Fatal(err)
		}
		if _, ok := results[string(b)]; ok {
			t.Fatal("salt already exists")
		}
		results[string(b)] = true
	}
}

// TestHasher проверяет что пароли успешно хешируются и проверяются
func TestHasher(t *testing.T) {

	var passwords = []string{
		"a",
		"single",
		"MiXeDPassword",
		"with space",
		"",
		"CAPSLOCK",
		"123456",
		"!@#$%^&*()_+",
	}

	for _, pass := range passwords {
		h := NewHasher()
		hashedPass, salt, err := h.CreateHashFromPassword(pass)
		if err != nil {
			t.Fatal(err)
		}

		hashedPass2 := h.CreateHashFromPasswordAndSalt(pass, salt)
		if string(hashedPass2) != string(hashedPass) {
			t.Fatal(fmt.Errorf("hashedPass!= hashedPass2"))
		}
	}
}

// TestHasherUniqueResult проверяет что на каждого пользователя с одним и тем же паролем будет уникальный хеш
func TestHasherUniqueResult(t *testing.T) {
	password := "qwerty123456789"

	h := NewHasher()

	hash1, salt1, err1 := h.CreateHashFromPassword(password)
	if err1 != nil {
		t.Fatal(err1)
	}

	hash2, salt2, err2 := h.CreateHashFromPassword(password)
	if err2 != nil {
		t.Fatal(err2)
	}

	hash3, salt3, err3 := h.CreateHashFromPassword(password)
	if err3 != nil {
		t.Fatal(err3)
	}

	if string(hash1) == string(hash2) || string(hash1) == string(hash3) || string(hash2) == string(hash3) {
		t.Fatal(fmt.Errorf("not unique hash"))
	}

	if string(salt1) == string(salt2) || string(salt1) == string(salt3) || string(salt2) == string(salt3) {
		t.Fatal(fmt.Errorf("not unique salt"))
	}
}
