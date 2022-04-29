# Start with the python:3.9 image
FROM python:3.9

# Set the following enviroment variables
#
# REACT_APP_BASE_URL -> Your deployment URL
ENV REACT_APP_BASE_URL=https://the-jello-app.herokuapp.com/

# FLASK_APP -> entry point to your flask app
ENV FLASK_APP=backend

# FLASK_ENV -> Tell flask to use the production server
ENV FLASK_ENV=production

# SQLALCHEMY_ECHO -> Just set it to true
ENV SQLALCHEMY_ECHO=true

# Set the directory for upcoming commands to /var/www
WORKDIR /var/www

# Copy all the files from your repo to the working directory
COPY . .

# Copy the built react app (it's built for us) from the  
# /react-app/build/ directory into your flasks app/static directory
COPY /frontend/build/* backend/static/

# Run the next two python install commands with PIP
RUN pip install -r requirements.txt
RUN pip install psycopg2

# Start the flask environment by setting our
# closing command to gunicorn app:app
CMD gunicorn backend:app
