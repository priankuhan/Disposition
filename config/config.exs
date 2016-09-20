# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :ideation,
  ecto_repos: [Ideation.Repo]

# Configures the endpoint
config :ideation, Ideation.Endpoint,
  url: [host: "localhost"],
  render_errors: [view: Ideation.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Ideation.PubSub,
           adapter: Phoenix.PubSub.PG2]
           
config :guardian, Guardian,
  issuer: "Ideation",
  ttl: { 3, :days },
  verify_issuer: true,
  secret_key: "EKgeCZ1ND6Yw1TJD7F5blZHl8ZVI843uj3hQT2TI4xgkb1AgPEI0Nbs0sK19Wn",
  serializer: Ideation.GuardianSerializer

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"