class HomeController < ApplicationController
	#GET /
	def index

	end

	#POST /thank-you
	def thank_you
		@first_name = params[:message]["first_name"]
		@last_name = params[:message]["last_name"]
		@email = params[:message]["email"]
		@message = params[:message]["message"]
	end
end
