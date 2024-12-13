from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SECRET_KEY'] = 'mysecretkey'
db = SQLAlchemy(app)

# Model user
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    employee_id = db.Column(db.Integer, nullable=False)

with app.app_context():
    db.create_all()

# Đăng ký route cho việc lấy token
@app.route('/api/accounts/accounts/login/', methods=['POST'])
def get_token():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # Tìm kiếm người dùng trong cơ sở dữ liệu
    # user = User.query.filter_by(username=username).first()
    token = 'dsfdfsdf'
    if 1:
        return jsonify({'employee_id': 1, 'username': 'mie', 'token': token})
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')

