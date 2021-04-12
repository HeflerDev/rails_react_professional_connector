Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      get 'professionals/index'
      get 'professionals/create'
      get '/show/:id', to: 'professionals#show'
      get '/destroy/':id, to: 'professionals#destroy'
    end
  end
  
  root 'homepage#index'
  get '/*path' => 'homepage#index'

  resources :users, only: [:create, :show, :index]

  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/logged_in', to: 'sessions#is_logged_in?'
end
