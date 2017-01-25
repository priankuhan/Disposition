defmodule Disposition.UserSessionView do
  use Disposition.Web, :view
  
  def render("show.json", %{jwt: jwt, user: user}) do
    %{
      jwt: jwt,
      user: user
    }
  end
    
  def render("delete.json", _) do
    %{ok: true}
  end
  
  def render("error.json", _) do
    %{error: "Invalid email or password"}
  end
 end