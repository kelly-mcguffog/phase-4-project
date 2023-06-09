class BooksController < ApplicationController
    before_action :find_book, only: [:update, :destroy]

    def index
        book = Book.all
        render json: book, include: ["reviews", "reviews.user"], status: :ok
    end

    def show
        render json: find_book, status: :ok
    end

    def update
        @book.update!(book_params)
        render json: @book, include: ["reviews", "reviews.user"], status: :ok
    end

    def create
        new_book = Book.create!(book_params)
        render json: new_book, status: :created
    end

    def destroy
        @book.destroy
        head :no_content
    end

    private

    def book_params
        params.permit(:title, :genre, :author, :summary, :book_image, :page_count)
    end

    def find_book
        @book = Book.find(params[:id])
    end
end
