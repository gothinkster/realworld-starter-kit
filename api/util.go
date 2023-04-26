package api

import (
	"math/rand"
	"regexp"
	"strings"
	"time"

	"github.com/rs/xid"
)

func createUniqueSlug(title string) string {
	slug := createSlug(title)
	randomString := generateRandomString(12)
	return slug + "-" + randomString
}

func createSlug(title string) string {
	// Convert to lowercase
	slug := strings.ToLower(title)

	// Replace non-alphanumeric characters with a hyphen
	reg := regexp.MustCompile("[^a-z0-9]+")
	slug = reg.ReplaceAllString(slug, "-")

	// Remove consecutive hyphens and trailing hyphens
	reg = regexp.MustCompile("-+")
	slug = reg.ReplaceAllString(slug, "-")
	slug = strings.Trim(slug, "-")

	return slug
}

func generateRandomString(length int) string {
	rng := rand.New(rand.NewSource(time.Now().UnixNano()))
	chars := []rune("abcdefghijklmnopqrstuvwxyz0123456789")
	result := make([]rune, length)
	for i := range result {
		result[i] = chars[rng.Intn(len(chars))]
	}
	return string(result)
}

func generateID() string {
	return xid.New().String()
}
