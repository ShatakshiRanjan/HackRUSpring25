from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

# Initialize Flask app
app = Flask(__name__)

# Set up SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'  # SQLite database file
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Define the Task model (table)
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    task_name = db.Column(db.String(200), nullable=False)
    task_date = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f'<Task {self.task_name}>'

# Create the database and tables if they don't exist
with app.app_context():
    db.create_all()

# Route to display all tasks
@app.route('/')
def index():
    tasks = Task.query.all()  # Retrieve all tasks from the database
    return render_template('index.html', tasks=tasks)

# Route to add a new task
@app.route('/add', methods=['POST'])
def add_task():
    if request.method == 'POST':
        task_name = request.form['task_name']
        task_date = request.form['task_date']

        # Create a new Task object
        new_task = Task(task_name=task_name, task_date=task_date)

        # Add it to the database
        db.session.add(new_task)
        db.session.commit()

        return redirect(url_for('index'))

# Route to delete a task
@app.route('/delete/<int:id>')
def delete_task(id):
    task_to_delete = Task.query.get_or_404(id)
    db.session.delete(task_to_delete)
    db.session.commit()
    return redirect(url_for('index'))

if __name__ == "__main__":
    app.run(debug=True)
