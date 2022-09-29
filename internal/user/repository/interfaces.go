package repository

type database interface {
	Get(dest interface{}, query string, args ...interface{}) error
}
