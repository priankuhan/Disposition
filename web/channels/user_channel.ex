defmodule Disposition.UserChannel do
  use Disposition.Web, :channel

  def join("users:" <> user_id, _params, socket) do
    {:ok, socket}
  end
end