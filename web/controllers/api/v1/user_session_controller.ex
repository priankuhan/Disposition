defmodule Disposition.UserSessionController do
  use Disposition.Web, :controller 
  
  alias Disposition.UserSession
  
  plug :scrub_params, "user_session" when action in [:create]

  def create(conn, %{"user_session" => user_session_params}) do
    case UserSession.authenticate(user_session_params) do
      {:ok, user} ->
        {:ok, jwt, _full_claims} = user |> Guardian.encode_and_sign(:token)

        conn
        |> put_status(:created)
        |> render("show.json", jwt: jwt, user: user)

      :error ->
        conn
        |> put_status(:unprocessable_entity)
        |> render("error.json")
    end
  end
  
  def delete(conn, _) do
    {:ok, claims} = Guardian.Plug.claims(conn)

    conn
    |> Guardian.Plug.current_token
    |> Guardian.revoke!(claims)

    conn
    |> render("delete.json")
  end
  
  def unauthenticated(conn, _params) do
    conn
    |> put_status(:forbidden)
    |> render(Disposition.UserSessionView, "forbidden.json", error: "Not Authenticated")
  end
end