#! /bin/sh
export AWS_ACCESS_KEY_ID=foo
export AWS_SECRET_ACCESS_KEY=bar

export TF_VAR_DATABASE_URL=mysql://realworld:realworld@localhost:3306/realworld

tflocal fmt
tflocal init \
   -upgrade \
   -reconfigure \
   -backend-config="force_path_style=true"

tflocal apply -auto-approve
