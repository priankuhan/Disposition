defmodule Disposition.PersonaChannel do
  use Disposition.Web, :channel

  def join("personas:" <> persona_id, _params, socket) do
    {:ok, socket}
  end
end