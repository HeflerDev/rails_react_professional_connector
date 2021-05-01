require 'rails_helper'
require 'database_cleaner/active_record'

RSpec.describe 'Users', type: :request do
  valid_user = {username: 'Sample Name', password: 'password', password_confirmation: 'password' }

  before :each do
    DatabaseCleaner.strategy = :truncation
    DatabaseCleaner.clean
  end

  describe 'GET #index' do
    before(:example) { get users_path }

    it 'is a success' do
      expect(response).to have_http_status(:ok)
    end

    it 'return json' do
      expect(response.content_type).to eq('application/json; charset=utf-8')
    end
  end

  describe 'GET #show' do
    before(:example) { post '/users', params: { user: valid_user }}
    it 'access user' do
      get '/users/1'
      expect(response).to have_http_status(:ok)
    end
  end

  describe 'POST #create' do
    it 'is a success' do
      post '/users', params: { user: valid_user }
      expect(response.content_type).to eq('application/json; charset=utf-8')
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)['status']).to eq('created');
    end
  end
end
