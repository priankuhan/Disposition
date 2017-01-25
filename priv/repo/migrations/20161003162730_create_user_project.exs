defmodule Disposition.Repo.Migrations.CreateUserProject do
  use Ecto.Migration

  def change do
    create table(:user_projects) do
      add :user_id, references(:users, on_delete: :delete_all), null: false
      add :project_id, references(:projects, on_delete: :delete_all), null: false

      timestamps()
    end
    create index(:user_projects, [:user_id])
    create index(:user_projects, [:project_id])
    create unique_index(:user_projects, [:user_id, :project_id])

  end
end
