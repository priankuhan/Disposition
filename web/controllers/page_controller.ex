defmodule TeamOrganization.PageController do
  use TeamOrganization.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
