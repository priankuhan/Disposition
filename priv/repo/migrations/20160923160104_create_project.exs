defmodule Disposition.Repo.Migrations.CreateProject do
  use Ecto.Migration

  def change do
    create table(:projects) do
      add :name, :string, null: false
      add :user_id, references(:users, on_delete: :delete_all), null: false

      timestamps()
    end
    create index(:projects, [:user_id])
    create index(:projects, [:name, :user_id], unique: true)

  end
end
