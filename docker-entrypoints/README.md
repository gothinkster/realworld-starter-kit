Docker Entrypoints
==================

Entrypoints are used and a wrapper around the commands we want to run.
Here we use entrypoint to invoke a shell with the appropriate environment
and dependencies available to run the given commands.

e.g.

```bash
/app/docker-entrypoints/run.sh some command
```

We set the entrypoint in a docker image using the `ENTRYPOINT` instruction.

We currently have three entrypoints: `run.sh`, `test.sh` and `develop.sh`.

For more info, read the comments in the respective files.
