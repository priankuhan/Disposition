defmodule Disposition.Router do
  use Disposition.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end
  
  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", Disposition do
    pipe_through :browser 

    get "*path", PageController, :index
  end
  
  scope "/api", Disposition do
    pipe_through :api

    scope "/v1" do
      post "/users", UserController, :create
    end
  end
end
