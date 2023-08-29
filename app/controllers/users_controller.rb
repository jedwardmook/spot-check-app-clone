class UsersController < ApplicationController
    skip_before_action :authorize, only: :create

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    rescue ActiveRecord::RecordInvalid => e
        render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
    end

    def show
        user = User.find_by(id: params[:id])
        if user
          render json: user
        else
          render json: { error: "Not authorized" }, status: :unauthorized
        end
    end

    def update
        user = User.find_by(id: session[:user_id])
        if user
            user.update(user_params)
            render json: user, status: :accepted
        else
            render json: {errors: "User not found"}, status: :not_found
        end
    end

    def update_photo
        user = User.find_by(id: session[:user_id])
        user.photo.attach(user_params[:photo])
        if user
            user.update(user_params)
            render json: user, status: :accepted
        else
            render json: {errors: "User not found"}, status: :not_found
        end
    end

    private
    def user_params
        params.require(:user).permit(:username, :password, :password_confirmation, :name, :bio, :photo, :id)
    end

end
