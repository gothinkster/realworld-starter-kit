#!/usr/bin/env bash

dart bin/migrations/migrate.dart up && dart test
