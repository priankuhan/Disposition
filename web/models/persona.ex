defmodule Disposition.Persona do
  use Disposition.Web, :model

  schema "personas" do
    field :name, :string
    field :age, :integer
    field :occupation, :string
    field :pains, {:array, :string}
    field :desires, {:array, :string}
    field :attributes, :map
    belongs_to :project, Disposition.Project

    timestamps()
  end
  
  @fields ~w(name age occupation pains desires attributes project_id)a
  @required_fields ~w(name project_id)a

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, @fields)
    |> validate_required(@required_fields)
  end
end
