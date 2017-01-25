defmodule Disposition.ProjectChannel do
  use Disposition.Web, :channel
  alias Disposition.UserProject
  
   def handle_in("members:add", %{"email" => email}, socket) do
    try do
      project = socket.assigns.project
      user = User
        |> Repo.get_by(email: email)

      changeset = user
      |> build_assoc(:user_projects)
      |> UserProject.changeset(%{project_id: project.id})

      case Repo.insert(changeset) do
        {:ok, _project_user} ->
          broadcast! socket, "member:added", %{user: user}

          Disposition.Endpoint.broadcast_from! self(), "users:#{user.id}", "projects:add", %{project: project}

          {:noreply, socket}
        {:error, _changeset} ->
          {:reply, {:error, %{error: "Error adding new member"}}, socket}
      end
    catch
      _, _-> {:reply, {:error, %{error: "User does not exist"}}, socket}
    end
  end
  
  def join("projects:" <> project_id, _params, socket) do
    project = get_current_project(socket, project_id)

    {:ok, %{project: project}, assign(socket, :project, project)}
  end

  defp get_current_project(socket, project_id) do
    socket.assigns.current_user
    |> assoc(:projects)
    |> Repo.get(project_id)
    |> Repo.preload(:user)
    |> Repo.preload(:members)
  end
end