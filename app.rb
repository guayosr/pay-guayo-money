require 'sinatra'
require 'stripe'

set :publishable_key, ENV["STRIPE_TEST_PUBLISHABLE_KEY"]
set :secret_key, ENV["STRIPE_TEST_SECRET_KEY"]
 
Stripe.api_key = settings.secret_key

# before do
#   redirect request.url.sub('http', 'https') unless request.secure?
# end

get '/' do
  @amount = 10
  erb :index
end

get '/:amount' do
  @amount = params['amount']
  erb :index
end

get '/test' do
  erb :test
end

post '/charge' do
  source = params[:source]

  begin 
    charge = Stripe::Charge.create(
      :amount => params[:amount],
      :currency => "usd",
      :description => "Example charge",
      :source => source,
    )
    erb :success

  rescue Stripe::CardError => e
    body = e.json_body
    err  = body[:error]
    @error = err[:message]
    @amount = params[:amount]

    erb :index
  end
end