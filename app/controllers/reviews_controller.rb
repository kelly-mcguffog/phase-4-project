class ReviewsController < ApplicationController
    before_action :find_review, only: [:update, :destroy]

    def index
        render json: Review.all, status: :ok
    end

    def create
        new_review = Review.create!(review_params)
        render json: new_review, status: :created
    end

    def update
        @review.update!(review_params)
        render json: @review, status: :ok
    end

    def destroy
        @review.destroy
        head :no_content
    end

    private

    def review_params
        params.permit(:comment, :rating, :user_id, :book_id)
    end

    def find_review
        @review = Review.find(params[:id])
    end
end
