defmodule Disposition.Project do
  use Disposition.Web, :model
  
  @derive {Poison.Encoder, only: [:id, :name, :user, :members]}
  
  schema "projects" do
    field :name, :string
    belongs_to :user, Disposition.User
    has_many :personas, Disposition.Persona
    has_many :user_projects, Disposition.UserProject
    has_many :members, through: [:user_projects, :user]

    timestamps()
  end
  
  @fields ~w(name user_id)a
  @required_fields ~w(name user_id)a
  
  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, @fields)
    |> validate_required(@required_fields)
    |> unique_constraint(:name_user_id, message: "You already have a project with this name.")
  end
end
