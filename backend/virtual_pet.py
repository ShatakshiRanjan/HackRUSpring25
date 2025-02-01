from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

# Initialize Flask app
app = Flask(__name__)

# Set up SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Define the Task model
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    task_name = db.Column(db.String(200), nullable=False)
    task_date = db.Column(db.String(100), nullable=False)
    task_difficulty = db.Column(db.String(200), nullable=False)
    task_completed = db.Column(db.Integer, default=0, nullable=False)  # Changed to Integer

    def __repr__(self):
        return f'<Task {self.task_name}>'

# Create the database
with app.app_context():
    db.create_all()

# Route to display all tasks
@app.route('/')
def index():
    tasks = Task.query.all()
    return render_template('index.html', tasks=tasks)

# Route to add a new task
@app.route('/add', methods=['POST'])
def add_task():
    if request.method == 'POST':
        task_name = request.form['task_name']
        task_date = request.form['task_date']
        task_difficulty = request.form['task_difficulty']
        
        new_task = Task(task_name=task_name, task_date=task_date, task_difficulty=task_difficulty, task_completed=0)
        db.session.add(new_task)
        db.session.commit()

        return redirect(url_for('index'))

# JSON processing route
@app.route('/processjson', methods=['POST'])
def processjson():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Invalid JSON data'}), 400

    task = data.get('task', 'Unknown Task')
    date = data.get('date', 'Unknown Date')
    completed = data.get('completed', False)
    difficulty = data.get('difficulty', 'Unknown')

    return jsonify({'Task': 'Complete!', 'task': task, 'date': date, 'completed': completed, 'difficulty': difficulty})

# Toggle task completion
@app.route('/toggle_completed/<int:id>')
def toggle_completed(id):
    task = Task.query.get_or_404(id)
    task.task_completed = 1 if task.task_completed == 0 else 0
    db.session.commit()
    return redirect(url_for('index'))

# Delete a task
@app.route('/delete/<int:id>')
def delete_task(id):
    task_to_delete = Task.query.get_or_404(id)
    db.session.delete(task_to_delete)
    db.session.commit()
    return redirect(url_for('index'))

if __name__ == "__main__":
    app.run(debug=True, port=5000)
