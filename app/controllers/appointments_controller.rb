class AppointmentsController < ApplicationController
  def index
    @appointments = Appointment.all.order(:schedule)
    render json: {
      status: 'fetched',
      appointments: @appointments
    }
  end

  def user_appointments
    @user = current_user
    @user_appointments = @user.appointments.all.order(:schedule)
    render json: {
      status: 'fetched',
      user_appointments: @user_appointments
    }
  end

  def create
    @appointment = Appointment.new(appointment_params)
    if @appointment.save
      render json: {
        status: 'created',
        appointment: @appointment
      }
    else
      render json: {
        status: 500,
        errors: @appointment.errors.full_messages
      }
    end
  end

  def destroy
    @appointment ||= Appointment.find(params[:id])
    @appointment.destroy
    render json: { message: 'Appointment Deleted' }
  end

    private

    def appointment_params
      params.require(:appointment).permit(:user_id, :professional_id, :schedule)
    end
end
