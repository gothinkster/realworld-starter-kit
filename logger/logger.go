package logger

type Logger interface {
	Info(args ...interface{})
	Infof(format string, args ...interface{})
	Debug(args ...interface{})
	Debugf(format string, args ...interface{})
	Error(args ...interface{})
	Errorf(format string, args ...interface{})
	Fatal(args ...interface{})
	Fatalf(format string, args ...interface{})
}

type EmptyLogger struct{}

func (l *EmptyLogger) Info(args ...interface{})                  {}
func (l *EmptyLogger) Infof(format string, args ...interface{})  {}
func (l *EmptyLogger) Debug(args ...interface{})                 {}
func (l *EmptyLogger) Debugf(format string, args ...interface{}) {}
func (l *EmptyLogger) Error(args ...interface{})                 {}
func (l *EmptyLogger) Errorf(format string, args ...interface{}) {}
func (l *EmptyLogger) Fatal(args ...interface{})                 {}
func (l *EmptyLogger) Fatalf(format string, args ...interface{}) {}
