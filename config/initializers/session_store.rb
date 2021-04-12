if Rails.env === 'production' 
  Rails.application.config.session_store :cookie_store, key: 'rails-react-professional-connector', domain: 'https://localhost:3000'
else
  Rails.application.config.session_store :cookie_store, key: 'rails-react-professional-connector' 
end
