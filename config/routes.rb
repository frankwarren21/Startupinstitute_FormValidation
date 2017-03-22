Rails.application.routes.draw do
  root 'home#index'
  post 'thank-you' => 'home#thank_you'
  post 'slideshow' => 'slideshow#index'
end
