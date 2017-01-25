defmodule Disposition.PersonaTest do
  use Disposition.ModelCase

  alias Disposition.Persona

  @valid_attrs %{age: 42, attributes: %{}, desires: [], name: "some content", occupation: "some content", pains: []}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Persona.changeset(%Persona{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Persona.changeset(%Persona{}, @invalid_attrs)
    refute changeset.valid?
  end
end
