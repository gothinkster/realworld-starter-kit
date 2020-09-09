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

pub fn set_up_database(name) {
  assert Ok(pool) = atom.from_string("pool")
  let setup_db_conduit_pool = atom.create_from_string("setup_db_conduit_pool")
  let setup_db_erl_query_options =
    map.new()
    |> map.insert(pool, setup_db_conduit_pool)
  assert Ok(_) =
    pgo.start_link(
      setup_db_conduit_pool,
      [pgo.User("postgres"), pgo.Password("postgres"), pgo.Database("postgres")],
    )
  erl_query(
    string.concat(["DROP DATABASE \"", name, "\""]),
    [],
    setup_db_erl_query_options,
  )
  erl_query(
    string.concat(["CREATE DATABASE \"", name, "\" ENCODING 'UTF8'"]),
    [],
    setup_db_erl_query_options,
  )

  assert Ok(default) = atom.from_string("default")
  let migrations_erl_query_options =
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
    migrations_erl_query_options,
  )
  io.println("Database has been set up!")
  Nil
}
