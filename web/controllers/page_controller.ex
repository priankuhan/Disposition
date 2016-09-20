defmodule Ideation.PageController do
  use Ideation.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
