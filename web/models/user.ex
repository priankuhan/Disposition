defmodule Ideation.User do
  use Ideation.Web, :model
  import Comeonin.Bcrypt, only: [hashpwsalt: 1]
  
  schema "users" do
    field :first_name, :string
    field :last_name, :string
    field :password, :string, virtual: true
    field :email, :string
    field :encrypted_password, :string

    timestamps()
  end
  
  @derive {Poison.Encoder, only: [:id, :first_name, :last_name, :email]}
  
  @fields ~w(first_name last_name email password encrypted_password)a
  @required_fields ~w(first_name last_name email password)a
  
  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, @fields)
    |> validate_required(@required_fields)
    |> validate_format(:email, ~r/@/)
    |> validate_length(:password, min: 8)
    |> validate_confirmation(:password, message: "Password does not match")
    |> unique_constraint(:email, message: "An account with this email already exists")
    |> set_encrypted_password
  end
  
  defp set_encrypted_password(current_changeset) do
    case current_changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: password}} ->
        put_change(current_changeset, :encrypted_password, hashpwsalt(password))
      _ ->
        current_changeset
    end
  end
end
