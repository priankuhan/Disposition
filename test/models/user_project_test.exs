defmodule Disposition.UserProjectTest do
  use Disposition.ModelCase

  alias Disposition.UserProject

  @valid_attrs %{}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = UserProject.changeset(%UserProject{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = UserProject.changeset(%UserProject{}, @invalid_attrs)
    refute changeset.valid?
  end
end
