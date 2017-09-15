Rails.application.routes.draw do
  get 'mazes/index'

  get 'mazes/new'

  get 'mazes/edit'

  get 'mazes/show'

  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
