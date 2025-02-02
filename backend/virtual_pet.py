from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import date, datetime
from flask_socketio import SocketIO

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}) # Enable CORS for frontend-backend communication
socketio = SocketIO(app, cors_allowed_origins="*") #Enable WebSocket support

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
    task_completed = db.Column(db.Boolean, default=False, nullable=False)

# Create the database
with app.app_context():
    db.create_all()

# Route to fetch all tasks due today
@app.route('/tasks/today', methods=['GET'])
def get_todays_tasks():
    today = date.today().strftime('%Y-%m-%d')  # Get today's date in 'YYYY-MM-DD' format
    tasks = Task.query.filter_by(task_date=today).all()
    return jsonify([
        {
            'id': task.id,
            'task_name': task.task_name,
            'task_date': task.task_date,
            'task_difficulty': task.task_difficulty,
            'task_completed': task.task_completed
        } for task in tasks
    ])

# Route to fetch all tasks
@app.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()
    return jsonify([
        {
            'id': task.id,
            'task_name': task.task_name,
            'task_date': task.task_date,
            'task_difficulty': task.task_difficulty,
            'task_completed': task.task_completed
        } for task in tasks
    ])

# Route to add a new task (Accepts JSON from React)
@app.route('/add', methods=['POST'])
def add_task():
    try:
        data = request.get_json()

        if not data:
            return jsonify({'error': 'Invalid JSON data'}), 400

        task_name = data.get('task_name')
        task_date = data.get('task_date')
        task_difficulty = data.get('task_difficulty')

        if not task_name or not task_date or not task_difficulty:
            return jsonify({'error': 'Missing fields'}), 400

        new_task = Task(task_name=task_name, task_date=task_date, task_difficulty=task_difficulty, task_completed=False)
        
        db.session.add(new_task)
        db.session.commit()

        # Emit event to notify frontend about the new task
        socketio.emit('task_added', {
            'id': new_task.id,
            'task_name': task_name,
            'task_date': task_date,
            'task_difficulty': task_difficulty,
            'task_completed': False
        }, namespace= '/', broadcast=True)

        return jsonify({'message': 'Task added successfully!', 'task': {
            'id': new_task.id,
            'task_name': task_name,
            'task_date': task_date,
            'task_difficulty': task_difficulty,
            ##'task_completed': False #by the default, this is false so no need to specify
        }}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/tasks/complete', methods=['POST'])
def complete_task():
    data = request.json
    task_id = data.get("task_id")
    completed = data.get("completed")

    task = Task.query.get(task_id)
    if task:
        task.task_completed = completed
        db.session.commit()

        # Emit event to notify frontend about the update
        socketio.emit('task_updated', {
            'id': task.id,
            'task_completed': completed
        }, namespace= '/', broadcast=True)


        return jsonify({"message": "Task updated successfully"}), 200
    return jsonify({"error": "Task not found"}), 404

'''# Toggle task completion status
@app.route('/toggle_completed/<int:id>', methods=['PATCH'])
def toggle_completed(id):
    task = Task.query.get_or_404(id)
    task.task_completed = not task.task_completed
    db.session.commit()
    return jsonify({'message': 'Task updated', 'task_completed': task.task_completed})'''

# Delete a task
@app.route('/delete/<int:id>', methods=['DELETE'])
def delete_task(id):
    task_to_delete = Task.query.get_or_404(id)
    db.session.delete(task_to_delete)
    db.session.commit()
    return jsonify({'message': 'Task deleted successfully!'})

# Run Flask app
if __name__ == "__main__":
   socketio.run(app, debug=True, port=5000)
