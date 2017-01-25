defmodule Disposition.UserProject do
  use Disposition.Web, :model

  schema "user_projects" do
    belongs_to :user, Disposition.User
    belongs_to :project, Disposition.Project

    timestamps
  end
  
  @fields ~w(user_id project_id)a
  @required_fields ~w(user_id project_id)a

  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @fields)
    |> validate_required(@required_fields)
    |> foreign_key_constraint(:user_id)
    |> foreign_key_constraint(:project_id)
    |> unique_constraint(:user_id, name: :user_projects_user_id_project_id_index)
  end
end
