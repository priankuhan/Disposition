defmodule Disposition.Repo.Migrations.CreatePersona do
  use Ecto.Migration

  def change do
    create table(:personas) do
      add :name, :string, null: false
      add :age, :integer
      add :occupation, :string
      add :pains, {:array, :text}
      add :desires, {:array, :text}
      add :attributes, :map
      add :project_id, references(:projects, on_delete: :delete_all), null: false

      timestamps()
    end
    create index(:personas, [:project_id])

  end
end
