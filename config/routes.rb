Rails.application.routes.draw do

  get 'home/index'
  namespace :api do
    namespace :v1 do
      get 'professionals/index'
      get 'professionals/categories'
      get 'professionals/categories/:category', to: 'professionals#categoryFilter' 
      post 'professionals/create'
      get '/show/:id', to: 'professionals#show'
      delete '/destroy/:id', to: 'professionals#destroy'
    end
  end

  resources :appointments, only: [:create, :show, :destroy]
  resources :users, only: [:create, :show, :index]
  
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/logged_in', to: 'sessions#is_logged_in?'

  root 'home#index'
  get '/*path' => 'home#index'
end
