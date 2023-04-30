class ReviewsController < ApplicationController
    def index
        render json: Review.all, status: :ok
    end
    def show
        review = Review.find(params[:id])
        render json: review
    end
    def create
        new_review = Review.create!(review_params)
        render json: new_review, status: :created
    end

    private

    def review_params
        params.permit(:comment, :rating, :user_id, :book_id)
    end
end
