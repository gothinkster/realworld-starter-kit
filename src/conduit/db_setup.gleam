import gleam/pgo
import gleam/atom
import gleam/io
import gleam/string
import gleam/map
import gleam/dynamic.{Dynamic}

external fn erl_query(
  String,
  List(pgo.PgType),
  map.Map(atom.Atom, atom.Atom),
) -> Dynamic =
  "pgo" "query"

fn recreate_database(name) {
  assert Ok(pool) = atom.from_string("pool")
  let recreate_db_conduit_pool =
    atom.create_from_string("recreate_db_conduit_pool")
  let recreate_db_erl_query_options =
    map.new()
    |> map.insert(pool, recreate_db_conduit_pool)
  assert Ok(_) =
    pgo.start_link(
      recreate_db_conduit_pool,
      [pgo.User("postgres"), pgo.Password("postgres"), pgo.Database("postgres")],
    )
  erl_query(
    string.concat(["DROP DATABASE \"", name, "\""]),
    [],
    recreate_db_erl_query_options,
  )
  erl_query(
    string.concat(["CREATE DATABASE \"", name, "\" ENCODING 'UTF8'"]),
    [],
    recreate_db_erl_query_options,
  )
}

fn set_up_database_schema(name) {
  assert Ok(pool) = atom.from_string("pool")
  assert Ok(default) = atom.from_string("default")
  let set_up_schema_erl_query_options =
    map.new()
    |> map.insert(pool, default)
  assert Ok(_) =
    pgo.start_link(
      default,
      [pgo.User("postgres"), pgo.Password("postgres"), pgo.Database(name)],
    )

  erl_query(
    "CREATE TABLE stuff (id bigint primary key)",
    [],
    set_up_schema_erl_query_options,
  )
  io.println("Database has been set up!")
}

pub fn set_up_database(name) {
  recreate_database(name)
  set_up_database_schema(name)
  Nil
}
