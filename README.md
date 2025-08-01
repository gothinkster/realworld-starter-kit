# ![RealWorld Example App](logo.png)

> ### [FastAPI](https://github.com/tiangolo/fastapi) + Couchbase codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld) spec and API.


### [Demo](https://demo.realworld.build/)&nbsp;&nbsp;&nbsp;&nbsp;[RealWorld](https://github.com/gothinkster/realworld)


This codebase was created to demonstrate a fully fledged fullstack application built with [FastAPI](https://github.com/tiangolo/fastapi) + Couchbase including CRUD operations, authentication, routing, pagination, and more.


For more information on how to this works with other frontends/backends, head over to the [RealWorld](https://github.com/gothinkster/realworld) repository.


## Prerequisites

To run this prebuilt project, you will need:

- [Couchbase Capella](https://www.couchbase.com/products/capella/) cluster with a bucket and scope loaded.
- [Python](https://www.python.org/downloads/) 3.9 or higher installed
  - Ensure that the Python version is [compatible](https://docs.couchbase.com/python-sdk/current/project-docs/compatibility.html#python-version-compat) with the Couchbase SDK.
- Using the Capella UI, create the following collections in the loaded scope, and using the Query data tool, create primary indicies for both:
  - `article`
  - `client` (`client` because `user` is a reserved Couchbase keyword)
```
CREATE PRIMARY INDEX ON `default`:`<bucket_name>`.`<scope_name>`.`<collection_name>`;
```

# Setting Up the Application

### Cloning Repository

```shell
git clone https://github.com/couchbase-examples/python-quickstart-fastapi.git
```

### Install Dependencies

The dependencies for the application are specified in the `requirements.txt` file in the root folder. Dependencies can be installed through `pip` the default package manager for Python.
```
./scripts/install-dependencies.sh
```
> Note: If your Python is not symbolically linked to python3, you need to run all commands using `python3` instead of `python`.

### Setup Database Configuration

To know more about connecting to your Capella cluster, please follow the [instructions](https://docs.couchbase.com/cloud/get-started/connect.html).

Specifically, you need to do the following:

- Create the [database credentials](https://docs.couchbase.com/cloud/clusters/manage-database-users.html) to access the travel-sample bucket (Read and Write) used in the application.
- [Allow access](https://docs.couchbase.com/cloud/clusters/allow-ip-address.html) to the Cluster from the IP on which the application is running.

All configuration for communication with the database is read from the environment variables. We have provided a convenience feature to read the environment variables from a local file, `.env` in the source folder.

Create a copy of `.env.example` in the app folder & rename it to `.env` add the values for the Couchbase connection.

> Note: Files starting with `.` could be hidden in the file manager in your Unix based systems including GNU/Linux and Mac OS.

```sh
DB_CONN_STR=<connection_string>
DB_USERNAME=<user_with_read_write_permission_to_travel-sample_bucket>
DB_PASSWORD=<password_for_user>
DB_BUCKET_NAME=<bucket_name>
DB_SCOPE_NAME=<scope_name>
```

> Note: The connection string expects the `couchbases://` or `couchbase://` part.

### Setup JWT Token Configureation

Create a random secret key that will be used to sign the JWT tokens.

To generate a secure random secret key use the command:

```
./scripts/generate-secret-key.sh
```

And copy the output to the JWT_SECRET environment variable in the .env file.

> Note: The CORS_ALLOWED_ORIGINS, CORS_ALLOWED_METHODS and CORS_ALLOWED_HEADERS environment variables can be left blank unless specific CORS options are required.


## Running The API

### Directly on Machine

At this point, we have installed the dependencies, setup the cluster and configured the API with the credentials. The API is now ready and you can run it.

```
./scripts/start-api.sh
```

### Using Docker

- Build the Docker image

```sh
./scripts/build-container.sh
```

- Run the Docker image

```sh
./scripts/run-container.sh
```

> Note: The `.env` file has the connection information to connect to your Capella cluster. These will be part of the environment variables in the Docker container.


## Running Tests

To run RealWorld API tests, use the following command:

```
./scripts/realworld-test.sh
```

To run tests, use the following command:

```
./scripts/pytest-test.sh
```
