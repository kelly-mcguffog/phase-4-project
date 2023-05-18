class BooksController < ApplicationController
    def index
        book = Book.all
        render json: book, include: ["reviews", "reviews.user"], status: :ok
    end
    def show
        book = Book.find(params[:id])
        render json: book, status: :ok
    end

    def update
        book = Book.find(params[:id])
        book.update(book_params)
        render json: book, include: ["reviews", "reviews.user"], status: :ok
    end

    def create
        new_book = Book.create!(book_params)
        render json: new_book, status: :created
    end
    def destroy
        book = Book.find(params[:id])
        book.destroy
        head :no_content
    end


    private

    def book_params
        params.permit(:title, :genre, :author, :summary, :book_image, :page_count)
    end
end
