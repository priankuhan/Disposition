# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :team_organization,
  ecto_repos: [TeamOrganization.Repo]



# Configures the endpoint
config :team_organization, TeamOrganization.Endpoint,
  url: [host: "localhost"],
  render_errors: [view: TeamOrganization.ErrorView, accepts: ~w(html json)],
  pubsub: [name: TeamOrganization.PubSub,
           adapter: Phoenix.PubSub.PG2]
           

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
