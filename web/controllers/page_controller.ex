defmodule Disposition.PageController do
  use Disposition.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
