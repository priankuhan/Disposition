defmodule Disposition.ProjectController do
  require Logger
  use Disposition.Web, :controller

  plug Guardian.Plug.EnsureAuthenticated, handler: Disposition.UserSessionController

  alias Disposition.{Repo, Project, UserProject}

  def index(conn, _params) do
    current_user = Guardian.Plug.current_resource(conn)

    projects = current_user
      |> assoc(:projects)
      |> Repo.all
      |> Repo.preload(:user)
      |> Repo.preload(:members)

    render(conn, "index.json", projects: projects)
  end

  def create(conn, %{"project" => project_params}) do
    current_user = Guardian.Plug.current_resource(conn)

    changeset = current_user
      |> build_assoc(:projects)
      |> Project.changeset(project_params)

    case Repo.insert(changeset) do
      {:ok, project} -> 
        project
        |> build_assoc(:user_projects)
        |> UserProject.changeset(%{user_id: current_user.id})
        |> Repo.insert!
    
        preloaded_project = project
        |> Repo.preload(:user)
        |> Repo.preload(:members)
        
        conn
        |> put_status(:created)
        |> render("show.json", project: preloaded_project )   
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render("error.json", changeset: changeset)
    end
  end
end