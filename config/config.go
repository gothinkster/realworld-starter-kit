package config

import (
	"log"
	"time"

	"github.com/spf13/viper"
)

type Config struct {
	Environment string `mapstructure:"ENVIRONMENT"`
	Host        string `mapstructure:"HOST"`
	Port        string `mapstructure:"PORT"`

	DBUsername    string `mapstructure:"DB_USERNAME"`
	DBPassword    string `mapstructure:"DB_PASSWORD"`
	DBHost        string `mapstructure:"DB_HOSTNAME"`
	DBPort        string `mapstructure:"DB_PORT"`
	DBName        string `mapstructure:"DB_DBNAME"`
	DBNameTest    string `mapstructure:"DB_DBNAME_TEST"`
	MigrationPath string `mapstructure:"MIGRATION_PATH"`
	DBRecreate    bool   `mapstructure:"DB_RECREATE"`
	DBUrl         string

	ApiSecret           string        `mapstructure:"API_SECRET"`
	AccessTokenDuration time.Duration `mapstructure:"TOKEN_HOUR_LIFESPAN"`
	// RefreshTokenDuration time.Duration `mapstructure:"REFRESH_TOKEN_DURATION"`
}

func LoadConfig(name string, path string) (config Config) {
	viper.AddConfigPath(path)
	viper.SetConfigName(name)
	viper.SetConfigType("env")

	viper.AutomaticEnv()

	if err := viper.ReadInConfig(); err != nil {
		log.Fatalf("config: %v", err)
		return
	}
	if err := viper.Unmarshal(&config); err != nil {
		log.Fatalf("config: %v", err)
		return
	}
	return
}
