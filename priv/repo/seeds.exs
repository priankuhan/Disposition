# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Disposition.Repo.insert!(%Disposition.SomeModel{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias Disposition.{Repo, User}

[
  %{
    first_name: "Prian",
    last_name: "Kuhanandan",
    email: "priankuhan@disposition.com",
    password: "passw0rd"
  },
]
|> Enum.map(&User.changeset(%User{}, &1))
|> Enum.each(&Repo.insert!(&1))