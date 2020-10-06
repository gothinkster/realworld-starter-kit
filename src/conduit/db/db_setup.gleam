import gleam/pgo
import gleam/atom
import gleam/io
import gleam/string
import gleam/map
import gleam/list
import gleam/dynamic.{Dynamic}

fn atom_(atom_name) {
  atom.create_from_string(atom_name)
}

external fn erl_query(
  String,
  List(pgo.PgType),
  map.Map(atom.Atom, atom.Atom),
) -> Dynamic =
  "pgo" "query"

fn db_management_query_options() {
  map.new()
  |> map.insert(atom_("pool"), atom_("db_management_pool"))
}

pub fn run_db_management_pool() {
  assert Ok(_) =
    pgo.start_link(
      atom_("db_management_pool"),
      [pgo.User("postgres"), pgo.Password("postgres"), pgo.Database("postgres")],
    )
  io.println("Database management connection pool is running!")
}

pub fn drop_database(name) {
  erl_query(
    string.concat(["DROP DATABASE \"", name, "\""]),
    [],
    db_management_query_options(),
  )
  io.println("Database has been dropped!")
}

pub fn create_database(name) {
  erl_query(
    string.concat(["CREATE DATABASE \"", name, "\" ENCODING 'UTF8'"]),
    [],
    db_management_query_options(),
  )
  io.println("Database has been created!")
}

fn conduit_db_query_options() {
  map.new()
  |> map.insert(atom_("pool"), atom_("default"))
}

pub fn run_conduit_db_pool(name) {
  assert Ok(_) =
    pgo.start_link(
      atom_("default"),
      [pgo.User("postgres"), pgo.Password("postgres"), pgo.Database(name)],
    )
  io.println("Counduit database connection pool is running!")
}

type Migration {
  Migration(id: String, function: fn() -> Nil)
}

fn migrations() {
  [
    Migration(
      "create users table",
      fn() {
        erl_query(
          "CREATE TABLE users (
              id bigint NOT NULL PRIMARY KEY,
              email text NOT NULL,
              username text NOT NULL
            )",
          [],
          conduit_db_query_options(),
        )
        erl_query(
          "CREATE SEQUENCE users_id_seq OWNED BY users.id",
          [],
          conduit_db_query_options(),
        )
        erl_query(
          "ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass)",
          [],
          conduit_db_query_options(),
        )
        Nil
      },
    ),
  ]
}

pub fn migrate_database() {
  erl_query(
    "CREATE TABLE IF NOT EXISTS schema_migrations (id text PRIMARY KEY)",
    [],
    conduit_db_query_options(),
  )

  assert Ok(tuple(_, _, rows)) =
    pgo.query(atom_("default"), "SELECT id FROM schema_migrations", [])
  let already_ran_migrations =
    rows
    |> list.map(fn(row) {
      assert Ok(id_dynamic) = dynamic.element(row, 0)
      assert Ok(id) = dynamic.string(id_dynamic)
      id
    })
  migrations()
  |> list.map(fn(migration) {
    assert Migration(migration_id, migration_function) = migration
    case list.contains(already_ran_migrations, migration_id) {
      True -> Nil
      False -> {
        assert Ok(_) =
          pgo.query(
            atom_("default"),
            "INSERT INTO schema_migrations(id) VALUES ($1)",
            [pgo.text(migration_id)],
          )
        migration_function()
      }
    }
  })

  io.println("Database has been set up!")
  Nil
}

pub fn reset_database(name) {
  run_db_management_pool()
  drop_database(name)
  create_database(name)
  run_conduit_db_pool(name)
  migrate_database()
  Nil
}
