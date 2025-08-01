from __future__ import annotations

import logging
import os
from datetime import timedelta
from functools import cache

from couchbase.auth import PasswordAuthenticator
from couchbase.cluster import Cluster
from couchbase.exceptions import CouchbaseException
from couchbase.options import ClusterOptions
from dotenv import load_dotenv

from .core.exceptions import EmptyEnvironmentVariableError


class CouchbaseClient(object):
    """Class to handle interactions with Couchbase cluster"""

    def __init__(
        self,
        conn_str: str,
        username: str,
        password: str,
        bucket_name: str,
        scope_name: str,
    ):
        self.cluster = None
        self.bucket = None
        self.scope = None
        self.conn_str = conn_str
        self.username = username
        self.password = password
        self.bucket_name = bucket_name
        self.scope_name = scope_name
        self.connect()

    def connect(self) -> None:
        """Connect to the Couchbase cluster"""
        if self.cluster:
            return
        logging.info("connecting to db")
        try:
            auth = PasswordAuthenticator(self.username, self.password)
            cluster_opts = ClusterOptions(auth)
            cluster_opts.apply_profile("wan_development")
            self.cluster = Cluster(self.conn_str, cluster_opts)
            self.cluster.wait_until_ready(timedelta(seconds=5))
            self.bucket = self.cluster.bucket(self.bucket_name)
        except CouchbaseException as error:
            self.connection_error(error)
        if not self.check_scope_exists():
            logging.warning(
                "Scope does not exist in the bucket. Ensure that you have the scope in your bucket."
            )
        self.scope = self.bucket.scope(self.scope_name)

    def connection_error(self, error: CouchbaseException) -> None:
        """Handle connection errors"""
        logging.error(f"Could not connect to the cluster. Error: {error}")
        logging.warning("Ensure that you have the bucket loaded in the cluster.")

    def check_scope_exists(self) -> bool:
        """Check if the scope exists in the bucket"""
        try:
            scopes_in_bucket = [
                scope.name for scope in self.bucket.collections().get_all_scopes()
            ]
            return self.scope_name in scopes_in_bucket
        except Exception:
            logging.error(
                "Error fetching scopes in cluster. \nEnsure that the bucket exists."
            )
            return False

    def close(self) -> None:
        """Close the connection to the Couchbase cluster"""
        if self.cluster:
            try:
                self.cluster.close()
            except Exception as e:
                logging.error(f"Error closing cluster. \nError: {e}")

    def get_document(self, collection_name: str, key: str):
        """Get document by key using KV operation"""
        return self.scope.collection(collection_name).get(key)

    def insert_document(self, collection_name: str, key: str, doc: dict):
        """Insert document using KV operation"""
        return self.scope.collection(collection_name).insert(key, doc)

    def delete_document(self, collection_name: str, key: str):
        """Delete document using KV operation"""
        return self.scope.collection(collection_name).remove(key)

    def upsert_document(self, collection_name: str, key: str, doc: dict):
        """Upsert document using KV operation"""
        return self.scope.collection(collection_name).upsert(key, doc)

    def query(self, sql_query, *options, **kwargs):
        """Query Couchbase using SQL++"""
        return self.scope.query(sql_query, *options, **kwargs)


@cache
def get_db():
    """Get Couchbase client"""
    load_dotenv()
    env_vars = [
        "DB_CONN_STR",
        "DB_USERNAME",
        "DB_PASSWORD",
        "DB_BUCKET_NAME",
        "DB_SCOPE_NAME",
    ]
    try:
        conn_str, username, password, bucket_name, scope_name = (
            os.getenv(var) for var in env_vars
        )
        for env_var, var_name in zip(
            [conn_str, username, password, bucket_name, scope_name], env_vars
        ):
            if not env_var:
                raise EmptyEnvironmentVariableError(var_name)
        return CouchbaseClient(conn_str, username, password, bucket_name, scope_name)
    except Exception as e:
        raise e
